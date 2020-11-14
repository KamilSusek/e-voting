import React from 'react'
import './App.css'
import LandingPage from './app/landing-page/LandingPage'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import PrivateRoute from './app/auth/PrivateRoute'
import UserPage from './app/user-page/UserPage'

function App () {
  return (
    <Router>
      <Switch>
        <PrivateRoute path='/user'>
          <UserPage />
        </PrivateRoute>
        <Route path='/'>
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
