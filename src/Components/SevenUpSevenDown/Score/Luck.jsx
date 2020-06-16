import React, { Component } from "react";
import { Row, Col } from "antd";

import {
  MASTER_DATA_SERVER,
  APP_NAME,
  MODEL,
  PARAMETER,
  localStorageVariableName,
  luck,
} from "../../../Common/AppConfig.jsx";
import styles from "../../../Style/Score/LuckStyle.module.css";
import Header from "../Header/Header";
import { get_api } from "../../../Common/APICommunication.jsx";

class Luck extends Component {
  constructor(props) {
    super(props);
    this.state = { luck: [] };
  }
  componentDidMount() {
    get_api(
      `http://${MASTER_DATA_SERVER.SERVER_URL}:${MASTER_DATA_SERVER.PORT}/${
        APP_NAME.sevenApp
      }/${MODEL.game}?${PARAMETER.user_id}=${localStorage.getItem(
        localStorageVariableName.userId
      )}&${PARAMETER.get_luck}`
    )
      .then((response) => response.json())
      .then((luck) =>
        this.setState({ luck }, () => {
          console.log(this.state.luck["Win"]);
        })
      );
  }
  render() {
    const win = (Math.round(this.state.luck[luck.win] * 100) / 100).toFixed(2);
    const lose = (Math.round(this.state.luck[luck.lose] * 100) / 100).toFixed(
      2
    );
    return (
      <div className={styles.containerClass}>
        <Header />
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          style={{ marginTop: 120 }}
        >
          <Col className="gutter-row" span={8} offset={4}>
            <div className={styles.title}>{luck.youWin}</div>
          </Col>
          <Col className="gutter-row" span={8} offset={3}>
            <div className={styles.title}>{luck.youLose}</div>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={7} offset={4}>
            <div className={styles.win}>{win}% time.</div>
          </Col>
          <Col className="gutter-row" span={7} offset={4}>
            <div className={styles.lose}>{lose}% time.</div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Luck;
