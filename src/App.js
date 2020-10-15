import React from "react";
import "./App.css";
import Sim from "./Sim";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Sim />
        </Row>
      </Container>
    </div>
  );
}

export default App;
