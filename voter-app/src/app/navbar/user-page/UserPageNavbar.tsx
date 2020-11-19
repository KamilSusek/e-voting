import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Link, useHistory } from 'react-router-dom'
import { handleLogout } from '../../../services/loginSlice'
import NavBar from '../NavBar'

function UserPageNavbar () {
  const history = useHistory()
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(handleLogout())
    history.push('/')
  }

  return (
    <NavBar>
      <ul>
        <li>
          <Link to='/user'>Home</Link>
        </li>
        <li>
          <Link to='/user/elections'>Elections</Link>
        </li>
        <li>
          <Link to='/user/account'>Account info</Link>
        </li>
        <li>
          <Button onClick={logout}>Logout</Button>
        </li>
      </ul>
    </NavBar>
  )
}

export default UserPageNavbar
