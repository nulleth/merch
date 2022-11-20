import React, { useState } from 'react';
import Card from './Card'
import classes from './WalletModal.module.css';
// import metamask from '../../../public/assets/logo-metamask.png';
// import coinbaseWallet from '../../../public/assets/logo-coinbase-wallet.png';
// import trustWallet from '../../../public/assets/logo-trust-wallet.png';
// import trustWallet from '../../assets/logo-trust-wallet.png';

function WalletModal(props) {

    return (
        <div>
            <div className={classes.backdrop} onClick={props.onClick}></div>
            <Card className={classes.modal}>
                {/* <button type='button'><img src={metamask}></img>MetaMask</button>
                <button type='button'><img src={coinbaseWallet}></img>Coinbase Wallet</button>
                <button type='button'><img src={trustWallet}></img>Trust Wallet</button>*/}
                {/* <ul>
                    <li><button type='button' className={classes.walletButton}>MetaMask</button></li>
                    <li><button type='button' className={classes.walletButton}>Coinbase Wallet</button></li>
                    <li><button type='button' className={classes.walletButton}>Trust Wallet</button></li>
                </ul> */}
                <button type='button' className={classes.walletButton}>MetaMask</button>
                <button type='button' className={classes.walletButton}>Coinbase Wallet</button>
                <button type='button' className={classes.walletButton}>Trust Wallet</button>
                <button type='button' className={classes.dismissButton} onClick={props.onClick}>Dismiss</button>
            </Card>
        </div >
    );
}

export default WalletModal;