import { getDefaultProvider } from 'ethers';
const ethers = require("ethers");
const { BigNumber, utils, Contract, formatEther } = require("ethers");
// import { parseEther } from 'ethers/lib/utils.js';
const fs = require('fs');

function findSum(first, second) {
    var sum = '';
    var carry = 0;
    var diff = second.length - first.length;
    for (i = first.length - 1; i >= 0; i--) {
        var temp =
            (Number(first.charAt(i)) % 10) +
            (Number(second.charAt(i + diff)) % 10) +
            carry;
        if (temp >= 10) {
            sum = (temp % 10) + sum;
            carry = Math.floor(temp / 10);
        } else {
            sum = temp + sum;
            carry = 0;
        }
    }
    if (carry) {
        sum = carry + sum;
    }
    return sum;
}

export const getPoolsUI = async () => {
    const apeStakingGoerliContractAddress = "0x831e0c7A89Dbc52a1911b78ebf4ab905354C96Ce";
    const apeStakingGoerliABI = require('../../apeStakingGoerliContractABI.json');
    const goerliProvider = new ethers.providers.InfuraProvider('goerli', 'd662beea15134afba177e04d7e99791b')
    const apeStakingGoerliContract = new ethers.Contract(apeStakingGoerliContractAddress, apeStakingGoerliABI, goerliProvider);
    // const apeStakingGoerliContract = new Contract(
    //     "0x831e0c7A89Dbc52a1911b78ebf4ab905354C96Ce",
    //     apeStakingGoerliABI,
    //     getDefaultProvider()
    // );
    const poolsUI = await apeStakingGoerliContract.getPoolsUI();
    const obj = {
        'apecoin': {
            poolId: poolsUI[0][0].toString(),
            totalAmountStaked: Number(ethers.utils.formatEther(poolsUI[0][1], 18)).toFixed(2),
            startTimestampHour: new Date(Number(poolsUI[0][2][0].toString()) * 1000).toLocaleString(),
            endTimestampHour: new Date(Number(poolsUI[0][2][1].toString()) * 1000).toLocaleString(),
            emissionsPerHour: Number(ethers.utils.formatEther(poolsUI[0][2][2], 18)).toFixed(2)
        },
        'bayc': {
            poolId: poolsUI[1][0].toString(),
            totalAmountStaked: Number(ethers.utils.formatEther(poolsUI[1][1], 18)).toFixed(2),
            startTimestampHour: new Date(Number(poolsUI[1][2][0].toString()) * 1000).toLocaleString(),
            endTimestampHour: new Date(Number(poolsUI[1][2][1].toString()) * 1000).toLocaleString(),
            emissionsPerHour: Number(ethers.utils.formatEther(poolsUI[1][2][2], 18)).toFixed(2),
            capPerPosition: Number(ethers.utils.formatEther(poolsUI[1][2][3], 18)).toFixed(2)
        },
        'mayc': {
            poolId: poolsUI[2][0].toString(),
            totalAmountStaked: Number(ethers.utils.formatEther(poolsUI[2][1], 18)).toFixed(2),
            startTimestampHour: new Date(Number(poolsUI[2][2][0].toString()) * 1000).toLocaleString(),
            endTimestampHour: new Date(Number(poolsUI[2][2][1].toString()) * 1000).toLocaleString(),
            emissionsPerHour: Number(ethers.utils.formatEther(poolsUI[2][2][2], 18)).toFixed(2),
            capPerPosition: Number(ethers.utils.formatEther(poolsUI[2][2][3], 18)).toFixed(2)
        },
        'bakc': {
            poolId: poolsUI[3][0].toString(),
            totalAmountStaked: Number(ethers.utils.formatEther(poolsUI[3][1], 18)).toFixed(2),
            startTimestampHour: new Date(Number(poolsUI[3][2][0].toString()) * 1000).toLocaleString(),
            endTimestampHour: new Date(Number(poolsUI[3][2][1].toString()) * 1000).toLocaleString(),
            emissionsPerHour: Number(ethers.utils.formatEther(poolsUI[3][2][2], 18)).toFixed(2),
            capPerPosition: Number(ethers.utils.formatEther(poolsUI[3][2][3], 18)).toFixed(2)
        }
    };
    console.log(obj.apecoin.endTimestampHour);
    return obj;
}

