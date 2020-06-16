import React from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import './App.css';

import Index from './Components/SevenUpSevenDown/Home/Index.jsx';
import RollDice from './Components/SevenUpSevenDown/RollDice/RollDice.jsx';
import Home from './Components/SevenUpSevenDown/Home/Home.jsx';
import { app, localStorageVariableName } from "./Common/AppConfig.jsx";
import Login from './Components/SevenUpSevenDown/Login/LoginIndex.jsx';
import Introduction from './Components/SevenUpSevenDown/Introduction/Introduction';
import Menu from './Components/SevenUpSevenDown/Menu/Menu';
import History from './Components/SevenUpSevenDown/Score/History';
import Luck from './Components/SevenUpSevenDown/Score/Luck';

function App() {
  return (
    <>
      {/* Only have one BrowserRouter
      Connect all component of project to path here */}
      <BrowserRouter>
        <Route path={app.index} component={Index} />
        <Route path={app.rollDice} component={RollDice} />
        <Route path={app.home} component={Home} />
        <Route path={app.login} component={Login} />
        <Route path={app.introduction} component={Introduction} />
        <Route path={app.menu} component={Menu} />
        <Route path={app.history} component={History} />
        <Route path={app.luck} component={Luck} />
        {/* <Redirect to={app.luck} /> */}
        {/* <Redirect to={app.home} /> */}
        {/* <Redirect to={app.introduction} /> */}
        {localStorage.getItem(localStorageVariableName.userName) == null ? <Redirect to={app.index} /> : <Redirect to={app.home} />}
      </BrowserRouter>
    </>
  );
}

export default App;
