import React, { Component } from 'react'
import { isEmpty } from 'lodash'
import Login from './Login'
import Authenticated from './Authenticated'
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

class App extends Component {
  state = {
    loading: true,
    currentAccount: {}
  }

  componentDidMount() {
    let token = cookies.get('pongToken')
    if (token) {
      this.setAccount(token)
    } else {
      this.setState({loading: false})
    }
  }

  setAccount = (token) => {
    let instance = axios.create({
      headers: {
        'Authorization': token
      }
    })
    instance.get('/api/v1/accounts/auth')
    .then(res => {
      this.setState({loading: false, currentAccount: res.data.account})
    })
    .catch(error => {
      console.log(error)
    })
  }

  trafficController = () => {
    if (!this.state.loading) {
      if (isEmpty(this.state.currentAccount)) {
        return <Login setAccount={this.setAccount} />
      } else {
        return <Authenticated />
      }
    } else {
      return( <div>Loading...</div> )
    }
  }

  render() {
    return (
      <div>
        { this.trafficController() }
      </div>
    )
  }
}

export default App
