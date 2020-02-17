import React from "react";
import { withRouter } from "react-router-dom";
import { Routes } from "../../Routes/components/Routes";

import Notifications from "../../Notifications"

import logo from "../../static/img/opendatahub_logo.png";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">
              <img className="navbar-brand-name" src={logo} alt="AI Library"/>
            </a>
          </div>
        </div>
      </nav>
      <Routes/>
      <Notifications/>
    </div>
  );
}


export default withRouter(App);
