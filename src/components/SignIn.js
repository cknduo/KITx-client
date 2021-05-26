import React, { useState } from "react";
import Axios from "axios"

import TextField from '@material-ui/core/TextField';
import './SignIn.css'

const SignIn = ({ setUserID }) => {
  const [loginUsername, setLoginUsername] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [data, setData] = useState(null) //Eventually this all its uses will be removed

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

    setData(loginRes.data)
    console.log(loginRes.data)

    //Sets User ID up the chain through signin-signup page to App.js for the first authentication {Using deconstruction}
    setUserID(loginRes.data.user._id)
  }

  return (
    <div className='sign-in'>
      <TextField
        fullWidth
        label="Email"
        type='email'
        required={true}
        onChange={(e) => setLoginUsername(e.target.value)}
      />
      <TextField
        style={{ margin: "1rem 0rem" }}
        fullWidth
        label="Password"
        type='password'
        required={true}
        onChange={(e) => setLoginPassword(e.target.value)}
      />

      <button className='sign-in-button' onClick={login}>
        Sign In
      </button>

      {data ? <h1>Welcome Back {data.user.username}</h1> : null}
    </div>
  );
}

export default SignIn