import React from 'react'
import '../sass/NavSidebar.scss'
import UserInfo from './UserInfo'
import Nav from './Nav'

const NavSidebar = () => {
  return (
    <div className="NavSidebar">
      <UserInfo />
      <Nav />
    </div>
  )
}

export default NavSidebar
