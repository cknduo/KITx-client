import React, { useState } from "react"
import Axios from "axios"

import './SignUp.css'

const SignUp = () => {
  const [registerUsername, setRegisterUsername] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")

  const register = () => {
    Axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "/register/",
    }).then((res) => console.log(res))
  };

  return (
    <div className="Signup">
    <div>
      <h1>Sign Up</h1>
      <input
        placeholder="Username"
        onChange={(e) => setRegisterUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        onChange={(e) => setRegisterPassword(e.target.value)}
      />
      <button onClick={register}>Submit</button>
    </div>
    </div>
  )
}

export default SignUp

// const SignUp = () => {
//     let [name, setName] = useState()

//     return (
//     <div className='signup'>
//         <div>
//             <label htmlFor="name">Name</label>
//             <input id="name" value={name}/>
//         </div>
//     </div>
//     )
// }

// firstName
// lastName
// email
// confirm email
// password --- weak/strong?
// confirm password
// address
// city
// province/state
// postalCode-zipCode
// Country