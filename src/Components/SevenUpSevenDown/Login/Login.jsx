import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { withRouter } from "react-router-dom";

import {
  app,
  login,
  formLayout,
  tailLayout,
  validateMessages,
  localStorageVariableName,
  MASTER_DATA_SERVER,
  APP_NAME,
  MODEL,
  PARAMETER,
} from "../../../Common/AppConfig.jsx";
import styles from "../../../Style/Login/LoginStyle.module.css";
import { get_api } from "../../../Common/APICommunication.jsx";

// Component Hierarchy (Introduction->LoginIndex->Login)
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginRequest: [],
    };
    this.loginType = new Audio("/Assets/play.mp3");
    this.loginButton = new Audio("/Assets/loginButton.mp3");
  }
  onFinish = (values) => {
    this.loginButton.play()
    get_api(
      `http://${MASTER_DATA_SERVER.SERVER_URL}:${MASTER_DATA_SERVER.PORT}/${APP_NAME.sevenApp}/${MODEL.user}?${PARAMETER.username}=${values.username}&${PARAMETER.password}=${values.password}`
    )
      .then((response) => response.json())
      .then((loginRequest) => {
        // User not found
        if (typeof loginRequest === "string") {
          message.error(loginRequest);
        } else {
          console.log(loginRequest);
          localStorage.setItem(
            localStorageVariableName.userId,
            loginRequest.id
          );
          localStorage.setItem(
            localStorageVariableName.coins,
            loginRequest.user_profile.coins
          );
          localStorage.setItem(
            localStorageVariableName.userName,
            loginRequest.username
          );
          this.props.history.push({
            pathname: app.home,
          });
        }
      });
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // display register
  onNewAccountClick = () => {
    this.props.onNewAccountClick();
  };

  handleChange = () => {
    this.loginType.play();
    this.switch = new Audio("/Assets/switch.mp3");
  };

  render() {
    return (
      <div style={this.props.loginStyle}>
        <div className={styles.loginHeader}>Login</div>
        <Form
          {...formLayout}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          validateMessages={validateMessages}
        >
          <Form.Item
            label={login.usernameLabel}
            name={login.usernameName}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input className={styles.inputStyle} onChange={this.handleChange} />
          </Form.Item>

          <Form.Item
            label={login.passwordLabel}
            name={login.passwordName}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password
              className={styles.inputStyle}
              onChange={this.handleChange}
            />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              type={login.default}
              className={styles.button}
              style={{ marginTop: 15 }}
              htmlType={login.submit}
            >
              {login.login}
            </Button>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <span className={styles.newAccount}>{login.dontHaveAccount}</span>
            <Button
              type={login.button}
              onClick={this.onNewAccountClick}
              className={styles.btnLink}
            >
              {login.createOne}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default withRouter(Login);
