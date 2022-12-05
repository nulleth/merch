import React from "react";
import classes from './Quarter.module.css';

const Quarter = (props) => {
    return (
        <div className={classes.container}>
            <div className={classes.item}>{props.endOfQuarter}</div>
            <div className={classes.item}>{Number(props.baycPoolEmissions).toLocaleString("en-US")}</div>
            <div className={classes.item}>{Number(props.maycPoolEmissions).toLocaleString("en-US")}</div>
            <div className={classes.item}>{Number(props.bakcPoolEmissions).toLocaleString("en-US")}</div>
            <div className={classes.item}>{Number(props.apecoinPoolEmissions).toLocaleString("en-US")}</div>
            <div className={classes.item}>{
                Number(props.baycPoolEmissions +
                    props.maycPoolEmissions +
                    props.bakcPoolEmissions +
                    props.apecoinPoolEmissions).toLocaleString("en-US")}
            </div>
        </div>
    )
}

export default Quarter;