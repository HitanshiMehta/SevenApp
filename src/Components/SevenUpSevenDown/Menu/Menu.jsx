import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import { withRouter } from "react-router-dom";

import { app, menu } from "../../../Common/AppConfig.jsx";
import styles from "../../../Style/Menu/MenuStyle.module.css";
import Header from "../Header/Header.jsx";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.luck = new Audio("/Assets/luck.mp3");
    this.history = new Audio("/Assets/history.mp3");
    this.rule = new Audio("/Assets/rule.mp3");
  }
  handleRuleClick = () => {
    this.rule.play();
    this.props.history.push({
      pathname: app.introduction,
      state: {
        fromMenu: true,
      },
    });
  };
  handleHistoryClick = () => {
    this.history.play();
    this.props.history.push({
      pathname: app.history,
    });
  };
  handleLuckClick = () => {
    this.luck.play();
    this.props.history.push({
      pathname: app.luck,
    });
  };
  render() {
    return (
      <center className={styles.containerClass}>
        <Header isMenu={true} />
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col style={{ marginTop: 120 }} offset={10}>
            <Button
              className={styles.menuItem}
              onClick={this.handleHistoryClick}
            >
              {menu.scoreHistory}
            </Button>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col style={{ marginTop: 20 }} offset={10}>
            <Button className={styles.menuItem} onClick={this.handleLuckClick}>
              {menu.checkLuckGame}
            </Button>
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col style={{ marginTop: 20 }} offset={10}>
            <Button className={styles.menuItem} onClick={this.handleRuleClick}>
              {menu.rules}
            </Button>
          </Col>
        </Row>
      </center>
    );
  }
}

export default withRouter(Menu);
