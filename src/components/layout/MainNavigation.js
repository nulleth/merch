import React from "react";
import ConnectButton from "../elements/ConnectButton";
import classes from './MainNavigation.module.css';

function MainNavigation() {
    return (
        <nav className={classes.content}>
            <ConnectButton wallet={"Connect Wallet"}></ConnectButton>
        </nav>
    );
}

export default MainNavigation;