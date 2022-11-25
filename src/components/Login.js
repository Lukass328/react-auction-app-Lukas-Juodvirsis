import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const userRef = useRef()
  const passOneRef = useRef()
  const nav = useNavigate()

  const login = async () => {
    const user = {
      username: userRef.current.value,
      passOne: passOneRef.current.value,

    }

    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: "include",
      body: JSON.stringify(user),
    })
    const data = await res.json();

    if (!data.error) {
      nav('/auction')
    }
    else {
      console.log(data.message)
    }
  }
  return (

    <div className='login' >
      <h1>Login</h1>
      <div>
        <input ref={userRef} type="text" placeholder='Your username' />
        <input ref={passOneRef} type="password" placeholder='Your password' />
        <div className='log-btn'>
          <button onClick={login}>Login</button>

        </div>

      </div>
    </div>
  )
}

export default Login