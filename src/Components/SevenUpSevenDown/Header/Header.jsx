import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col } from "antd";

import {
  app,
  localStorageVariableName,
  header,
  menuHeader,
} from "../../../Common/AppConfig.jsx";
import styles from "../../../Style/Home/HomeStyle.module.css";

// Component Hierarchy (Home->Header)
class Header extends Component {
  constructor(props) {
    super(props);
    this.logout = new Audio("/Assets/logout.mp3");
    this.menu = new Audio("/Assets/menu.mp3");
  }
  handleMenuClick = () => {
    this.menu.play();
    this.props.history.push({
      pathname: app.menu,
    });
  };
  handleHomeClick = () => {
    this.menu.play();
    this.props.history.push({
      pathname: app.home,
    });
  };
  handleLogout = () => {
    this.logout.play();
    localStorage.removeItem(localStorageVariableName.userId);
    localStorage.removeItem(localStorageVariableName.userName);
    localStorage.removeItem(localStorageVariableName.coins);
    this.props.history.push({
      pathname: app.introduction,
      state: {
        fromMenu: false,
      },
    });
  };
  render() {
    return (
      <>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {!this.props.isMenu && (
            <Col span={12} style={{ textAlign: header.left, marginTop: 20 }}>
              <img
                src={header.indexImagePath}
                alt={header.indexImageAlt}
                style={{ marginLeft: 20 }}
                onClick={this.handleMenuClick}
              />
            </Col>
          )}
          {this.props.isMenu && (
            <Col span={12} style={{ textAlign: "left", marginTop: 20 }}>
              <img
                src={menuHeader.indexImagePath}
                alt={menuHeader.indexImageAlt}
                style={{ marginLeft: 20, width: 40 }}
                onClick={this.handleHomeClick}
              />
            </Col>
          )}
          <Col span={12} style={{ textAlign: header.right, marginTop: 20 }}>
            <span className={styles.headerInfo}>
              Welcome {localStorage.getItem(localStorageVariableName.userName)},{" "}
            </span>
            <span className={styles.coinHeader}>
              Your coins are:{" "}
              {localStorage.getItem(localStorageVariableName.coins)}{" "}
            </span>
            <button className={styles.headerButton} onClick={this.handleLogout}>
              Logout
            </button>
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(Header);
