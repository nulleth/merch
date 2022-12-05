import React from 'react';
import { useState, useEffect, useContext } from 'react';
import Quarter from './Quarter';
import { getAllStakes, getPoolsUI, getTotalAmountsStaked } from '../../utils/interact';
import classes from './QuarterList.module.css';
import StakingContext from '../context/staking-context';

function QuarterList() {

    const stakingContext = useContext(StakingContext);

    const apecoinPoolPercentage = 0.30;
    const baycPoolPercentage = 0.47105;
    const maycPoolPercentage = 0.1906;
    const bakcPoolPercentage = 0.03835;

    const quarterData = [
        [0, new Date("March 13, 2023"), 3500000.00],
        [1, new Date("June 12, 2023"), 30000000.00],
        [2, new Date("September 11, 2023"), 20000000.00],
        [3, new Date("December 11, 2023"), 15000000.00],
        [4, new Date("March 11, 2024"), 13750000.00],
        [5, new Date("June 10, 2024"), 12500000.00],
        [6, new Date("September 9, 2024"), 12500000.00],
        [7, new Date("December 9, 2024"), 11250000.00],
        [8, new Date("March 10, 2025"), 7500000.00],
        [9, new Date("June 9, 2025"), 6250000.00],
        [10, new Date("September 8, 2025"), 6250000.00],
        [11, new Date("December 8, 2025"), 5000000.00],
    ];
    // OLD DATE FORMAT: [11, new Date(Date.UTC(2025, 11, 8, 0, 0, 0)), 5000000.00],

    const [totalBaycStaked, setTotalBaycStaked] = useState(0);
    const [totalMaycStaked, setTotalMaycStaked] = useState(0);
    const [totalBakcStaked, setTotalBakcStaked] = useState(0);
    const [totalApecoinStaked, setTotalApecoinStaked] = useState(0);
    const [personalBaycAmountStaked, setPersonalBaycAmountStaked] = useState(0);
    const [personalMaycAmountStaked, setPersonalMaycAmountStaked] = useState(0);
    const [personalBakcAmountStaked, setPersonalBakcAmountStaked] = useState(0);
    const [personalApecoinAmountStaked, setPersonalApecoinAmountStaked] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const totalAmountsStaked = await getTotalAmountsStaked();
            const amountsStaked = await getAllStakes();
            setTotalBaycStaked(totalAmountsStaked.bayc.totalAmountStaked);
            setTotalMaycStaked(totalAmountsStaked.mayc.totalAmountStaked);
            setTotalBakcStaked(totalAmountsStaked.bakc.totalAmountStaked);
            setTotalApecoinStaked(totalAmountsStaked.apecoin.totalAmountStaked);
            setPersonalBaycAmountStaked(amountsStaked.bayc.deposited);
            setPersonalMaycAmountStaked(amountsStaked.mayc.deposited);
            setPersonalBakcAmountStaked(amountsStaked.bakc.deposited);
            setPersonalApecoinAmountStaked(amountsStaked.apecoin.deposited);
        }
        fetchData();
    }, []);

    return (
        <div className={classes.card}>
            <div className={classes.container}>
                <div className={classes.item}>End of Quarter</div>
                <div className={classes.item}>BAYC Pool</div>
                <div className={classes.item}>MAYC Pool</div>
                <div className={classes.item}>BAKC Pool</div>
                <div className={classes.item}>Apecoin Pool</div>
                <div className={classes.item}>Emissions</div>
            </div>
            {quarterData.map((quarter) => (
                <Quarter
                    key={quarter[0]}
                    endOfQuarter={quarter[1].toDateString().slice(4, 15)}
                    baycPoolEmissions={(personalBaycAmountStaked / totalBaycStaked) * (quarter[2] * baycPoolPercentage)}
                    maycPoolEmissions={(personalMaycAmountStaked / totalMaycStaked) * (quarter[2] * maycPoolPercentage)}
                    bakcPoolEmissions={(personalBakcAmountStaked / totalBakcStaked) * (quarter[2] * bakcPoolPercentage)}
                    apecoinPoolEmissions={(personalApecoinAmountStaked / totalApecoinStaked) * (quarter[2] * apecoinPoolPercentage)}
                />
            ))}
        </div>
    );
}

export default QuarterList;