import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import { withRouter } from "react-router-dom";

import styles from "../../../Style/Introduction/Introduction.module.css";
import { app, common, introduction } from "../../../Common/AppConfig.jsx";
import Header from "../Header/Header";

// Component Hierarchy (Index->Introduction )
class Introduction extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.login = new Audio("/Assets/login.mp3");
    this.home = new Audio("/Assets/play.mp3");
  }
  handleLoginClick = () => {
    this.login.play();

    this.props.history.push({
      pathname: app.login,
      state: {
        login: introduction.block,
        register: introduction.none,
      },
    });
  };
  handleRegisterClick = () => {
    this.login.play();
    this.props.history.push({
      pathname: app.login,
      state: {
        login: introduction.none,
        register: introduction.block,
      },
    });
  };
  handleHomeClick = () => {
    this.home.play();
    this.props.history.push({
      pathname: app.home,
    });
  };
  render() {
    return (
      <center className={styles.containerClass}>
        {/* Display header if introduction page is open from menu */}
        {this.props.location.state.fromMenu && <Header />}
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className={`${common.gutterRow} ${styles.homeHeader}`} span={24}>
            {common.sevenUp} {common.sevenDown}
          </Col>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col
            className={`${common.gutterRow} ${styles.content}`}
            span={9}
            offset={8}
          >
            {introduction.intro}
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col
            className={`${common.gutterRow} ${styles.startGame}`}
            span={9}
            offset={8}
          >
            {introduction.startGame}
          </Col>
        </Row>
        {!this.props.location.state.fromMenu && (
          <>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className={`${common.gutterRow}`} span={9} offset={8}>
                <Button
                  onClick={this.handleLoginClick}
                  className={styles.button}
                >
                  {introduction.login}
                </Button>
              </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className={`${common.gutterRow}`} span={9} offset={8}>
                <Button
                  onClick={this.handleRegisterClick}
                  className={styles.button}
                >
                  {introduction.register}
                </Button>
              </Col>
            </Row>
          </>
        )}
        {/* Display let's play button if introduction page is open from menu */}
        {this.props.location.state.fromMenu && (
          <>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className={`${common.gutterRow}`} span={9} offset={8}>
                <Button
                  onClick={this.handleHomeClick}
                  className={styles.button}
                >
                  {introduction.letsPlay}
                </Button>
              </Col>
            </Row>
          </>
        )}
      </center>
    );
  }
}

export default withRouter(Introduction);
