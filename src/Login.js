import React, { Component } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'

let cookies = new Cookies()

class Login extends Component {

  state = {
    loading: false,
    email: '', 
    password: ''
  }

  onChange = (e) => this.setState({[e.target.name]: e.target.value})

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({loading: true})
    axios.post('/account_token', {
      auth: {
        email: this.state.email,
        password: this.state.password
      }
    })
    .then(res => {
      cookies.set('pongToken', res.data.jwt, { path: '/' })
      this.props.setAccount(res.data.jwt)
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Email</label>
            <input type='text' name='email' value={this.state.email} onChange={this.onChange} />
            {/* <div style={{position: 'relative'}}>
              { error && <span style={{color: 'red', position: 'absolute', bottom: '-5px'}}>{error}</span> }
            </div> */}
          </div>
          <div>
            <label>Password</label>
            <input type='password' name='password' value={this.state.password} onChange={this.onChange} />
            {/* <div style={{position: 'relative'}}>
              { error && <span style={{color: 'red', position: 'absolute', bottom: '-5px'}}>{error}</span> }
            </div> */}
          </div>
          <input type='submit' />
        </form>
      </div>
    )
  } 
}

export default Login





