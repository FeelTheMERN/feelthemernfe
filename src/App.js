import React, { Component } from 'react';
import './css/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import axios from 'axios';
import Navbar from './Navbar';
import Welcome from './Welcome';
import Error from './Error';
import Login from './Login';

class App extends Component {
  render() {
    return (
      <BrowserRouter>{/* Using react-router-dom */}
        <div className="app">
          <Navbar />
          <Switch>
             <Route path="/" component={Welcome} exact/>
             <Route path="/login" component={Login} exact/>
             <Route path="/admin" component={Login} exact/>
             <Route component={Error}/>{/* error page will render if the incorrect endpoint is entered */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
