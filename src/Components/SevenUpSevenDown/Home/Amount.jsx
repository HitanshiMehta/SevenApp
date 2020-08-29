import React from "react";

import { Row, Col, message } from "antd";

import styles from "../../../Style/Home/HomeStyle.module.css";
import {
  amount,
  localStorageVariableName,
  common,
} from "../../../Common/AppConfig.jsx";


// Component hierarchy (Home->Amount)
class Amount extends React.Component {
  constructor(props) {
    super(props);
    this.state = { amount: 50 };
    this.amountType = new Audio("/Assets/amountType.mp3");
  }
  componentDidMount() {
    // Special condition if we have less than 5 coins.
    // Need to do this because initially we have 50 coins(amount state).
    // When press backspace remaining coins will be 5 and that will stop process
    // This will allow user to play with less than 5 coins too!

    // Fetch current coin from localstorage
    let coins = parseInt(localStorage.getItem(localStorageVariableName.coins), 10);
    if (coins < 5) {
      this.setState(
        {
          amount: coins,
        },
        () => {
          // passing state to parent component(Home)
          this.props.onInputChange(this.state.amount);
        }
      );
    }
  }
  onInputChange = (e) => {
    this.amountType.play()
    // Fetch current coin from localstorage
    let coins = parseInt(localStorage.getItem(localStorageVariableName.coins), 10);
    const userInput = parseInt(e.target.value, 10);
    console.log(userInput, coins);
    if (userInput > coins) {
      console.log(userInput, coins);
      message.error(`Hey, you don't have ${userInput} coins!`);
    }
    else if (isNaN(e.target.value)) {
      message.error(`Please enter only numbers!`);
    }
    else {
      this.setState(
        {
          [e.target.name]: e.target.value,
        },
        () => {
          // passing state to parent component(Home)
          this.props.onInputChange(this.state.amount);
        }
      );
    }
  };
  render() {
    return (
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{ marginTop: 30, marginBottom: 60 }}
      >
        <Col className={common.gutterRow} span={24}>
          <input
            placeholder={amount.amountPlaceHolder}
            type={amount.text}
            className={styles.amount}
            style={{ width: 220, marginRight: 20 }}
            onChange={this.onInputChange}
            name={amount.amount}
            value={this.state.amount}
          />
        </Col>
      </Row>
    );
  }
}

export default Amount;
