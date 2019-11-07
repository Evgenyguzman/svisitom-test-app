import React from 'react'
import { Redirect } from 'react-router'
import { useState } from 'react';

export const Form = ({user, onSignIn}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  
  const onAuth = (e) => {
    e.preventDefault()
    onSignIn({username, password}).then((res)=>{
      if(res === false) {
        setError(true) 
        setTimeout(()=>{setError(false)}, 1000)
      }
    })
  }

  if(user.username && user.password) return <Redirect to='/'/>
  return(
    <React.Fragment>
      <form onSubmit={onAuth}>
        {
          error 
          ?
            <div className="warning">
              <span>Ошибка входа!</span>
            </div>
          :
            null
        }
        <input type="text" name="username" value={username} autoComplete={'false'} onChange={(e)=>{setUsername(e.target.value)}} />
        <input type="password" name="password" value={password} autoComplete={'false'} onChange={(e)=>{setPassword(e.target.value)}} />
        <button>Войти</button>
      </form>
    </React.Fragment>
  )
}
