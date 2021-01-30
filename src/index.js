import React from "react";
import ReactDOM from 'react-dom';
import './index.css';
import './styles.css';
import Nav from "./components/nav";
import StockList from './components/StockList'
import TransactionGrid from './components/TransactionGrid'
import AssetList from './components/AssetList'
import StockListItem from './components/StockListItem'
import useFetch, { DEFAULT_OPTIONS } from './Shared//useFetch';
import HighChart from './components/HighChart'
import DetailsHeader from './components/DetailsHeader'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import TransactionGridRow from "./components/TransactionGridRow";

export default function App() {
    return (
        <Router>
            <Nav />

            <Switch>
                <Route path="/assets">
                    <Assets />
                </Route>
                <Route path="/details">
                    <Details />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

function Home() {
    return (
        <body>
            <StockList />
            <TransactionGrid />
        </body>
    );
}

function Assets() {
    return (
        <body>
            <AssetList />
        </body>
    );
}

function Details() {

    return (
        <body>
            <DetailsHeader />
        </body>
    );
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
);