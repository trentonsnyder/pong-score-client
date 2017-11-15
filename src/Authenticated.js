import React from 'react'
import { Route } from 'react-router-dom'
import Menu from './Menu'
import NewGame from './NewGame'
import Game from './Game'
import PlayerPortal from './PlayerPortal'

const Authenticated = () => {
  return (
    <div>
      <Route exact path="/" component={Menu} />
      <Route path="/player_portal" component={PlayerPortal} />
      <Route exact path="/new_game" component={NewGame} />
      <Route exact path="/game/:id" component={Game} />
    </div>
  )
}

export default Authenticated