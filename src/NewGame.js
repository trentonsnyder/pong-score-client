import React from 'react'
import Back from './Back'
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

class NewGame extends React.Component {
  state = {
    players: [],
    isFetching: true,
    isSubmitting: false,
    player1: '',
    player2: ''
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

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.player1 && this.state.player2 && this.state.player1.length > 0 && this.state.player2.length > 0) {
      let headers = {
        headers: { 
          'Authorization': cookies.get('pongToken'),
          'Accept': 'application/json'
        }
      }
      let data = {
        player1: this.state.player1,
        player2: this.state.player2
      }
      this.setState({isSubmitting: true})
      axios.post('/api/games', data, headers)
      .then(res => {
        this.setState({isSubmitting: false})
        this.props.history.push(`/game/${res.data.game.id}`)
      })
      .catch(error => {
        console.log(error)
        this.setState({isSubmitting: false})
      })
    }
  }

  renderPlayers = (id) => {
    return this.state.players.filter((player) => {
      return player.id.toString() !== id
    }).map((player) => {
      return <option key={player.id} value={player.id}>{player.name}</option>
    })
  }

  render() {
    return (
      <div>
        <Back />
        New Game
        <form onSubmit={this.handleSubmit}>
          <label>Player 1 (Serves 1st)</label>
          <select defaultValue='' name='player1' value={this.state.player1.name} onChange={this.handleChange}>
            <option value='' disabled>Select</option>
            { this.renderPlayers(this.state.player2) }
          </select>
          <label>Player 2</label>
          <select defaultValue='' disabled={this.state.player1.length === 0} name='player2' value={this.state.player2.name} onChange={this.handleChange}>
            <option value='' disabled>Select</option>
            { this.renderPlayers(this.state.player1) }
          </select>
          { this.state.isSubmitting ? <input disabled type='submit'/> : <input type='submit' /> }
        </form>
      </div>
    )
  }
}

export default NewGame