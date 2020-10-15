import React, { Component } from "react";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.changeScreen(1);
  }

  render() {
    return (
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
              hackathons every week to help developers and recruiters find each
              other, and encourage continual learning.
            </p>

            <h3>When was this made?</h3>
            <p>Submitted on October 15th, 2020.</p>

            <h3>How do I use this?</h3>
            <p>
              Enter in how much money you want to start off with in the stock
              market simulator, and click next!
            </p>

            <Button onClick={this.handleClick}>Next Page</Button>
          </Card.Body>
        </Card>
      </Row>
    );
  }
}
