import React, { useState, useEffect, useContext } from 'react';
// import { apeStakingGoerliContractABI } from "./apeStakingGoerliContractABI.json";
const apeStakingGoerliContractABI = require('../../../apeStakingGoerliContractABI.json');
import { ethers, getDefaultProvider, Contract, utils } from 'ethers';
import classes from './Home.module.css';
import { getPoolsUI, getAllStakes, getApecoinPrice } from '../../utils/interact';
import Wrapper from '../helpers/Wrapper';
import Card from '../UI/Card';
import PoolDashboard from '../elements/PoolDashboard';
import StakingContext from '../context/staking-context';

function Home() {

    const ctx = useContext(StakingContext);

    // ApeCoin State Variables
    const [apeCoinPoolId, setApeCoinPoolId] = useState(0);
    const [apeCoinEmissionsPerHour, setApeCoinEmissionsPerHour] = useState(0);
    const [apeCoinTotalStakedAmount, setApeCoinTotalStakedAmount] = useState(0);
    const [apeCoin24hrRewards, setApeCoin24hrRewards] = useState(0);
    const [apeCoinDeposited, setApeCoinDeposited] = useState(0);
    const [apeCoinUnclaimed, setApeCoinUnclaimed] = useState(0);
    const [apeCoinPersonalRewardsPerHour, setApeCoinPersonalRewardsPerHour] = useState(0);
    // BAYC State Variables
    const [baycStartTimestampHour, setBaycStartTimestampHour] = useState();
    const [baycEndTimestampHour, setBaycEndTimestampHour] = useState();
    const [baycEmissionsPerHour, setBaycEmissionsPerHour] = useState(0);
    const [baycCapPerPosition, setBaycCapPerPosition] = useState(0);
    const [baycTotalStakedAmount, setBaycStakedAmount] = useState(0);
    const [baycDeposited, setBaycDeposited] = useState(0);
    const [baycUnclaimed, setBaycUnclaimed] = useState(0);
    const [bayc24hrRewards, setBayc24hrRewards] = useState(0);
    const [baycPersonalRewardsPerHour, setBaycPersonalRewardsPerHour] = useState(0);
    // MAYC State Variables
    const [maycStartTimestampHour, setMaycStartTimestampHour] = useState();
    const [maycEndTimestampHour, setMaycEndTimestampHour] = useState();
    const [maycEmissionsPerHour, setMaycEmissionsPerHour] = useState(0);
    const [maycCapPerPosition, setMaycCapPerPosition] = useState(0);
    const [maycTotalStakedAmount, setMaycTotalStakedAmount] = useState(0);
    const [maycDeposited, setMaycDeposited] = useState(0);
    const [maycUnclaimed, setMaycUnclaimed] = useState(0);
    const [mayc24hrRewards, setMayc24hrRewards] = useState(0);
    const [maycPersonalRewardsPerHour, setMaycPersonalRewardsPerHour] = useState(0);
    // BAKC State Variables
    const [bakcStartTimestampHour, setBakcStartTimestampHour] = useState();
    const [bakcEndTimestampHour, setBakcEndTimestampHour] = useState();
    const [bakcEmissionsPerHour, setBakcEmissionsPerHour] = useState(0);
    const [bakcCapPerPosition, setBakcCapPerPosition] = useState(0);
    const [bakcTotalStakedAmount, setBakcTotalStakedAmount] = useState(0);
    const [bakcDeposited, setBakcDeposited] = useState(0);
    const [bakcUnclaimed, setBakcUnclaimed] = useState(0);
    const [bakc24hrRewards, setBakc24hrRewards] = useState(0);
    const [bakcPersonalRewardsPerHour, setBakcPersonalRewardsPerHour] = useState(0);

    // General State Variables
    const [hoursUntilTimestamp, setHoursUntilTimestamp] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const poolsUIReturned = await getPoolsUI();
            const allStakes = await getAllStakes();
            // ApeCoin Values
            setApeCoinPoolId(poolsUIReturned.apecoin.poolId);
            setApeCoinTotalStakedAmount(poolsUIReturned.apecoin.totalAmountStaked);
            setApeCoinEmissionsPerHour(poolsUIReturned.apecoin.emissionsPerHour);
            // BAYC Values
            setBaycStakedAmount(poolsUIReturned.bayc.totalAmountStaked);
            setBaycStartTimestampHour(poolsUIReturned.bayc.startTimestampHour);
            setBaycEndTimestampHour(poolsUIReturned.bayc.endTimestampHour);
            setBaycEmissionsPerHour(poolsUIReturned.bayc.emissionsPerHour);
            setBaycCapPerPosition(poolsUIReturned.bayc.capPerPosition);
            // MAYC Values
            setMaycTotalStakedAmount(poolsUIReturned.mayc.totalAmountStaked);
            setMaycStartTimestampHour(poolsUIReturned.mayc.startTimestampHour);
            setMaycEndTimestampHour(poolsUIReturned.mayc.endTimestampHour);
            setMaycEmissionsPerHour(poolsUIReturned.mayc.emissionsPerHour);
            setMaycCapPerPosition(poolsUIReturned.mayc.capPerPosition);
            // BAKC Values
            setBakcTotalStakedAmount(poolsUIReturned.bakc.totalAmountStaked);
            setBakcStartTimestampHour(poolsUIReturned.bakc.startTimestampHour);
            setBakcEndTimestampHour(poolsUIReturned.bakc.endTimestampHour);
            setBakcEmissionsPerHour(poolsUIReturned.bakc.emissionsPerHour);
            setBakcCapPerPosition(poolsUIReturned.bakc.capPerPosition);
            // Other Values
            setHoursUntilTimestamp(Math.floor((new Date(poolsUIReturned.bayc.endTimestampHour).getTime() - new Date().getTime()) / (1000 * 60 * 60)));
            // ApeCoin Values
            setApeCoinDeposited(allStakes.apecoin.deposited);
            setApeCoin24hrRewards(allStakes.apecoin.rewards24hr);
            setApeCoinUnclaimed(allStakes.apecoin.unclaimed);
            setApeCoinPersonalRewardsPerHour(allStakes.apecoin.personalRewardsPerHour);
            // BAYC Values
            setBaycDeposited(allStakes.bayc.deposited);
            setBaycUnclaimed(allStakes.bayc.unclaimed);
            setBayc24hrRewards(allStakes.bayc.rewards24hr);
            setBaycPersonalRewardsPerHour(allStakes.bayc.personalRewardsPerHour);
            // MAYC Values
            setMaycDeposited(allStakes.mayc.deposited);
            setMaycUnclaimed(allStakes.mayc.unclaimed);
            setMayc24hrRewards(allStakes.mayc.rewards24hr);
            setMaycPersonalRewardsPerHour(allStakes.mayc.personalRewardsPerHour);
            // BAKC Values
            setBakcDeposited(allStakes.bakc.deposited);
            setBakcUnclaimed(allStakes.bakc.unclaimed);
            setBakc24hrRewards(allStakes.bakc.rewards24hr);
            setBakcPersonalRewardsPerHour(allStakes.bakc.personalRewardsPerHour);
        }
        fetchData();
    }, []);

    return (
        <div className={classes.content}>
            <h1 className={classes.pool}>BAYC Pool</h1>
            <Card className={classes.card}>
                <PoolDashboard
                    totalAmountStaked={baycTotalStakedAmount}
                    personalAmountStaked={baycDeposited}
                    hourlyRewards={baycPersonalRewardsPerHour}
                    estimatedDailyRewards={bayc24hrRewards}
                    estimatedRewardsUntilNextTimestamp={Number(bayc24hrRewards * (hoursUntilTimestamp / 24)).toFixed(2)}
                    unclaimedRewards={baycUnclaimed}
                ></PoolDashboard>
            </Card>
            <h1 className={classes.pool}>MAYC Pool</h1>
            <Card className={classes.card}>
                <PoolDashboard
                    totalAmountStaked={maycTotalStakedAmount}
                    personalAmountStaked={maycDeposited}
                    hourlyRewards={maycPersonalRewardsPerHour}
                    estimatedDailyRewards={mayc24hrRewards}
                    estimatedRewardsUntilNextTimestamp={Number(mayc24hrRewards * (hoursUntilTimestamp / 24)).toFixed(2)}
                    unclaimedRewards={maycUnclaimed}
                ></PoolDashboard>
            </Card>
            <h1 className={classes.pool}>BAKC Pool</h1>
            <Card className={classes.card}>
                <PoolDashboard
                    totalAmountStaked={bakcTotalStakedAmount}
                    personalAmountStaked={bakcDeposited}
                    hourlyRewards={bakcPersonalRewardsPerHour}
                    estimatedDailyRewards={bakc24hrRewards}
                    estimatedRewardsUntilNextTimestamp={Number(bakc24hrRewards * (hoursUntilTimestamp / 24)).toFixed(2)}
                    unclaimedRewards={bakcUnclaimed}
                ></PoolDashboard>
            </Card>
            <h1 className={classes.pool}>Apecoin Pool</h1>
            <Card className={classes.card}>
                <PoolDashboard
                    totalAmountStaked={apeCoinTotalStakedAmount}
                    personalAmountStaked={apeCoinDeposited}
                    hourlyRewards={apeCoinPersonalRewardsPerHour}
                    estimatedDailyRewards={apeCoin24hrRewards}
                    estimatedRewardsUntilNextTimestamp={Number(apeCoin24hrRewards * (hoursUntilTimestamp / 24)).toFixed(2)}
                    unclaimedRewards={apeCoinUnclaimed}
                ></PoolDashboard>
            </Card>
        </div >
    )
}

export default Home;