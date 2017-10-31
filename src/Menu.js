import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  return(
    <div>
      <h1>Main Menu</h1>
      <Link to='/player_portal'>Player Portal</Link>
    </div>
  )
}

export default Menu