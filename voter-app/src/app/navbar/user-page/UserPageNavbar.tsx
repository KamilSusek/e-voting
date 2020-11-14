import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory
} from 'react-router-dom'
import { handleLogout } from '../../../services/loginSlice'

function UserPageNavbar () {
  const [selected, setSelected] = useState(0)
  const history = useHistory()
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(handleLogout())
    history.push('/')
  }

  return (
    <React.Fragment>
      <nav className='landing-nav'>
        <div className='links-container'>
          <Link
            onClick={() => setSelected(0)}
            className={selected === 0 ? 'selected' : ''}
            to='/user'
          >
            Home
          </Link>
          <Link
            onClick={() => setSelected(1)}
            className={selected === 1 ? 'selected' : ''}
            to='/user/elections'
          >
            Elections
          </Link>
          <Link
            onClick={() => setSelected(2)}
            className={selected === 2 ? 'selected' : ''}
            to='/user/account'
          >
            Account info
          </Link>
        </div>
        <button onClick={logout}>Logout</button>
      </nav>
    </React.Fragment>
  )
}

export default UserPageNavbar
