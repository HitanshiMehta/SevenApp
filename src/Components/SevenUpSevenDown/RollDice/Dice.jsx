import React, { Component } from "react";
import styles from "../../../Style/RollDice/DiceStyle.module.css";

class Dice extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <ol
          className={`${styles.dieList} ${styles.evenRoll}`}
          ref={this.props.currentRef}
        >
          <li className={styles.dieItem} data-side={1}>
            <span className={styles.dot}></span>
          </li>
          <li className={styles.dieItem} data-side={2}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </li>
          <li className={styles.dieItem} data-side={3}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </li>
          <li className={styles.dieItem} data-side={4}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </li>
          <li className={styles.dieItem} data-side={5}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </li>
          <li className={styles.dieItem} data-side={6}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </li>
        </ol>
      </>
    );
  }
}

export default Dice;
