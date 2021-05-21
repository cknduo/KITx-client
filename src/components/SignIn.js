import React, { useState } from "react";
import Axios from "axios"

import FormInput from './Form-Input'
import './SignIn.css'

const SignIn = () => {
  const [loginUsername, setLoginUsername] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [data, setData] = useState(null)

  const login = async () => {
    const loginRes = await Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "/login/",
    })
    console.log(loginRes)

    const getRes = await Axios({
      method: "GET",
      withCredentials: true,
      url: "/useridgetter/user",
    })
    setData(getRes.data)
    console.log(getRes.data)
  }

  return (
    <div className='sign-in'>
      <FormInput
        type='email'
        handleChange={(e) => setLoginUsername(e.target.value)}
        label='Email'
        required
      />
      <FormInput
        type='password'
        handleChange={(e) => setLoginPassword(e.target.value)}
        label='Password'
        required
      />

      <button className='sign-in-button' onClick={login}>
        Sign In
      </button>

      {data ? <h1>Welcome Back {data.username}</h1> : null}
    </div>
  );
}

export default SignIn