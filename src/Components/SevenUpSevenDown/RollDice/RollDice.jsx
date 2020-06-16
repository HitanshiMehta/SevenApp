import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

import Dice from "./Dice.jsx";

import Header from "../Header/Header.jsx";
import styles from "../../../Style/RollDice/RollDiceStyle.module.css";
import {
  app,
  localStorageVariableName,
  MASTER_DATA_SERVER,
  APP_NAME,
  MODEL,
  PARAMETER,
  rollDice,
  common,
} from "../../../Common/AppConfig.jsx";
import {
  post_api_without_action,
  update_api_without_pk_without_action,
} from "../../../Common/APICommunication.jsx";

class RollDice extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    // Reference to dice will allow to assign random numbers.
    this.evenRoll = React.createRef();
    this.oddRoll = React.createRef();
  }
  componentDidMount() {
    this._isMounted = true;

    const {
      userChoice,
      amount,
      diceOne,
      diceTwo,
      diceResult,
      result,
      winningPrice,
    } = this.props.location.state.diceData;

    // Creating dictonary according naming convention of backend.
    const values = {
      user_id: localStorage.getItem(localStorageVariableName.userId),
      user_choice: userChoice,
      betting_price: amount,
      dice_one: diceOne,
      dice_two: diceTwo,
      dice_result: diceResult,
      result: result,
    };

    // Storing data to database as all data are available after redirection.
    post_api_without_action(
      `http://${MASTER_DATA_SERVER.SERVER_URL}:${MASTER_DATA_SERVER.PORT}/${APP_NAME.sevenApp}/${MODEL.game}`,
      JSON.stringify(values)
    );

    // Fetch current coin from localstorage
    let coins = localStorage.getItem(localStorageVariableName.coins);
    // If user win add winning price to current coin
    if (result === "Win")
      coins = parseInt(coins, 10) + parseInt(winningPrice, 10);
    // Set new coins to localstorage
    localStorage.setItem(localStorageVariableName.coins, coins);

    // Dictonary will be used for backend (to update coins).
    const data = { coins: coins };

    // Updating coins
    update_api_without_pk_without_action(
      `http://${MASTER_DATA_SERVER.SERVER_URL}:${MASTER_DATA_SERVER.PORT}/${
        APP_NAME.sevenApp
      }/${MODEL.user_profile}?${PARAMETER.user_id}=${localStorage.getItem(
        localStorageVariableName.userId
      )}`,
      JSON.stringify(data)
    );

    // Timeout will allow to generate random number,
    // After random number are generated they are assigned to dice.
    setTimeout(
      function () {
        if (this.evenRoll.current !== null) {
          this.evenRoll.current.dataset.roll = diceOne;
          this.oddRoll.current.dataset.roll = diceTwo;
        }
      }.bind(this),
      1
    );
    // Timeout will allow dice to rollout,
    // After that result is shown
    if (this._isMounted) {
      setTimeout(
        function () {
          this.setState({
            show: true,
          });
        }.bind(this),
        5300
      );
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const {
      userChoice,
      result,
      winningPrice,
    } = this.props.location.state.diceData;
    return (
      <div className={styles.containerClass}>
        <Header />
        <Row
          style={{ position: rollDice.relative, top: 150 }}
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          <Col className={common.gutterRow} span={7} offset={4}>
            <div>
              <Dice currentRef={this.evenRoll} />
            </div>
          </Col>
          <Col className={common.gutterRow} span={7}>
            <div>
              <Dice currentRef={this.oddRoll} />
            </div>
          </Col>
          <Col className={common.gutterRow} span={4}></Col>
        </Row>
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ position: rollDice.relative, top: 250 }}
        >
          <Col className={common.gutterRow} span={10} offset={10}>
            {this.state.show && (
              <div className={styles.resultSpan}>
                You choose {userChoice}
                <br />
                {result ? `You Won rs.${winningPrice}` : rollDice.youLose}
                <br />
                <Link to={app.home} style={{color:"#3b3b3b"}}>{rollDice.tryAgain}</Link>
              </div>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default RollDice;
