import React, { useState } from "react";
import Axios from "axios"

import TextField from '@material-ui/core/TextField';
import './SignIn.css'

const SignIn = ({ setUserID, setUserInfo, setAccountType }) => {
  const [loginUsername, setLoginUsername] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

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
    console.log(loginRes.data)

    //Sets User ID & info up the chain through signin-signup page to App.js for the first authentication {Using deconstruction}
    setUserID(loginRes.data.userID)
    setUserInfo(loginRes.data.userInfo)
    setAccountType(loginRes.data.userInfo.accountType)
  }

  return (
    <div className='sign-in'>
      <div className='sign-in-form'>
        <div className='sign-in-form-email'>
          <TextField
            fullWidth
            label="Email"
            type='email'
            required={true}
            onChange={(e) => setLoginUsername(e.target.value)}
          />          
        </div>
        <div className='sign-in-form-password'>
          <TextField
            fullWidth
            label="Password"
            type='password'
            required={true}
            onChange={(e) => setLoginPassword(e.target.value)}
          />          
        </div>
      </div>

      <div className='sign-in-button-container'>
        <button className='sign-in-button' onClick={login}>
          Sign In
        </button>        
      </div>
    </div>
  )
}

export default SignIn