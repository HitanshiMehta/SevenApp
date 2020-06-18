import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { withRouter } from "react-router-dom";

import {
  app,
  register,
  formLayout,
  tailLayout,
  validateMessages,
  localStorageVariableName,
  MASTER_DATA_SERVER,
  APP_NAME,
  MODEL,
} from "../../../Common/AppConfig.jsx";
import styles from "../../../Style/Login/LoginStyle.module.css";
import { post_api } from "../../../Common/APICommunication.jsx";

// Component Hierarchy (Introduction->LoginIndex->Register)
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onFinish = (values) => {
    // password and re-enter password validation
    if (values.password !== values.re_password) {
      message.error(register.passwordNotMatch);
      return false;
    }
    // console.log(JSON.stringify(values));
    // Register user
    post_api(
      `http://${MASTER_DATA_SERVER.SERVER_URL}:${MASTER_DATA_SERVER.PORT}/${APP_NAME.sevenApp}/${MODEL.user}`,
      JSON.stringify(values)
    )
      .then((response) => response.json())
      .then((result) => {
        // Username already exists!
        // Format of error is :
        //   {
        //     "username": [
        //         "A user with that username already exists."
        //     ]
        // }
        if (Array.isArray(result.username)) {
          message.error(result.username);
        }
        // Password length is less than 8 character
        // Format of error is :
        //   [
        //     "This password is too short. It must contain at least 8 characters."
        // ]
        else if (Array.isArray(result)) {
          message.error(result);
        }
        // User register successfully.
        else {
          localStorage.setItem(localStorageVariableName.userId, result.id);
          localStorage.setItem(
            localStorageVariableName.userName,
            result.username
          );
          localStorage.setItem(
            localStorageVariableName.coins,
            result.user_profile.coins
          );
          this.props.history.push({
            pathname: app.home,
          });
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  onRedirectToLoginClick = () => {
    this.props.onRedirectToLoginClick();
  };

  render() {
    return (
      <div style={this.props.regStyle}>
        <div className={styles.regHeader}>Register</div>
        <Form
          style={this.props.registerStyle}
          {...formLayout}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          validateMessages={validateMessages}
        >
          <Form.Item
            label={register.usernameLabel}
            name={register.usernameName}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input className={styles.inputStyle} />
          </Form.Item>

          <Form.Item
            label={register.EmailIdLabel}
            name={register.EmailIdName}
            rules={[
              {
                type: register.EmailType,
                required: true,
              },
            ]}
          >
            <Input className={styles.inputStyle} />
          </Form.Item>

          <Form.Item
            label={register.passwordLabel}
            name={register.passwordName}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password className={styles.inputStyle} />
          </Form.Item>

          <Form.Item
            label={register.RePasswordLabel}
            name={register.RePasswordName}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password className={styles.inputStyle} />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              type={register.default}
              className={styles.button}
              htmlType={register.submit}
            >
              Submit
            </Button>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button
              type={register.button}
              onClick={this.onRedirectToLoginClick}
              className={styles.btnLink}
            >
              {register.haveAccount}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default withRouter(Register);
