import React from 'react'
import { Route } from 'react-router-dom'
import Menu from './Menu'
import PlayerPortal from './PlayerPortal'

const Authenticated = () => {
  return (
    <div>
      <Route exact path="/" component={Menu}/>
      <Route path="/player_portal" component={PlayerPortal}/>
    </div>
  )
}

export default Authenticated