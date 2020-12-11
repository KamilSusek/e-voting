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
    <NavBar
      actionButton={
        <Button
          className='login-button'
          variant='contained'
          color='primary'
          onClick={openLoginPopup}
        >
          Login
        </Button>
      }
    >
      <ul className='links'>
        <li>
          <Link to='/home'>Home</Link>
        </li>
      </ul>
    </NavBar>
  )
}

export default LandingPageNavBar
