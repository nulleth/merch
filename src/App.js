import React from "react";
import "./App.css";
import Footer from "./components/layout/Footer";
import MainNavigation from "./components/layout/MainNavigation";
import Home from './pages/Home';
import Wrapper from "./components/helpers/Wrapper";

const App = () => {
    return (
        <Wrapper>
            <MainNavigation></MainNavigation>
            <Home></Home>
            <Footer></Footer>
        </Wrapper>
    );
};

export default App;