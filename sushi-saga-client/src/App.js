import React, { Component } from "react";
import SushiContainer from "./containers/SushiContainer";
import Table from "./containers/Table";

// Endpoint!
const API = "http://localhost:3000/sushis";

class App extends Component {
  state = {
    sushis: [],
    firstSushi: 0,
    eatenSushis: [],
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
    this.setState(
      prevState => ({
        firstSushi: prevState.firstSushi + (4 % prevState.sushis.length)
      }),
      () => console.log(this.state.firstSushi)
    );
  };

  onHandleSushiPlateClick = clickedSushi => {
    // e.persist();
    console.log(clickedSushi);
    console.log(this.state);
    if (
      clickedSushi.eaten === false &&
      this.state.moneyLeft >= clickedSushi.price
    ) {
      let newSushiArray = [...this.state.sushis];
      newSushiArray.forEach(sushi => {
        if (sushi.id === clickedSushi.id) {
          sushi.eaten = true;
        }
      });
      console.log(newSushiArray);
      this.setState(
        prevState => ({
          moneyLeft: prevState.moneyLeft - clickedSushi.price,
          sushis: newSushiArray,
          eatenSushis: [...prevState.eatenSushis, clickedSushi]
        }),
        () => console.log(this.state)
      );
    }
  };

  render() {
    const itemNumber = this.state.firstSushi;
    const filteredList = this.state.sushis.slice(itemNumber, itemNumber + 4);
    return (
      <div className="app">
        <SushiContainer
          onHandleMoreButtonClick={this.onHandleMoreButtonClick}
          sushis={filteredList}
          onHandleSushiPlateClick={this.onHandleSushiPlateClick}
        />
        <Table
          eatenSushis={this.state.eatenSushis}
          moneyLeft={this.state.moneyLeft}
        />
      </div>
    );
  }
}

export default App;