export const getAllStakes = async () => {
    const apeStakingGoerliContractAddress = "0x831e0c7A89Dbc52a1911b78ebf4ab905354C96Ce";
    const apeStakingGoerliABI = require('../../apeStakingGoerliContractABI.json');
    const provider = new ethers.providers.InfuraProvider('goerli', 'd662beea15134afba177e04d7e99791b')
    const apeStakingGoerliContract = new ethers.Contract(apeStakingGoerliContractAddress, apeStakingGoerliABI, provider);
    const apeCoinStake = await apeStakingGoerliContract.getApeCoinStake("0x6c7C59e2f211b6D8948DA9Af6883f708FDA27222");
    const baycStakes = await apeStakingGoerliContract.getBaycStakes("0x6c7C59e2f211b6D8948DA9Af6883f708FDA27222");
    const maycStakes = await apeStakingGoerliContract.getMaycStakes("0x6c7C59e2f211b6D8948DA9Af6883f708FDA27222");
    const bakcStakes = await apeStakingGoerliContract.getBakcStakes("0x6c7C59e2f211b6D8948DA9Af6883f708FDA27222");
    console.log(apeCoinStake);
    console.log(baycStakes);
    console.log(maycStakes);
    console.log(bakcStakes);
    var baycDeposited = 0;
    var baycUnclaimed = 0;
    var baycRewards = 0;
    var maycDeposited = 0;
    var maycUnclaimed = 0;
    var maycRewards = 0;
    var bakcDeposited = 0;
    var bakcUnclaimed = 0;
    var bakcRewards = 0;
    var apecoinRewards = Number(ethers.utils.formatEther(apeCoinStake[4].toString())).toFixed(4);

    for (var i = 0; i < baycStakes.length; i++) {
        baycDeposited += Number(ethers.utils.formatEther(baycStakes[i][2].toString()));
        baycUnclaimed += Number(ethers.utils.formatEther(baycStakes[i][3].toString()));
        baycRewards += Number(ethers.utils.formatEther(baycStakes[i][4].toString()));
    }

    for (var i = 0; i < maycStakes.length; i++) {
        maycDeposited += Number(ethers.utils.formatEther(maycStakes[i][2].toString()));
        maycUnclaimed += Number(ethers.utils.formatEther(maycStakes[i][3].toString()));
        maycRewards += Number(ethers.utils.formatEther(maycStakes[i][4].toString()));
    }
    for (var i = 0; i < bakcStakes.length; i++) {
        bakcDeposited += Number(ethers.utils.formatEther(bakcStakes[i][2].toString()));
        bakcUnclaimed += Number(ethers.utils.formatEther(bakcStakes[i][3].toString()));
        bakcRewards += Number(ethers.utils.formatEther(bakcStakes[i][4].toString()));
    }

    const obj = {
        'apecoin': {
            deposited: Number(ethers.utils.formatEther(apeCoinStake[2].toString())).toFixed(2),
            unclaimed: Number(ethers.utils.formatEther(apeCoinStake[3].toString())).toFixed(2),
            rewards24hr: Number(ethers.utils.formatEther(apeCoinStake[4].toString())).toFixed(2),
            personalRewardsPerHour: Number(apecoinRewards / 24).toFixed(4)
        },
        'bayc': {
            deposited: Number(baycDeposited).toFixed(2),
            unclaimed: Number(baycUnclaimed).toFixed(2),
            rewards24hr: Number(baycRewards).toFixed(2),
            personalRewardsPerHour: Number(baycRewards / 24).toFixed(2)
        },
        'mayc': {
            deposited: Number(maycDeposited).toFixed(2),
            unclaimed: Number(maycUnclaimed).toFixed(2),
            rewards24hr: Number(maycRewards).toFixed(2),
            personalRewardsPerHour: Number(maycRewards / 24).toFixed(2)
        },
        'bakc': {
            deposited: Number(bakcDeposited).toFixed(2),
            unclaimed: Number(bakcUnclaimed).toFixed(2),
            rewards24hr: Number(bakcRewards).toFixed(2),
            personalRewardsPerHour: Number(bakcRewards / 24).toFixed(2)
        },
    };
    return obj;
}

export const getTotalAmountsStaked = async () => {
    const apeStakingGoerliContractAddress = "0x831e0c7A89Dbc52a1911b78ebf4ab905354C96Ce";
    const apeStakingGoerliABI = require('../../apeStakingGoerliContractABI.json');
    const goerliProvider = new ethers.providers.InfuraProvider('goerli', 'd662beea15134afba177e04d7e99791b')
    const apeStakingGoerliContract = new ethers.Contract(apeStakingGoerliContractAddress, apeStakingGoerliABI, goerliProvider);

    const poolsUI = await apeStakingGoerliContract.getPoolsUI();
    const obj = {
        'apecoin': {
            totalAmountStaked: Number(ethers.utils.formatEther(poolsUI[0][1], 18)).toFixed(2)
        },
        'bayc': {
            totalAmountStaked: Number(ethers.utils.formatEther(poolsUI[1][1], 18)).toFixed(2)
        },
        'mayc': {
            totalAmountStaked: Number(ethers.utils.formatEther(poolsUI[2][1], 18)).toFixed(2)
        },
        'bakc': {
            totalAmountStaked: Number(ethers.utils.formatEther(poolsUI[3][1], 18)).toFixed(2)
        }
    };
    return obj;
}

export const getApecoinPrice = async () => {
    // USDC Address: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
    // Apecoin Address: 0x4d224452801ACEd8B2F0aebE155379bb5D594381
    // https://mainnet.infura.io/v3/d662beea15134afba177e04d7e99791b
    const provider = new ethers.providers.InfuraProvider("homestead", 'd662beea15134afba177e04d7e99791b');
    const aggregatorV3InterfaceABI = [
        {
            inputs: [],
            name: "decimals",
            outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "description",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
            name: "getRoundData",
            outputs: [
                { internalType: "uint80", name: "roundId", type: "uint80" },
                { internalType: "int256", name: "answer", type: "int256" },
                { internalType: "uint256", name: "startedAt", type: "uint256" },
                { internalType: "uint256", name: "updatedAt", type: "uint256" },
                { internalType: "uint80", name: "answeredInRound", type: "uint80" },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "latestRoundData",
            outputs: [
                { internalType: "uint80", name: "roundId", type: "uint80" },
                { internalType: "int256", name: "answer", type: "int256" },
                { internalType: "uint256", name: "startedAt", type: "uint256" },
                { internalType: "uint256", name: "updatedAt", type: "uint256" },
                { internalType: "uint80", name: "answeredInRound", type: "uint80" },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "version",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
    ]
    const ApecoinAddress = "0x4d224452801ACEd8B2F0aebE155379bb5D594381";
    const priceFeed = new ethers.Contract(ApecoinAddress, aggregatorV3InterfaceABI, provider);
    const price = await priceFeed.latestRoundData();
    return price;
    // priceFeed.latestRoundData().then((roundData) => {
    //     console.log("Round Data: " + roundData);
    //     return roundData;
    // })
}




