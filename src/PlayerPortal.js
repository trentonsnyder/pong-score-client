import React, { Component } from 'react'
import NewPlayer from './NewPlayer'
import Back from './Back'
import axios from 'axios'
import Cookies from 'universal-cookie'

let cookies = new Cookies()

class PlayerPortal extends Component {

  state = {
    playerFormOpen: false,
    players: [],
    isFetching: true,
    isLoading: false
  }

  componentDidMount() {
    axios.get('/api/players', {
      headers: { 
        'Authorization': cookies.get('pongToken'),
        'Accept': 'application/json'
      }
    })
    .then(res => {
      this.setState({players: res.data.players, isFetching: false})
    })
    .catch(error => {
      console.log(error)
      this.setState({isFetching: false})
    })
  }

  toggleForm = () => {
    this.setState((prevState) => ({playerFormOpen: !prevState.playerFormOpen}))
  }

  addPlayer = (player) => {
    this.setState((prevState) => ({
      players: [...prevState.players, player]
    }))
  }
  
  render() {
    return (
      <div>
        <Back />
        <h1>PlayerPortal</h1>
        <button onClick={() => this.toggleForm()}>{this.state.playerFormOpen ? 'Cancel' : 'Add Player'}</button>
        { this.state.playerFormOpen && <NewPlayer addPlayer={this.addPlayer} /> }
        <ul>
          { this.state.isFetching ? <div>Loading...</div> : this.state.players.map((player) => <li key={player.name}>{player.name}</li>)}
        </ul>
      </div>
    )
  }
}

export default PlayerPortal