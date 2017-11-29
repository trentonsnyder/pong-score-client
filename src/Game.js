import React, { Component } from 'react'
import Back from './Back'
import PlayerCard from './PlayerCard'
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

class Game extends Component {
  // TODO: too much logic in this component
  // TODO: check if game is finished, put on delete button remove undo button

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
      this.setState(prevState => ({submitting: false, points: [...prevState.points, res.data.point], game: {...prevState.game, deuce: res.data.game.deuce}}))
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
    axios.delete(`/api/games/${this.state.game.id}/points/undo`, {
      headers: {
        'Authorization': cookies.get('pongToken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      this.setState(prevState => ({
        points: [...prevState.points.filter(point => {
          return point.id !== res.data.point.id
        })],
        game: {...prevState.game, deuce: res.data.game.deuce}
      }))
    }, resFail => {
      console.log('resFail', resFail)
    })
    .catch(error => {
      console.log('error', error)
    })
  }

  renderGame = () => {
    const { game, submitting, points } = this.state
    const pointsCount = (id)  => {
      const playerPoints = points.filter(point => point.player_id === id)
      return playerPoints.length
    }
    let player1Score = pointsCount(game.player1.id).toString()
    let player2Score = pointsCount(game.player2.id).toString()
    if (game.deuce) {
      if (player1Score - player2Score === 1) {
        player1Score = 'A'
        player2Score = 'D'
      } else if (player1Score === player2Score) {
        player1Score = 'D'
        player2Score = 'D'
      } else if (player1Score - player2Score === 2) {
        player1Score = 'W'
        player2Score = 'D'
      } else if (player2Score - player1Score === 1) {
        player1Score = 'D'
        player2Score = 'A'
      } else if (player2Score - player1Score === 2) {
        player1Score = 'D'
        player2Score = 'W'
      }
    }
    const checkWinner = (score) => {
      if (score === '11') {
        return 'W'
      } else {
        return score
      }
    }
    const gameOver = (player1Score, player2Score) => {
      return player1Score === '11' || player2Score === '11' || player2Score === 'W' || player1Score === 'W'
    }
    const disabled = submitting || gameOver(player1Score, player2Score)
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <div>
            <PlayerCard 
              player={game.player1}
              score={checkWinner(player1Score)}
              addPoint={this.addPoint}
              disabled={disabled}
            />
          </div>
          <div>
            <PlayerCard
              player={game.player2}
              score={checkWinner(player2Score)}
              addPoint={this.addPoint}
              disabled={disabled}
            />
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <button disabled={points.length === 0} className='button-primary' onClick={this.undo}>undo</button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Back />
        { this.state.game.id && this.renderGame() }
      </div>
    )
  }
}

export default Game
