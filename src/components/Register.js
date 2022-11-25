import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const nav = useNavigate()
  const userRef = useRef()
  const passOneRef = useRef()
  const passTwoRef = useRef()

  const register = async () => {
    const user = {
      username: userRef.current.value,
      passOne: passOneRef.current.value,
      passTwo: passTwoRef.current.value,
    }
    console.log('user ===', user);
    const res = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: "include",
      body: JSON.stringify(user),
    })
    const data = await res.json();

    if (!data.error) {
      nav('/login')
    }
    else {
      console.log(data.message)
    }
  }
  useEffect(() => {

  }, [])
  return (
    <div className='register'>
      <h1>Register</h1>
      <div >
        <input ref={userRef} type="text" placeholder='Your username' />
        <input ref={passOneRef} type="password" placeholder='Your password' />
        <input ref={passTwoRef} type="password" placeholder='Repeat your password' />
        <div className='reg-btn'>
          <button onClick={register}>Register</button>

        </div>

      </div>
    </div>
  )
}

export default Register