import React from "react";

import { userInputButton } from "../../../Common/AppConfig.jsx";
import styles from "../../../Style/Home/HomeStyle.module.css";

// Component Hierarchy (Home->UserChoice->UserInputButton)
class UserInputButton extends React.Component {
  userClick = (e) => {
    // changin background color(to original) of other component
    // on selection of current component
    if (this.props.sevenDownRef !== undefined) {
      this.props.sevenDownRef.current.style.backgroundColor =
        userInputButton.btnBgColor;
    }
    if (this.props.sevenRef !== undefined) {
      this.props.sevenRef.current.style.backgroundColor =
        userInputButton.btnBgColor;
    }
    if (this.props.sevenUpRef !== undefined) {
      this.props.sevenUpRef.current.style.backgroundColor =
        userInputButton.btnBgColor;
    }
    this.props.onUserInput(this.props.indicator);
    e.target.style.backgroundColor = userInputButton.btnColor;
  };
  render() {
    return (
      <button className={styles.btn} onClick={this.userClick}>
        <span ref={this.props.currentRef}>{this.props.text}</span>
        <div className={styles.priceImg}>{this.props.price}</div>
      </button>
    );
  }
}

export default UserInputButton;
