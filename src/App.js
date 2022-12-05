import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";
import "./App.css";
import Footer from "./components/layout/Footer";
import MainNavigation from "./components/layout/MainNavigation";
import Home from './components/pages/Home';
import Calculator from './components/pages/Calculator';
import StakingContext from "./components/context/staking-context";

const client = createClient({
    autoConnect: true,
    provider: getDefaultProvider(),
})

const App = () => {

    const [walletModalEnabled, setWalletModalEnabled] = useState(false);

    return (
        <StakingContext.Provider value={{
            address: "0x"
        }}>
            <WagmiConfig client={client}>
                <MainNavigation></MainNavigation>
                {/* <WalletModal isEnabled={walletModalEnabled}></WalletModal> */}
                <Routes>
                    <Route path='' element={<Home />}></Route>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/calculator' element={<Calculator />}></Route>
                </Routes>
                <Footer></Footer>
            </WagmiConfig>
        </StakingContext.Provider>
    );
};

export default App;