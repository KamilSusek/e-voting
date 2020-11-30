import { Button } from '@material-ui/core'
import React from 'react'
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
    <NavBar
      actionButton={
        <div>
          <Button
            onClick={logout}
            variant='contained'
            color='primary'
            size='large'
          >
            Logout
          </Button>
        </div>
      }
    >
      <ul className='links'>
        <li>
          <Link to='/user/elections'>Elections</Link>
        </li>
        <li>
          <Link to='/user'>Help</Link>
        </li>
      </ul>
    </NavBar>
  )
}

export default UserPageNavbar
