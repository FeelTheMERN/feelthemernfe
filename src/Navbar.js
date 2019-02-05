import React from 'react'
import { withRouter } from 'react-router-dom';
import './css/navbar.scss'
import UserMenu from './UserMenu'
import AdminMenu from './AdminMenu'

const Navbar = props => {
  //Were keeping track of state so that we can render the appropriate navbar based on the user
    console.log(props)
    if (props.location.pathname.includes('/user/') || props.location.pathname.includes('/admin/')) {
      return props.location.pathname.includes('/user/')
        ? (
          <div className="Navbar">
            <UserMenu />
          </div>
        ) : (
          <div className="Navbar">
            <AdminMenu />
          </div>
        );
    } else {
      return null;
    }
    // console.log(this.props)
    //   console.log('rendering navbar')
    // const user = window.location.pathname.split('/')[1]
    // if(user === 'admin'){
    //   return (
    //   // give the component access to history through props
    //   <div className="Navbar">
    //     <AdminMenu history={this.props.history}/>
    //   </div>
    //   )
    // }
    // if(user === 'user'){
    //   return (
    //     <div className="Navbar">
    //       <UserMenu history={this.props.history} match={this.props.match}/>
    //     </div>
    //   )
    // }
}

export default withRouter(Navbar);
