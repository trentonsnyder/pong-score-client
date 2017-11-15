import React, { Component } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

class Game extends Component {

  state = {
    game: {},
    points: {player1: [], player2: []},
    isFetching: true
  }

  componentDidMount() {
    axios.get(`/api/games/${this.props.match.params.id}`, {
      headers: { 
        'Authorization': cookies.get('pongToken'),
        'Accept': 'application/json'
      }
    })
    .then(res => {
      const points = this.parsePoints(res.data.game)
      this.setState({game: res.data.game, isFetching: false, points})
    }, resFail => {
      console.log(resFail)
      this.setState({isFetching: false})
    })
    .catch(error => {
      console.log(error)
      this.setState({isFetching: false})
    })
  }

  parsePoints = (game) => {
    return game.points.reduce((points, point) => {
      if (point.player_id === game.server_id) {
        return points = {...points, player1: [...points.player1, point]}
      } else { 
        return points = {...points, player2: [...points.player2, point]}
      }
    }, this.state.points)
  }

  renderGame = () => {
    const { game, points } = this.state
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <div>
            { this.playerCard(game.player1.name, points.player1.length) }
          </div>
          <div>
            { this.playerCard(game.player2.name, points.player2.length) }
          </div>
          
        </div>
      </div>
    )
  }

  playerCard = (name, points) => {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h1>{name}</h1>
        <div>
          <h3>{points}</h3>
        </div>
        <div>
          <button>-</button>
          <button>+</button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        { this.state.game.id && this.renderGame() }
      </div>
    )
  }
}

export default Game
