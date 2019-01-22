import React from 'react';
import Login from './Login';
import logo from "./assets/logo/logo.png"

const AdminLogin = () => {
  return (
    <div className="spread">
      <img id="logo" src={logo} alt="SkyeFIT Logo"></img>
      <h2>Welcome Skye</h2>
      <Login />
    </div>
  )
}

export default AdminLogin;