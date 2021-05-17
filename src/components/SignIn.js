// Code to be transfered to SignUp.js

import React, { useState } from "react";
import Axios from "axios"

import './SignIn.css'

const SignIn = () => {
    const [loginUsername, setLoginUsername] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [data, setData] = useState(null)

    const login = () => {
      Axios({
        method: "POST",
        data: {
          username: loginUsername,
          password: loginPassword,
        },
        withCredentials: true,
        url: "/login/",
      }).then((res) => console.log(res))
    };
  
    const getUser = () => {
      Axios({
        method: "GET",
        withCredentials: true,
        url: "/useridgetter/user",
      }).then((res) => {
        setData(res.data)
        console.log(res.data)
      });
    };
  
    return (
      <div>
        <div>
          <h1>Sign In</h1>
          <input
            placeholder="Username"
            onChange={(e) => setLoginUsername(e.target.value)}
          />
          <input
            placeholder="Password"
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button onClick={login}>Submit</button>
        </div>
  
        <div>
          <h4>Get User Info Once Login is Authenticated</h4>
          <button onClick={getUser}>Get User Info</button>
          {data ? <h1>Welcome Back {data.username}</h1> : null}
        </div>
        </div>
    );
  }
  
  export default SignIn