import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import { setOpen } from '../../services/loginSlice'
import { RootState } from '../../store'
import LoginDialog from '../dialogs/LoginDialog'
import LandingPageNavBar from '../navbar/landing-page/LandingPageNavBar'
import NavBar from '../navbar/NavBar'

function LandingPage () {
  const { open } = useSelector((state: RootState) => state.login)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(setOpen(false))
  }

  return (
    <div className='container'>
      <LandingPageNavBar />
      <div className='content-container'>
        <Switch>
          <Route path='/home'>home</Route>
        </Switch>
      </div>
      <footer className='landing-footer'></footer>
      <LoginDialog open={open} handleClose={handleClose} />
    </div>
  )
}

export default LandingPage
