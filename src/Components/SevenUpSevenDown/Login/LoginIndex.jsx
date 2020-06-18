import React, { Component } from "react";
import styles from "../../../Style/Login/LoginStyle.module.css";
import { loginIndex } from "../../../Common/AppConfig.jsx";
import Login from "./Login";
import Register from "./Register";
import { Card } from "antd";

const gridStyle = {
  width: "50%",
  height: "510px",
  padding: 0,
};

// Component Hierarchy (Introduction->LoginIndex)
class LoginIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStyle: {
        display: this.props.location.state.login,
      },
      regStyle: {
        display: this.props.location.state.register,
      },
    };
  }
  displayRegister = () => {
    this.setState({
      loginStyle: { display: loginIndex.none },
      regStyle: { display: loginIndex.block },
    });
  };
  displayLogin = () => {
    this.setState({
      loginStyle: { display: loginIndex.block },
      regStyle: { display: loginIndex.none },
    });
  };
  render() {
    return (
      <div className={styles.containerClass}>
        <center>
          <div className="site-card-border-less-wrapper">
            <Card
              style={{ maxWidth: 1000, height: "auto", top: 70, width: "100%" }}
            >
              <Card.Grid hoverable={true} style={gridStyle}>
                <img
                  src={loginIndex.loginImagePath}
                  alt={loginIndex.loginImagePath}
                  className={styles.loginImg}
                />
              </Card.Grid>
              <Card.Grid hoverable={true} style={gridStyle}>
                <Login
                  loginStyle={this.state.loginStyle}
                  onNewAccountClick={this.displayRegister}
                />
                <Register
                  regStyle={this.state.regStyle}
                  onRedirectToLoginClick={this.displayLogin}
                />
              </Card.Grid>
            </Card>
          </div>
        </center>
      </div>
    );
  }
}

export default LoginIndex;
