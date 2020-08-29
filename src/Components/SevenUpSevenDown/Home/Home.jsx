import React from "react";
import { Redirect } from "react-router-dom";
import { message } from "antd";

import Result from "./Result.jsx";
import UserChoice from "./UserChoice.jsx";
import Title from "../Header/Title.jsx";
import Header from "../Header/Header.jsx";
import Amount from "./Amount.jsx";

import {
  app,
  localStorageVariableName,
  home,
  common,
} from "../../../Common/AppConfig.jsx";
import styles from "../../../Style/Home/HomeStyle.module.css";

// Component hierarchy (Home-> Header && Title && UserChoice->UserInputButton
// && Amount && Result)
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diceOne: 0,
      diceTwo: 0,
      diceResult: 0,
      userChoice: 0,
      amount: 50,
      result: "Lose",
      winningPrice: 0,
      sevenDownPrice: 100,
      sevenPrice: 150,
      sevenUpPrice: 100,
    };
  }
  // storing random number from result component
  handleResult = (diceOne, diceTwo) => {
    const { userChoice, amount } = this.state;
    const diceResult = diceOne + diceTwo;

    // Error message before redirecting to roll dice page
    // (Redirecting to roll dice page on setState of diceResult)

    // betting option is not selected (7, 7 dwon or 7 up)
    if (userChoice === 0) {
      message.error(home.optionMessage);
    }

    // If everything is OKAY!
    else {
      // Fetch current coin from localstorage
      let coins = parseInt(
        localStorage.getItem(localStorageVariableName.coins),
        10
      );
      // Deduct betting price from current coin
      coins = parseInt(coins, 10) - parseInt(amount, 10);
      // Set new coins to localstorage
      localStorage.setItem(localStorageVariableName.coins, coins);

      // Comparing user choice and result of game
      // On right prediction calculating winning price
      if (userChoice === diceResult) {
        this.setState({
          result: home.win,
          winningPrice: amount * 3,
        });
      } else if (diceResult >= 8 && userChoice === 8) {
        this.setState({
          result: home.win,
          winningPrice: amount * 2,
        });
      } else if (diceResult <= 6 && userChoice === 6) {
        this.setState({
          result: home.win,
          winningPrice: amount * 2,
        });
      }

      // For database
      if (userChoice === 7) {
        this.setState({ userChoice: common.seven });
      } else if (userChoice === 8) {
        this.setState({ userChoice: common.sevenUp });
      } else {
        this.setState({ userChoice: common.sevenDown });
      }

      this.setState({
        diceOne,
        diceTwo,
        diceResult,
      });
    }
  };

  // storing 7 down(indicator is 6) or 7(indicator is 7)
  // or 7up(indicator is 8) from userchoice component
  handleUserChoice = (userChoice) => {
    this.setState({ userChoice });
  };

  // stroing amount from amount component
  handleInputChange = (amount) => {
    this.setState({
      amount: amount,
      sevenDownPrice: amount * 2,
      sevenPrice: amount * 3,
      sevenUpPrice: amount * 2,
    });
  };
  render() {
    return (
      <center>
        <div className={styles.containerClass}>
          <Header />
          <Title />
          <UserChoice
            onUserChoice={this.handleUserChoice}
            sevenDownPrice={this.state.sevenDownPrice}
            sevenPrice={this.state.sevenPrice}
            sevenUpPrice={this.state.sevenUpPrice}
          />
          <Amount onInputChange={this.handleInputChange} />
          <Result
            onResult={this.handleResult}
            userChoice={this.state.userChoice}
            amount={this.state.amount}
          />
        </div>

        {this.state.diceResult ? (
          <Redirect
            to={{
              pathname: app.rollDice,
              state: {
                diceData: this.state,
              },
            }}
          ></Redirect>
        ) : null}
      </center>
    );
  }
}

export default Home;
