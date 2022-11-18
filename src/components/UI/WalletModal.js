import React, { useState } from 'react';
import Card from './Card'
import classes from './WalletModal.module.css';

function WalletModal(props) {

    return (
        <div>
            <div className={classes.backdrop} onClick={props.onClick}></div>
            <Card className={classes.modal}>
                {/* MetaMask Connect Button */}
                <button type='button'>MetaMask</button>
                {/* Coinbase Wallet Connect Button */}
                <button type='button'>Coinbase Wallet</button>
                {/* Trust Wallet Connect Button */}
                <button type='button'>Trust Wallet</button>
                {/* Fortmatic Wallet Connect Button */}
                <button type='button'>Fortmatic Wallet</button>
                {/* Dismiss Button */}
                <button type='button' onClick={props.onClick}>Dismiss</button>
            </Card>
        </div >
    );
}

export default WalletModal;