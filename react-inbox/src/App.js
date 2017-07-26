import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import Toolbar from './components/Toolbar/Toolbar';
import Messages from './components/Messages/Messages'
import Compose from './components//Compose.js';




class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="container-fluid">
            <Route path="/" component={Toolbar} />
            <Route exact path="/compose" component={Compose} />
            <Route path="/" component={Messages} />
          </div>
        </div>
      </Router>
    )
  }
}


export default App
