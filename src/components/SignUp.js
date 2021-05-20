import React, { useState } from "react"
import Axios from "axios"

import FormInput from './Form-Input'
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
    <div className="sign-up">
      {/* Authentication */}
      <FormInput
        type='email'
        onChange={(e) => setRegisterUsername(e.target.value)}
        label='Email'
        required
      />
      <FormInput
        type='password'
        onChange={(e) => setRegisterPassword(e.target.value)}
        label='Password'
        required
      />

      {/* User Information */}
      <FormInput
        onChange={(e) => setregisterAccountType(e.target.value)} // student or teacher
        label='Account Type'
        required
      />
      <FormInput
        onChange={(e) => setregisterFirstName(e.target.value)}
        label='First Name'
        required
      />
      <FormInput
        onChange={(e) => setregisterLastName(e.target.value)}
        label='Last Name'
        required
      />
      <FormInput
        onChange={(e) => setregisterAddress(e.target.value)}
        label='Street Address'
      />
      <FormInput
        onChange={(e) => setregisterCity(e.target.value)}
        label='City'
      />    
      <FormInput
        onChange={(e) => setregisterProvince(e.target.value)}
        label='Province'
      />
      <FormInput
        onChange={(e) => setregisterPostalCode(e.target.value)}
        label='Postal Code'
      />
      <FormInput
        onChange={(e) => setregisterCountry(e.target.value)}
        label='Country'
      />

      <button className='sign-up-button' onClick={register}>
        Register
      </button>
    </div>
  )
}

export default SignUp

// email
// password --- weak/strong?
// confirm password
// I accept the [Terms of Use] & [Privacy Policy] --> checkbox