import React, { Component } from "react";

import Form from "react-bootstrap/Form";

export default class StockPurchases extends Component {
  constructor(props) {
    super(props);

    this.state = {
      symbol: "",
      date: "",
      amount: "",
    };

    this.handleSymbolChange = this.handleSymbolChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleAddStock = this.handleAddStock.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleSymbolChange(e) {
    const newState = this.state;
    newState.symbol = e.target.value;
    this.setState(newState);
  }
  handleDateChange(e) {
    const newState = this.state;
    newState.date = e.target.value;
    this.setState(newState);
  }
  handleAmountChange(e) {
    const newState = this.state;
    newState.amount = e.target.value;
    this.setState(newState);
  }
  handleAddStock(e) {
    e.preventDefault();

    this.props.addToHoldings({
      symbol: this.state.symbol,
      date: this.state.date,
      amount: this.state.amount,
    });

    const newState = this.state;
    newState.symbol = "";
    newState.date = "";
    newState.amount = "";
  }

  handleNext(e) {
    e.preventDefault();

    this.props.changeScreen(2);
  }

  render() {
    return (
      <div>
        <span>Initial funds: ${this.props.initialFunds}</span>
        <Form>
          <Form.Group controlId="formStockPurchases">
            <Form.Label>Stock Ticker Symbol</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. 'TSLA'"
              value={this.state.symbol}
              onChange={this.handleSymbolChange}
            />
            <Form.Text className="text-muted">
              You may choose up to 3 stocks for the simulation!
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formDateStockBought">
            <Form.Label>Date Stock Bought</Form.Label>
            <Form.Control
              type="text"
              placeholder="YYYY-MM-DD"
              value={this.state.date}
              onChange={this.handleDateChange}
            />
            <Form.Text className="text-muted">E.g. 2018-01-01</Form.Text>
          </Form.Group>
          <Form.Group controlId="formSharesBought">
            <Form.Label>Shares Bought</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={this.state.amount}
              onChange={this.handleAmountChange}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <button
            type="submit"
            className="btn btn-secondary mb-3"
            onClick={this.handleAddStock}
          >
            Add Stock
          </button>
        </Form>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.handleNext}
        >
          Next ➡
        </button>
      </div>
    );
  }
}
