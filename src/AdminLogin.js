import React from 'react';
import Login from './Login';
import logo from "./assets/logo/logo.png"

const AdminLogin = (props) => {
  return (
    <div className="spread">
      <img id="logo" src={logo} alt="SkyeFIT Logo"></img>
      <h2>Welcome Skye</h2>
      <Login history={props.history}/>
    </div>
  )
}

export default AdminLogin;