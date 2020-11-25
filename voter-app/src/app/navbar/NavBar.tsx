import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { AppBar, Button } from '@material-ui/core'

function NavBar ({ children, actionButton }: any) {
  const [showMenu, setToggleButton] = useState(false)

  const toggleMenu = () => {
    setToggleButton(!showMenu)
  }

  return (
    <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <button onClick={toggleMenu} className='nav-toggle'>
            <FaBars color='red' />
          </button>
          <h3>E-voting</h3>
          <div className='links-container'>{children}</div>
          <div>{actionButton}</div>
        </div>
        <div
          className={`${
            showMenu
              ? 'column-links-container'
              : 'column-links-container hide-menu'
          }`}
        >
          {children}
        </div>
      </div>
    </nav>
  )
}
export default NavBar
