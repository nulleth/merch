import React, { useState } from 'react';
import Card from './Card'
import classes from './WalletModal.module.css';
const metamask = require('../../assets/logo-metamask.png');
const coinbaseWallet = require('../../assets/logo-coinbase-wallet.png');
const trustWallet = require('../../assets/logo-trust-wallet.png');

function WalletModal(props) {

    return (
        <div>
            <div className={classes.backdrop} onClick={props.onClick}></div>
            <Card className={classes.modal}>
                <button type='button' className={classes.walletButton}><img src={metamask} className={classes.icon}></img>MetaMask</button>
                <button type='button' className={classes.walletButton}><img src={coinbaseWallet} className={classes.icon}></img>Coinbase Wallet</button>
                <button type='button' className={classes.walletButton}><img src={trustWallet} className={classes.icon}></img>Trust Wallet</button>
                <button type='button' className={classes.dismissButton} onClick={props.onClick}>Dismiss</button>
            </Card>
        </div >
    );
}

export default WalletModal;