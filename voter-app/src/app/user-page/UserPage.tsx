import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import PrivateRoute from '../auth/PrivateRoute'
import HelpView from '../help/HelpView'
import UserPageNavbar from '../navbar/user-page/UserPageNavbar'
import ElectionsPage from './ElectionsPage'

function UserPage () {
  return (
    <div>
      <Router>
        <UserPageNavbar />
        <div className='user_page_container'>
          <PrivateRoute isExact={true} path='/user'>
            <HelpView />
          </PrivateRoute>
          <PrivateRoute isExact={true} path='/user/elections'>
            <ElectionsPage />
          </PrivateRoute>
        </div>
        <footer className='landing-footer'></footer>
      </Router>
    </div>
  )
}

export default UserPage
