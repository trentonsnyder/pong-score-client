import React, { Component } from 'react'
import { isEmpty } from 'lodash'
import Login from './Login'
import Authenticated from './Authenticated'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

class App extends Component {
  state = {
    loading: true,
    currentUser: {}
  }

  componentDidMount() {
    let token = cookies.get('pongToken')
    if (token) {
      console.log('logged in yo')
      this.setState({loading: false})
    } else {
      console.log('not logged in')
      this.setState({loading: false})
    }
  }

  trafficController = () => {
    if (!this.state.loading) {
      if (isEmpty(this.state.currentUser)) {
        return <Login />
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
