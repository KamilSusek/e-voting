import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { RootState } from '../../store'

function PrivateRoute ({ path, children, isExact }: any) {
  const { isLoggedIn } = useSelector((state: RootState) => state.login)

  if (localStorage.getItem("isLoggedIn") === "true") {
    console.log('true', isLoggedIn)
    if (isExact) {
      return (
        <Route exact path={path}>
          {children}
        </Route>
      )
    } else {
      return <Route path={path}>{children}</Route>
    }
  } else {
    return <Redirect to='/' />
  }
}

export default PrivateRoute
