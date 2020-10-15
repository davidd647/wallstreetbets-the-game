import React, { Component } from "react";

import LandingPage from "./LandingPage";
import InitialFunds from "./InitialFunds";
import LineChart from "./Line";
import StockPurchases from "./StockPurchases";

export default class Sim extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: 0,
      initialFunds: 0,
      holdings: [],
      // screen: 2,
      // initialFunds: 10000,
      // holdings: [
      //   { symbol: "TSLA", date: "2018-01-01", amount: 20 },
      //   { symbol: "NFLX", date: "2018-01-01", amount: 20 },
      //   // { symbol: "FB", date: "2018-01-01", amount: 20 },
      //   // { symbol: "AMZN", date: "2018-01-01", amount: 20 },
      //   // { symbol: "GOOGL", date: "2018-01-01", amount: 20 },
      // ],
    };

    this.changeScreen = this.changeScreen.bind(this);
    this.setInitialFunds = this.setInitialFunds.bind(this);
    this.addToHoldings = this.addToHoldings.bind(this);
    this.sellAll = this.sellAll.bind(this);
    this.addNewToHoldings = this.addNewToHoldings.bind(this);
  }

  // this.props.addToHoldings(ticker, amountOfStocks, currentMonth);
  addNewToHoldings(ticker, amountOfStocks, month) {
    const newState = this.state;
    newState.holdings.push({
      symbol: ticker,
      amount: amountOfStocks,
      date: month + "-01",
    });
    this.setState(newState);
  }

  changeScreen(targetScreen) {
    const newState = this.state;
    newState.screen = targetScreen;
    this.setState(newState);
  }

  setInitialFunds(funds) {
    const newState = this.state;
    newState.initialFunds = funds;
    this.setState(newState);
  }

  addToHoldings(holding) {
    const newState = this.state;
    newState.holdings.push(holding);
    this.setState(newState);
  }

  sellAll(ticker) {
    const holdingIndex = this.state.holdings.findIndex(
      (holding) => holding.symbol === ticker
    );

    const newState = this.state;
    newState.holdings[holdingIndex].amount = 0;
    this.setState(newState);
  }

  render() {
    return (
      <div className="col">
        <h1>r/Wallstreetbets: The Game</h1>
        {this.state.screen === 0 ? (
          <LandingPage changeScreen={this.changeScreen} />
        ) : null}
        {this.state.screen === 1 ? (
          <InitialFunds
            changeScreen={this.changeScreen}
            setInitialFunds={this.setInitialFunds}
          />
        ) : null}
        {this.state.screen === 2 ? (
          <StockPurchases
            changeScreen={this.changeScreen}
            initialFunds={this.state.initialFunds}
            addToHoldings={this.addToHoldings}
          />
        ) : null}
        {this.state.screen === 3 ? (
          <LineChart
            holdings={this.state.holdings}
            initialFunds={this.state.initialFunds}
            sellAll={this.sellAll}
            addNewToHoldings={this.addNewToHoldings}
          />
        ) : null}
      </div>
    );
  }
}
