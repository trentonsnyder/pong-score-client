import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'

let cookies = new Cookies()

class Players extends React.Component {

  state = {
    fetched: false,
    players: []
  }

  componentDidMount() {
    axios.get('/api/players', {
      headers: { 
        'Authorization': cookies.get('pongToken'),
        'Accept': 'application/json'
      }
    })
    .then(res => {
      this.setState({players: res.data.players, fetched: true})
    })
    .catch(error => {
      console.log(error)
      this.setState({fetched: true})
    })
  }

  render() {
    return(
      <div>
        { this.props.fetched && this.props.children }
      </div>
    )
  }
}

export default Players