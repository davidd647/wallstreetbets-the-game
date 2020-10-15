import React, { Component } from "react";
import { Line } from "react-chartjs-2";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// const test_API =
//   "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=TSLA&apikey=NOA4WSXR5B8R43F5";
// let tslaData;

const API_PREFIX =
  "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=";
const API_SUFFIX = "&apikey=NOA4WSXR5B8R43F5";
const MAX_DATA_POINTS = 36; // 36 is 3 years... 58 is 5 years...

export default class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        labels: [],
        datasets: [],
      },
      toCalc: {},
      netWorth: 0,
      currentFunds: this.props.initialFunds,
      fundsSpent: 0,
    };

    this.sell = this.sell.bind(this);
    this.buy = this.buy.bind(this);
    this.increaseMonth = this.increaseMonth.bind(this);
    this.getNetWorth = this.getNetWorth.bind(this);
  }

  sell(ticker) {
    const holding = this.props.holdings.find((holding) => {
      return holding.symbol === ticker;
    });

    const relevantDataset = this.state.data.datasets.find(
      (dataset) => dataset.label === ticker
    );

    const mostRecentPrice =
      relevantDataset.data[relevantDataset.data.length - 1];

    // const mostRecentPrice =
    // dataset.data[dataset.data.length - 1];

    const newState = this.state;
    newState.currentFunds += mostRecentPrice * holding.amount;
    this.props.sellAll(ticker);
    this.setState(newState);
  }

  buy(ticker) {
    let amountOfStocks = prompt(
      "Please enter how many stocks you would like to buy",
      "10"
    );
    if (parseInt(amountOfStocks) > 0) {
      const currentMonth = this.state.data.labels[
        this.state.data.labels.length - 1
      ].substr(0, 7);
      this.props.addNewToHoldings(ticker, amountOfStocks, currentMonth);
    }

    const newState = this.state;
    // update networth
    newState.netWorth = this.getNetWorth();
    // update current funds
    // TO-DO!! what's the relevant stock?

    // newState.fundsSpent += amountOfStocks * relevantStock.amount;
    this.setState(newState);
  }

  getNetWorth() {
    let netWorth = this.state.data.datasets.reduce((total, dataset) => {
      const holding = this.props.holdings.find((holding) => {
        return holding.symbol === dataset.label;
      });

      const mostRecentPrice = dataset.data[dataset.data.length - 1];

      return total + mostRecentPrice * holding.amount;
    }, 0);

    netWorth += this.state.currentFunds;

    return netWorth;
  }

  increaseMonth() {
    const newState = this.state;
    // this.state.data
    //    labels:
    //      find the dataset[dataset.length - 1]
    //      get the month (e.g. 2020-10)
    //      add one to the month
    //      push the new month to the dataset
    let newestTime = newState.data.labels[
      newState.data.labels.length - 1
    ].substr(0, 7);
    let year = newestTime.substr(0, 4);
    let month = newestTime.substr(5, 7);
    month++;
    if (month > 12) {
      month = "1";
      year++;
    }
    if (month < 10) {
      month = "0" + month;
    }
    const newerTime = `${year}-${month}-01`;
    newState.data.labels.push(newerTime);

    //    for each of the datasets:
    //      choose a random number (between 0 and dataset.length-1)
    //      get priceA
    //      then get priceB from the next price
    //      get the difference (priceB - priceA)
    //      get the current price
    //      push a new data point to the dataset (current price + difference)
    //      data to update: this.state.toCalc[holding.symbol].currentAmount = new data

    newState.data.datasets.forEach((dataset) => {
      const randomDatasetIndex = Math.round(
        Math.random() * (dataset.data.length - 1)
      );
      const priceA = dataset.data[randomDatasetIndex];
      const priceB = dataset.data[randomDatasetIndex + 1];
      const diff = priceB - priceA;
      const currentPrice = dataset.data[dataset.data.length - 1];
      const newPrice = parseFloat(currentPrice) + parseFloat(diff);
      dataset.data.push(newPrice);

      newState.toCalc[dataset.label].currentAmount = newPrice;
    });

    newState.netWorth = this.getNetWorth();

    this.setState(newState);
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        <h2>Stocks' Performance:</h2>
        <Line ref="chart" data={this.state.data} redraw />
        <Row className="my-3">
          {/* To-do: */}
          {/* <Col>
            <Button className="btn" disabled>
              Play
            </Button>
          </Col> */}
          <Col>
            <Button className="btn btn-primary" onClick={this.increaseMonth}>
              +1 Month
            </Button>
          </Col>
          {/* To-do: */}
          {/* <Col>
            <Button className="btn" disabled>
              Pause
            </Button>
          </Col> */}
        </Row>
        <hr />
        <Row className="my-3">
          <Col>
            <span>
              Initial Funds: ${parseFloat(this.props.initialFunds).toFixed(2)}
            </span>
          </Col>
          <Col>
            <span>
              Current Funds: $
              {parseFloat(
                this.state.currentFunds - this.state.fundsSpent
              ).toFixed(2)}
            </span>
          </Col>
          <Col>
            <span>
              Net Worth: ${parseFloat(this.state.netWorth).toFixed(2)}
            </span>
          </Col>
        </Row>
        {this.props.holdings.map((holding, i) => {
          const boughtAt = this.state.toCalc[holding.symbol]
            ? parseFloat(
                this.state.toCalc[holding.symbol].amountAtPurchase
              ).toFixed(2)
            : null;

          const currentAmount = this.state.toCalc[holding.symbol]
            ? parseFloat(
                this.state.toCalc[holding.symbol].currentAmount
              ).toFixed(2)
            : null;

          return (
            <Card className="w-100 mb-3" key={i}>
              <Card.Header>
                ${holding.symbol} - bought {holding.amount} shares on{" "}
                {holding.date}
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>Bought at: ${boughtAt}</Col>
                  <Col>
                    Total buy-in value: $
                    {parseFloat(holding.amount * boughtAt).toFixed(2)}
                  </Col>
                </Row>
                <Row>
                  <Col>Current: ${currentAmount}</Col>
                  <Col>
                    Total current value: $
                    {parseFloat(holding.amount * currentAmount).toFixed(2)}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    Change: ${parseFloat(currentAmount - boughtAt).toFixed(2)}
                  </Col>
                  <Col>
                    Total value change: $
                    {parseFloat(
                      holding.amount * currentAmount - holding.amount * boughtAt
                    ).toFixed(2)}
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-end">
                    <Button
                      onClick={() => this.sell(holding.symbol)}
                      className="mx-2 mt-3"
                    >
                      Sell
                    </Button>
                    {/* <Button
                      onClick={() => this.buy(holding.symbol)}
                      className="mx-2 mt-3"
                    >
                      Buy More
                    </Button> */}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          );
        })}
        {/* <span>Holdings: {this.props.holdings}</span> */}
      </div>
    );
  }

  async fetchStocks(stockTicker) {
    let stockData;

    await fetch(API_PREFIX + stockTicker + API_SUFFIX)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        stockData = data;
      });

    return stockData;
  }

  async componentDidMount() {
    // const { datasets } = this.refs.chart.chartInstance.data;

    const CUSTOM_STOCK_TICKERS = this.props.holdings.map(
      (holding) => holding.symbol
    );

    CUSTOM_STOCK_TICKERS.forEach((stockTicker) => {
      this.fetchStocks(stockTicker).then((data) => {
        if (this.state.data.labels.length <= 0) {
          let labels = [];

          for (var i in data["Monthly Time Series"]) {
            if (labels.length <= MAX_DATA_POINTS) {
              labels.push(i);
            }
          }

          labels.reverse();

          const newState = this.state;
          newState.data.labels = labels;
          this.setState(newState);
        }

        // for each label, we need an amount...
        let amounts = [];

        for (var j in data["Monthly Time Series"]) {
          if (amounts.length <= MAX_DATA_POINTS) {
            amounts.push(data["Monthly Time Series"][j]["1. open"]);
          }
        }

        amounts.reverse();

        const relevantStock = this.props.holdings.find(
          (holding) => holding.symbol === stockTicker
        );
        const purchaseDate = relevantStock.date;
        const purchaseMonth = purchaseDate.substr(0, 7); // 2018-01

        let amountAtPurchase;
        let currentAmount;
        const currentMonth = new Date()
          .toISOString()
          .split("T")[0]
          .substr(0, 7);

        for (var monthName in data["Monthly Time Series"]) {
          if (monthName.includes(purchaseMonth)) {
            amountAtPurchase =
              data["Monthly Time Series"][monthName]["1. open"];
          }
          if (monthName.includes(currentMonth)) {
            currentAmount = data["Monthly Time Series"][monthName]["1. open"];
          }
        }

        const newState = this.state;

        newState.fundsSpent += amountAtPurchase * relevantStock.amount;

        newState.toCalc[stockTicker] = {
          amountAtPurchase: amountAtPurchase,
          currentAmount: currentAmount,
        };
        // newState.toCalc[stockTicker].amountAtPurchase = amountAtPurchase;

        const randomColour =
          "#" +
          (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);

        newState.data.datasets.push({
          label: stockTicker,
          data: amounts,
          // backgroundColor: randomColour,
          borderColor: randomColour,
        });

        newState.netWorth = this.getNetWorth();

        this.setState(newState);
      });
    });

    // await fetch(test_API)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     tslaData = data;
    //   });

    // for each data point, we need a label for under the graph...
    let labels = [];
    // // for each label, we need an amount...
    // let amounts = [];

    // // for (var i in tslaData["Weekly Time Series"]) {
    // //   if (amounts.length <= 104) {
    // //     amounts.push(tslaData["Weekly Time Series"][i]["1. open"]);
    // //     labels.push(i);
    // //   }
    // // }

    // amounts.reverse();
    labels.reverse();

    // const newState = this.state;
    // newState.data.labels = labels;
    // newState.data.datasets[0].data = amounts;
    // this.setState(newState);
  }
}
