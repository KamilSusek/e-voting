import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import PrivateRoute from '../auth/PrivateRoute'
import UserPageNavbar from '../navbar/user-page/UserPageNavbar'
import ElectionsPage from './ElectionsPage'

function UserPage () {
  return (
    <div>
      <Router>
        <UserPageNavbar />
        <div className='user_page_container'>
          <PrivateRoute isExact={true} path='/user'>
            home
          </PrivateRoute>
          <PrivateRoute path='/user/elections'>
            <ElectionsPage />
          </PrivateRoute>
          <PrivateRoute path='/user/account'>a</PrivateRoute>
        </div>
        <footer className='landing-footer'></footer>
      </Router>
    </div>
  )
}

export default UserPage
