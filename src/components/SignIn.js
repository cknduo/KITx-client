import React, { useState } from "react";
import Axios from "axios"

import TextField from '@material-ui/core/TextField';
import './SignIn.css'

const SignIn = ({ setUserID, setAccountType }) => {
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

    const getRes = await Axios({
      method: "GET",
      withCredentials: true,
      url: "/useridgetter/user",
    })
    setData(getRes.data)
    console.log(getRes.data)

    //Sets User ID up the chain through signin-signup page to App.js {Using deconstruction}
    setUserID(getRes.data.userID)
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

      {data ? <h1>Welcome Back {data.username}</h1> : null}
    </div>
  );
}

export default SignIn