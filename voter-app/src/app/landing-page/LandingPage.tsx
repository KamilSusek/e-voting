import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route } from 'react-router-dom'
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
        <div className='text-container'>
          <Route exact path='/'>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum
            perferendis iure harum perspiciatis nemo, asperiores facilis id
            quia! Id blanditiis molestias iure dicta porro minima voluptates
            sequi dolor! Quaerat, rerum?
          </p> 
          </Route>
          <Route path='/news'>news</Route>
          <Route path='/about'>about</Route>
          <Route path='/help'>help</Route>
        </div>
      </div>
      <footer className='landing-footer'></footer>
      <LoginDialog open={open} handleClose={handleClose} />
    </div>
  )
}

export default LandingPage
