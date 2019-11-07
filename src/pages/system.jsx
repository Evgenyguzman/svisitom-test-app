import React from 'react'
import { Redirect } from 'react-router'
import { TableContainer } from '../containers/containers'

export const System = ({user}) => {
  if(!user.username) return <Redirect to='/auth'/>
  return(
    <React.Fragment>
      <div>
        <h1>System</h1>
        <TableContainer />
      </div>
    </React.Fragment>
  )
}