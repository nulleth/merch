import React, { useState } from "react";
import WalletModal from "../UI/WalletModal";
import classes from './MainNavigation.module.css';

function MainNavigation() {

    const [walletModal, setWalletModal] = useState(false);

    const connectWalletHandler = async () => {
        setWalletModal(true);
    };

    const dismissHandler = async () => {
        setWalletModal(false);
    };

    return (
        <nav className={classes.content}>
            {/* Make this an image/logo instead of an empty Div,. */}
            <div></div>
            {walletModal && <WalletModal onClick={dismissHandler}></WalletModal>}
            <button onClick={connectWalletHandler} className={classes.connectButton}>Connect Wallet</button>
        </nav>
    );
}

export default MainNavigation;