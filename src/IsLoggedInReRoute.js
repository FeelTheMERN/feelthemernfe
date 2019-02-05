import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import decode from 'jwt-decode'

export default function IsLoggedInReRoute({component: Component, ...rest}) {
  return (
    <Route
        {...rest}
        render={props => {
          if(localStorage.getItem('token')){
            if(window.location.pathname.split('/')[1] === 'admin'){
                return <Redirect to={{
                  pathname: '/admin/home',
                  state: { from: props.location}}}
              />
              }
              const decoded = decode(localStorage.getItem('token'));
              console.log(decoded)
              return <Redirect to={{pathname: `/user/users/${decoded.id}/home`}} />
          } else {
            return <Component {...props} />
          }
        }
      }
    /> 
  )
}
