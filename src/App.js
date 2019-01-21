import React, { Component } from 'react';
import './css/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Welcome from './Welcome';
import Error from './Error';

class App extends Component {
  render() {
    return (
      <BrowserRouter>{/* Using react-router-dom */}
        <div className="app">
          <Navbar />
          <Switch>
             <Route path="/" component={Welcome} exact/>
             <Route component={Error}/>{/* error page will render if the incorrect endpoint is entered */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
