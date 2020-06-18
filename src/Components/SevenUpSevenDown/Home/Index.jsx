import React from "react";
import { Redirect } from "react-router-dom";

import styles from "../../../Style/Home/HomeStyle.module.css";
import { app, index, common } from "../../../Common/AppConfig.jsx";

// First Page
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false };
  }
  // Display first image for 2000 ms
  componentDidMount() {
    this.timer = setTimeout(() => this.setState({ redirect: true }), 3000);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  render() {
    return (
      <>
        {this.state.redirect ? (
          <Redirect
            to={{
              pathname: app.introduction,
              state: {
                fromMenu: false,
              },
            }}
          ></Redirect>
        ) : (
          <>
            <img
              src={index.indexImagePath}
              alt={index.indexImageAlt}
              className={styles.indexImg}
            />
            <span className={styles.topLeft}>{common.sevenUp}</span>
            <span className={styles.bottomRight}>{common.sevenDown}</span>
          </>
        )}
      </>
    );
  }
}

export default Index;
