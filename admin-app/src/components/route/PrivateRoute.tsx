import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function PrivateRoute ({ children, exact, path }: any) {
  if (localStorage.getItem('isLoggedIn') === 'true') {
    return (
      <Route exact={exact} path={path}>
        {children}
      </Route>
    )
  } else {
    return <Redirect to='/' />
  }
}

export default PrivateRoute
