import React from 'react'
import { Link } from 'react-router-dom'
import './menu.css'

const Menu = () => {
  return (
    <div>
      <div className='menu-container'>
        <h1>Main Menu</h1>
        <Link to='/new-game'><button className='button-primary'>New Game</button></Link>
        <Link to='/games'><button className='button-primary'>Games</button></Link>
        <Link to='/player-portal'><button className='button-primary'>Players</button></Link>
      </div>
    </div>
  )
}

export default Menu