import React, { useState, useEffect } from 'react';
import classes from './PoolDashboard.module.css';

function PoolDashboard(props) {
    return (
        <div className={classes.container}>
            <div className={classes.statGroup}>
                <div className={classes.item}>{Number(props.personalAmountStaked).toLocaleString("en-US")}</div>
                <div className={classes.description}>Personal Apecoin Staked</div>
            </div>
            <div className={classes.statGroup}>
                <div className={classes.item}>{Number(props.hourlyRewards).toLocaleString("en-US")}</div>
                <div className={classes.description}>Hourly Rewards</div>
            </div>
            <div className={classes.statGroup}>
                <div className={classes.item}>{Number(props.estimatedDailyRewards).toLocaleString("en-US")}</div>
                <div className={classes.description}>Daily Rewards</div>
            </div>
            <div className={classes.statGroup}>
                <div className={classes.item}>{Number(props.totalAmountStaked).toLocaleString("en-US")}</div>
                <div className={classes.description}>Total Apecoin Staked</div>
            </div>
            <div className={classes.statGroup}>
                <div className={classes.item}>{Number(props.estimatedRewardsUntilNextTimestamp).toLocaleString("en-US")}</div>
                <div className={classes.description}>Est. Rewards Until Next Quarter</div>
            </div>
            <div className={classes.statGroup}>
                <div className={classes.item}>{Number(props.unclaimedRewards).toLocaleString("en-US")}</div>
                <div className={classes.description}>Unclaimed Rewards</div>
            </div>
        </div>
    )
}

export default PoolDashboard;