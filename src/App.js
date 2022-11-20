import React, { useState } from "react";
import "./App.css";
import Footer from "./components/layout/Footer";
import MainNavigation from "./components/layout/MainNavigation";
import Home from './components/pages/Home';
import Wrapper from "./components/helpers/Wrapper";
import WalletModal from "./components/UI/WalletModal";

const App = () => {

    const [walletModalEnabled, setWalletModalEnabled] = useState(false);

    return (
        <Wrapper>
            <MainNavigation></MainNavigation>
            {/* <WalletModal isEnabled={walletModalEnabled}></WalletModal> */}
            <Home></Home>
            <Footer></Footer>
        </Wrapper>
    );
};

export default App;