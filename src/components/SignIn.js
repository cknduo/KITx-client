import React, { useState } from "react";
import Axios from "axios"

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
    <div>
      <div>
        <h1>Sign In</h1>
        <div>
        <input
          placeholder="Email"
          onChange={(e) => setLoginUsername(e.target.value)}
        />
        <input
          placeholder="Password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        </div>
        <div><button onClick={login}>Submit</button></div>
      </div>

      <div>
        {data ? <h1>Welcome Back {data.username}</h1> : null}
      </div>
    </div>
  );
}

export default SignIn