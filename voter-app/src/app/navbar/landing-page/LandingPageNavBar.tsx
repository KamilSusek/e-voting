import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setOpen } from '../../../services/loginSlice'
import NavBar from '../NavBar'

function LandingPageNavBar () {
  const dispatch = useDispatch()

  const openLoginPopup = () => {
    dispatch(setOpen(true))
  }

  return (
    <NavBar>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/about'>Contact</Link>
        </li>
        <li>
          <Button onClick={openLoginPopup} color='primary'>
            Login
          </Button>
        </li>
      </ul>
    </NavBar>
  )
}

export default LandingPageNavBar
