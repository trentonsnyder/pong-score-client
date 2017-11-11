import React from 'react'
import { Link } from 'react-router-dom'
import './menu.css'

const Menu = () => {
  return (
    <div>
      <div className='menu-container'>
        <h1>Main Menu</h1>
        <Link to='/game'><button className='button-primary'>New Game</button></Link>
        <Link to='/player_portal'><button className='button-primary'>Player Portal</button></Link>
      </div>
    </div>
  )
}

export default Menu