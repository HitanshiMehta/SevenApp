import React from "react";

import { result } from "../../../Common/AppConfig.jsx";
import styles from "../../../Style/Home/HomeStyle.module.css";

const max = 6;
const min = 1;

// Generate random number
// Component Hierarchy (Home->Result)
class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diceOne: null,
      diceTwo: null,
    };
    this.result = new Audio("/Assets/result.mp3");
  }
  handleRollDice = () => {
    this.result.play()
    const randomOne = Math.floor(Math.random() * (max - min + 1)) + min;
    const randomTwo = Math.floor(Math.random() * (max - min + 1)) + min;

    this.setState(
      {
        diceOne: randomOne,
        diceTwo: randomTwo,
      },
      () => {
        this.props.onResult(this.state.diceOne, this.state.diceTwo);
      }
    );
  };
  render() {
    return (
      <button
        style={{ width: 150, borderRadius: 8 }}
        className={styles.button}
        onClick={this.handleRollDice}
      >
        {result.rollDice}
      </button>
    );
  }
}

export default Result;
