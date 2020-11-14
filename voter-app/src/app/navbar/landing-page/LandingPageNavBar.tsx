import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../NavBar'

const initialValue = [
  { id: 0, isSelected: false },
  { id: 1, isSelected: false },
  { id: 2, isSelected: false },
  { id: 3, isSelected: false }
]

function LandingPageNavBar () {
  const [links, setLinks] = useState(initialValue)

  return (
    <NavBar>
      <Link to='/'>HOME</Link>
      <Link to='/news'>NEWS</Link>
      <Link to='/about'>ABOUT</Link>
      <Link to='/help'>NEWS</Link>
    </NavBar>
  )
}

function NavLink ({ reset, href, children }: any) {
  return <a href={href}>{children}</a>
}

export default LandingPageNavBar
