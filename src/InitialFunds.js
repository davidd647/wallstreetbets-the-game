import React, { Component } from "react";

import Form from "react-bootstrap/Form";

export default class InitialFunds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialFunds: "",
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleFundsChange = this.handleFundsChange.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    console.log("hi");

    console.log(this.state.initialFunds);

    // shortening var name for readability
    const initialFunds = parseInt(this.state.initialFunds);
    console.log("parsed int, and now we have: ", initialFunds);

    if (typeof initialFunds === "number" && initialFunds > 0) {
      console.log("now changing screen...");
      this.props.setInitialFunds(initialFunds);
      this.props.changeScreen(1);
    } else {
      alert("please use numbers only in the input field");
    }
  }

  handleFundsChange(e) {
    const newState = this.state;
    newState.initialFunds = e.target.value;
    this.setState(newState);
  }

  render() {
    return (
      <Form>
        <Form.Group controlId="formInitialFunds">
          <Form.Label>Initial Available Funds</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. '5000' (please do not use special characters)"
            value={this.state.initialFunds}
            onChange={this.handleFundsChange}
          />
          <Form.Text className="text-muted">
            You will have this amount of money for the simulation.
          </Form.Text>
        </Form.Group>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.handleClick}
        >
          Next ➡
        </button>
      </Form>
    );
  }
}
