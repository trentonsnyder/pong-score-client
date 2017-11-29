import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Back from './Back'
import axios from 'axios'
import Cookies from 'universal-cookie'
import './menu.css'

const cookies = new Cookies()

class Games extends Component {
  state = {
    games: [],
    isFetching: true,
    submitting: false
  }

  componentDidMount() {
    axios.get(`/api/games`, {
      headers: { 
        'Authorization': cookies.get('pongToken'),
        'Accept': 'application/json'
      }
    })
    .then(res => {
      this.setState({games: res.data.games, isFetching: false})
    }, resFail => {
      console.log(resFail)
      this.setState({isFetching: false})
    })
    .catch(error => {
      console.log(error)
      this.setState({isFetching: false})
    })
  }

  renderGames = () => {
    if (!this.state.isFetching && this.state.games.length > 0) {
      return this.state.games.map( game => {
        return(
          <Link key={game.id} to={`/games/${game.id}`}>
            <button className='button-primary' key={game.id}>
              {game.player1.name} v {game.player2.name}
            </button>
          </Link>
        )
      })
    }
  }
  render() {
    return(
      <div>
        <Back />
        <div className='menu-container'>
          { this.renderGames() }
        </div>
      </div>
    )
  }
}

export default Games