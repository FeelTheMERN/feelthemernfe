import React, { Component } from 'react';
import './css/App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import axios from 'axios';
import Navbar from './Navbar';
import Welcome from './Welcome';
import Error from './Error';
// import Login from './Login';
import ListUsers from './ListUsers';
import UserProfile from './UserProfile';
import NewUser from './NewUser'
import AdminLogin from './AdminLogin';

class App extends Component {
  render() {
    return (
      <BrowserRouter>{/* Using react-router-dom */}
        <div className="App">
          <Navbar />
          <Switch>
             <Route path="/" component={Welcome} exact/>
             <Route path="/admin/new-user" component={NewUser} exact/>
             <Route path="/admin" component={AdminLogin} exact/>
             <Route path="/admin/users" component={ListUsers} exact/>
             <Route path="/admin/users/:id" component={UserProfile} exact/>
             <Route component={Error}/>{/* error page will render if the incorrect endpoint is entered */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
