import React from 'react'
import { withRouter } from 'react-router'

const Back = ({history}) => {
  return(
    <button onClick={() => history.goBack()}>Back</button>
  )
}

export default withRouter(Back)