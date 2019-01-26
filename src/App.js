import React, { Component } from 'react';
import './css/App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Welcome from './Welcome';
import Error from './Error';
import ListUsers from './ListUsers';
import UserProfile from './UserProfile';
import NewUser from './NewUser';
import AdminLogin from './AdminLogin';
import UserHome from './UserHome';
import AdminHome from './AdminHome';
import MealPlan from './MealPlan';
import ProtectedRoute from './ProtectedRoute';
import UserSessions from './UserSessions'


class App extends Component {
  renderNavBar = () => {
    let nav = <Navbar />
    if (window.location.pathname === '/') nav = null
    if (window.location.pathname === '/admin') nav = null
    return nav
  }

  render() {
    return (
      <BrowserRouter>{/* Using react-router-dom */}
        <div className="App">
          {this.renderNavBar()}
          <Switch>
             <Route path="/" component={Welcome} exact/>
             <Route path="/admin" component={AdminLogin} exact/>
             <ProtectedRoute path="/admin/home" component={AdminHome} exact/>
             <ProtectedRoute path="/admin/users" component={ListUsers} exact/>
             <ProtectedRoute path="/admin/users/:id" component={UserProfile} exact/>
             <ProtectedRoute path="/admin/users/:id/mealplan" component={MealPlan} exact/>
             <ProtectedRoute path="/admin/new-user" component={NewUser} exact/>
             <ProtectedRoute path="/user/users/:id/home" component={UserHome} exact/>
             <ProtectedRoute path="/user/users/:id/sessions" component={UserSessions} exact/>
             <Route component={Error}/>{/* error page will render if the incorrect endpoint is entered */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
