import React from "react";

import { Row, Col } from "antd";

import styles from "../../../Style/Home/HomeStyle.module.css";
import { common } from "../../../Common/AppConfig.jsx";

const Title = () => {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col className={`${common.gutterRow} ${styles.homeHeader}`} span={24}>
        {common.sevenUp} {common.sevenDown}
      </Col>
    </Row>
  );
};

export default Title;
