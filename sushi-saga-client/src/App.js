import React, { Component } from "react";
import SushiContainer from "./containers/SushiContainer";
import Table from "./containers/Table";

// Endpoint!
const API = "http://localhost:3000/sushis";

class App extends Component {
  state = {
    sushis: [],
    sushi4: [],
    moneyLeft: 100
  };

  componentDidMount() {
    fetch(API)
      .then(res => res.json())
      .then(res => {
        const fixedArray = res.map(sushi => {
          return { ...sushi, eaten: false };
        });
        this.setState({ sushis: fixedArray });
      })
      .catch(err => console.log(err));
  }

  onHandleMoreButtonClick = e => {
    e.preventDefault();
    const newSushis4 = this.state.sushis.splice(-4);
    this.setState({ sushi4: newSushis4 }, () => console.log(this.state));
  };

  onHandleSushiPlateClick = clickedSushi => {
    // e.persist();
    console.log(clickedSushi);
    this.setState(
      prevState => ({
        moneyLeft: prevState.moneyLeft - clickedSushi.price,
        sushi4: prevState.sushi4.map(sushi => {
          return sushi.id === parseInt(clickedSushi.id, 10)
            ? (sushi.eaten = true)
            : sushi;
        })
      }),
      () => console.log(this.state)
    );
  };

  render() {
    return (
      <div className="app">
        <SushiContainer
          onHandleMoreButtonClick={this.onHandleMoreButtonClick}
          sushi4={this.state.sushi4}
          onHandleSushiPlateClick={this.onHandleSushiPlateClick}
        />
        <Table sushi4={this.state.sushi4} moneyLeft={this.state.moneyLeft} />
      </div>
    );
  }
}

export default App;
