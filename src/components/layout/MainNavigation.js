import React, { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "@wagmi/core";
import WalletModal from "../UI/WalletModal";
import classes from './MainNavigation.module.css';
import { Link } from 'react-router-dom';

function MainNavigation() {

    const [walletModal, setWalletModal] = useState(false);
    const { address, isConnected } = useAccount();
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })
    const { disconnect } = useDisconnect();

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
            <div>
                <Link to='/'><button className={classes.pageButton}>Home</button></Link>
                <Link to='/calculator'><button className={classes.pageButton}>Calculator</button></Link>
                {walletModal && <WalletModal onClick={dismissHandler}></WalletModal>}
                <button onClick={connect} className={classes.connectButton}>{isConnected ? address : "Connect Wallet"}</button>
            </div>
        </nav>
    );
}

export default MainNavigation;