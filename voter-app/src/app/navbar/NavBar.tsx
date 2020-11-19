import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { AppBar } from '@material-ui/core'

function NavBar ({ children }: any) {
  const [showMenu, setToggleButton] = useState(false)

  const toggleMenu = () => {
    setToggleButton(!showMenu)
  }

  return (
    <AppBar position="sticky">
      <nav className='navbar'>
        <div className='brand-title'>E-voting</div>
        <a onClick={toggleMenu} className='toggle-button'>
          <span className='bar'></span>
          <span className='bar'></span>
          <span className='bar'></span>
        </a>
        <div className={showMenu ? 'navbar-links active' : 'navbar-links'}>
          {children}
        </div>
      </nav>
    </AppBar>
  )
}
export default NavBar
