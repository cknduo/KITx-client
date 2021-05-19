import React, { useState } from "react"
import Axios from "axios"

import './SignUp.css'

const SignUp = () => {
  // Authentication
  const [registerUsername, setRegisterUsername] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")

  // User Information
  const [registerAccountType, setregisterAccountType] = useState("")
  const [registerFirstName, setregisterFirstName] = useState("")
  const [registerLastName, setregisterLastName] = useState("")
  const [registerAddress, setregisterAddress] = useState("")
  const [registerCity, setregisterCity] = useState("")
  const [registerProvince, setregisterProvince] = useState("")
  const [registerPostalCode, setregisterPostalCode] = useState("")
  const [registerCountry, setregisterCountry] = useState("")

  const register = () => {
    Axios({
      method: "POST",
      data: {
        // Authentication
        username: registerUsername,
        password: registerPassword,

        // User Information
        accountType: registerAccountType,
        firstName: registerFirstName,
        lastName: registerLastName,
        address: registerAddress,
        city: registerCity,
        province: registerProvince,
        postalCode: registerPostalCode,
        country: registerCountry
      },
      withCredentials: true,
      url: "/register/",
    }).then((res) => console.log(res))
  };

  return (
    <div className="Signup">
    <div>
      {/* Authentication */}
      <h1>Sign Up</h1>
      <div><input
        placeholder="Email"
        onChange={(e) => setRegisterUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        onChange={(e) => setRegisterPassword(e.target.value)}
      />
      </div>

      {/* User Information */}
      <div>
      <input
        placeholder="Account Type"
        onChange={(e) => setregisterAccountType(e.target.value)} // student or teacher
      />
      </div>
      <div>
      <input
        placeholder="First Name"
        onChange={(e) => setregisterFirstName(e.target.value)}
      />
      <input
        placeholder="Last Name"
        onChange={(e) => setregisterLastName(e.target.value)}
      />
      </div>
      <input
        placeholder="Address"
        onChange={(e) => setregisterAddress(e.target.value)}
      />
      <div>
      <input
        placeholder="Postal Code or Zip Code"
        onChange={(e) => setregisterPostalCode(e.target.value)}
      />
      <input
        placeholder="Province or State"
        onChange={(e) => setregisterProvince(e.target.value)}
      />
      </div>
      <div>
      <input
        placeholder="City"
        onChange={(e) => setregisterCity(e.target.value)}
      />
      <input
        placeholder="Country"
        onChange={(e) => setregisterCountry(e.target.value)}
      />
      </div>

      <div><button onClick={register}>Submit</button></div>
    </div>

    </div>
  )
}

export default SignUp

// email
// confirm email
// password --- weak/strong?
// confirm password
// I accept the [Terms of Use] & [Privacy Policy] --> checkbox