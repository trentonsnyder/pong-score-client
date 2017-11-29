import React from 'react'
import { Route } from 'react-router-dom'
import Menu from './Menu'
import NewGame from './NewGame'
import Game from './Game'
import Games from './Games'
import PlayerPortal from './PlayerPortal'

const Authenticated = () => {
  return (
    <div>
      <Route exact path="/" component={Menu} />
      <Route path="/player-portal" component={PlayerPortal} />
      <Route exact path="/new-game" component={NewGame} />
      <Route exact path="/games/:id" component={Game} />
      <Route exact path="/games" component={Games} />
    </div>
  )
}

export default Authenticated