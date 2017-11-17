import React, { Component } from 'react'
import PlayerCard from './PlayerCard'
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

class Game extends Component {

  state = {
    game: {},
    points: [],
    isFetching: true,
    submitting: false
  }

  componentDidMount() {
    axios.get(`/api/games/${this.props.match.params.id}`, {
      headers: { 
        'Authorization': cookies.get('pongToken'),
        'Accept': 'application/json'
      }
    })
    .then(res => {
      this.setState({game: res.data.game, isFetching: false, points: res.data.game.points})
    }, resFail => {
      console.log(resFail)
      this.setState({isFetching: false})
    })
    .catch(error => {
      console.log(error)
      this.setState({isFetching: false})
    })
  }

  // parsePoints = (game) => {
  //   // should i just do this on the server? keep thinkin on it.
  //   return game.points.reduce((points, point) => {
  //     if (point.player_id === game.server_id) {
  //       return points = {...points, player1: [...points.player1, point]}
  //     } else { 
  //       return points = {...points, player2: [...points.player2, point]}
  //     }
  //   }, this.state.points)
  // }

  addPoint = (id) => {
    this.setState({submitting: true})
    const data = {
      player_id: id
    }
    const headers = { headers: {
      'Authorization': cookies.get('pongToken'),
      'Accept': 'application/json'
    }}
    axios.post(`/api/games/${this.state.game.id}/points`, data, headers)
    .then(res => {
      this.setState(prevState => ({submitting: false, points: [...prevState.points, res.data.point]}))
    }, resFail => {
      console.log('resFail', resFail)
      this.setState({submitting: false})
    })
    .catch(error => {
      console.log('catch', error)
      this.setState({submitting: false})
    })
  }

  undo = () => {
    axios.delete(`/api/games/${this.state.game.id}/points/undo`, {}, {
      headers: {
        'Authorization': cookies.get('pongToken'),
        'Accept': 'application/json'
      }
    })
    .then(res => {
      this.setState(prevState => ({
        points: [...prevState.points.filter(point => {
          return point.id !== res.data.point.id
        })]
      }))
    }, resFail => {
      console.log('resFail', resFail)
    })
    .catch(error => {
      console.log('error', error)
    })
    // this.setState(prevState => ({points: [...prevState.points.slice(0, -1)]}))
  }

  renderGame = () => {
    const { game, submitting, points } = this.state
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <div>
            <PlayerCard 
              player={game.player1}
              points={points}
              addPoint={this.addPoint}
              submitting={submitting}
            />
          </div>
          <div>
            <PlayerCard
              player={game.player2}
              points={points}
              addPoint={this.addPoint}
              submitting={submitting}
            />
          </div>
        </div>
        <button onClick={this.undo}>undo</button>
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
