import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { get_api } from "../../../Common/APICommunication.jsx";
import {
  MASTER_DATA_SERVER,
  APP_NAME,
  MODEL,
  PARAMETER,
  localStorageVariableName,
  history,
} from "../../../Common/AppConfig.jsx";

import styles from "../../../Style/Score/HistoryStyle.module.css";
import Header from "../Header/Header.jsx";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: history.userChoiceHeading,
          field: history.userChoice,
          sortable: true,
          filter: true,
        },
        {
          headerName: history.bettingPriceHeading,
          field: history.bettingPrice,
          sortable: true,
          filter: true,
        },
        {
          headerName: history.diceOneHeading,
          field: history.diceOne,
          sortable: true,
          filter: true,
        },
        {
          headerName: history.diceTwoHeading,
          field: history.diceTwo,
          sortable: true,
          filter: true,
        },
        {
          headerName: history.diceResultHeading,
          field: history.diceResult,
          sortable: true,
          filter: true,
        },
        {
          headerName: history.resultHeading,
          field: history.result,
          sortable: true,
          filter: true,
        },
      ],
      rowData: [],
    };
  }
  componentDidMount() {
    get_api(
      `http://${MASTER_DATA_SERVER.SERVER_URL}:${MASTER_DATA_SERVER.PORT}/${
        APP_NAME.sevenApp
      }/${MODEL.game}?${PARAMETER.user_id}=${localStorage.getItem(
        localStorageVariableName.userId
      )}`
    )
      .then((response) => response.json())
      .then((rowData) => this.setState({ rowData }))
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <div className={styles.containerClass}>
        <Header />
        <div
          className="ag-theme-alpine"
          style={{
            height: "500px",
            width: "1100px",
            marginLeft: "120px",
            marginTop: "40px",
            marginRight: "60px",
          }}
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
          ></AgGridReact>
        </div>
      </div>
    );
  }
}

export default History;
