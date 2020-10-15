import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

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
      <div>
        <Row>
          <Card>
            <Card.Body>
              <h3>What is this?</h3>
              <p>This is r/Wallstreetbets: The Game</p>

              <h3>Why tho?</h3>
              <p>
                r/Wallstreetbets: The Game was made as an experiment for a{" "}
                <a
                  href="https://mintbean.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mintbean
                </a>{" "}
                hackathon.
              </p>

              <h3>Where is Mintbean?</h3>
              <p>
                Mintbean is an internet-based hackathon initiative. They host
                hackathons every week to help developers and recruiters find
                each other, and encourage continual learning.
              </p>

              <h3>When was this made?</h3>
              <p>Submitted on October 15th, 2020.</p>

              <h3>How do I use this?</h3>
              <p>
                Enter in how much money you want to start off with in the stock
                market simulator, and click next!
              </p>
            </Card.Body>
          </Card>
        </Row>
        <Row>
          <Card className="w-100 my-3">
            <Card.Body>
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
            </Card.Body>
          </Card>
        </Row>
      </div>
    );
  }
}
