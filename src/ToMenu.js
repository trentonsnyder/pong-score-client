import React from 'react'
import { withRouter } from 'react-router'

const ToMenu = ({history}) => {
  return(
    <button onClick={() => history.push('/')}>To Menu</button>
  )
}

export default withRouter(ToMenu)