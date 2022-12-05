import React, { useState, useEffect, useRef } from 'react';
import Wrapper from '../helpers/Wrapper';
import { getPoolsUI, getTotalAmountsStaked } from '../../utils/interact';
import QuarterList from '../elements/QuarterList';
import classes from './Calculator';

function Calculator() {

    return (
        <div className={classes.card}>
            <QuarterList />
        </div>
    );
}

export default Calculator;