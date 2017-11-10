import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'

let cookies = new Cookies()

class NewPlayer extends React.Component {

  state = {
    name: '',
    isSubmitting: false
  }

  createPlayer = (e) => {
    e.preventDefault()
    let headers = {
      headers: { 
        'Authorization': cookies.get('pongToken'),
        'Accept': 'application/json'
      }
    }
    let data = {
      player: {
        name: this.state.name
      }
    }
    this.setState({isSubmitting: true})
    axios.post('/api/players', data, headers)
    .then(res => {
      this.props.addPlayer(res.data.player)
      this.setState({isSubmitting: false, name: ''})
    })
    .catch(error => {
      console.log(error)
      this.setState({isSubmitting: false})
    })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value})
  }

  render() {
    return(
      <div>
        <form onSubmit={this.createPlayer}>
          <label>Name</label>
          <input type='text' name='name' value={this.state.name} onChange={this.handleChange} />
          { this.state.isSubmitting ? <input disabled type='submit'/> : <input type='submit' /> }
        </form>
      </div>
    )
  }
}

export default NewPlayer