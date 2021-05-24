import React, { useState, useEffect } from "react"
import Axios from "axios"
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormInput from './Form-Input'
import { useFormik } from 'formik';
import * as yup from 'yup';
import './SignUp.css'

const SignUp = () => {
  // Authentication
  const [registerUsername, setRegisterUsername] = useState("")
  const [confirmUsername, setConfirmUsername] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // User Information
  const [registerAccountType, setregisterAccountType] = useState("student") // Default selection is Student
  const [registerFirstName, setregisterFirstName] = useState("")
  const [registerLastName, setregisterLastName] = useState("")
  const [registerAddress, setregisterAddress] = useState("")
  const [registerCity, setregisterCity] = useState("")
  const [registerProvince, setregisterProvince] = useState("")
  const [registerPostalCode, setregisterPostalCode] = useState("")
  const [registerCountry, setregisterCountry] = useState("")

// Changes Province/State & Postal Code/Zip Code according to Country selection
  useEffect(() => {
    const countryDetector = () => {
    
      if (registerCountry === "Canada" ) {
        // Load the Province menu and Postal Code label
      }
      else if (registerCountry === "United States of America" ) {
        // Load the State menu and Zip Code label
      }
    }
    countryDetector()
}, [registerCountry])

  //Register Button Function
  const register = () => {

    if (registerUsername !== confirmUsername) {
      alert("Emails don't match") ///////////////////////////////CHANGE THIS
    }

    else if (registerPassword !== confirmPassword) {
      alert("Passwords don't match") ////////////////////////////CHANGE THIS
    }

    else {

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
    }
  }

  return (
    <div className="sign-up">
      <div className='radio-container'>
      <span className='account-type-prompt'>I'm a</span>
        <RadioGroup row value={registerAccountType} onChange={(e) => setregisterAccountType(e.target.value)}>
          <FormControlLabel value="student" control={<Radio color="primary" />} label="Student" />
          <FormControlLabel value='teacher' control={<Radio color="primary" />} label="Teacher" />
        </RadioGroup>
      </div>

      <div className='name-container'>

        {/* First Name */}
        <div className='first-name'>
          <TextField
            fullWidth
            label="First Name"
            type='text'
            required={true}
            onChange={(e) => setregisterFirstName(e.target.value)}
          />          
        </div>

        {/* Last Name */}
        <div className='last-name'>
          <TextField
            fullWidth
            label="Last Name"
            type='text'
            required={true}
            onChange={(e) => setregisterLastName(e.target.value)}
          />          
        </div>
      </div>

      <div className='auth-container'>
        <div className='email-container'>
          {/* Email */}
          <div className='email'>
            <TextField
              fullWidth
              label="Email"
              type='email'
              required={true}
              onChange={(e) => setRegisterUsername(e.target.value)}
            />            
          </div>

          {/* Confirm Email */}
          <div className='confirm-email'>
            <TextField
              fullWidth
              label="Confirm Email"
              type='email'
              required={true}
              onChange={(e) => setConfirmUsername(e.target.value)}
            />             
          </div>

        </div>
        <div className='password-container'>
          {/* Password */}
          <div className='password'>
            <TextField
              fullWidth
              label="Password"
              type='password'
              required={true}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />            
          </div>

          {/* Confirm Password */}
          <div className='confirm-password'>
            <TextField
              fullWidth
              label="Confirm Password"
              type='password'
              required={true}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className='address-container'>
        {/* Street Address */}
        <div className='street-address'>
          <TextField
            fullWidth
            label="Street Address"
            type='text'
            required={true}
            onChange={(e) => setregisterAddress(e.target.value)}
          />          
        </div>

        <div className='city-and-postal-code'>
          {/* City */}
          <div className='city'>
            <TextField
              fullWidth
              label="City"
              type='text'
              required={true}
              onChange={(e) => setregisterCity(e.target.value)}
            />            
          </div>

          {/* Postal Code */}
          <div className='postal-code'>
            <TextField
              fullWidth
              label="Postal Code"
              type='text'
              required={true}
              onChange={(e) => setregisterPostalCode(e.target.value)}
            />            
          </div>
        </div>

        <div className='provinces-and-country'>
          {/* Canadian Provinces */}
          <div className='provinces-states'>
            <FormControl required style={{width: "100%"}}>
              <InputLabel label="select-province">Province</InputLabel>
              <Select labelId="select-province" value={registerProvince} onChange={(e) => setregisterProvince(e.target.value)}>
                <MenuItem value='Alberta'>Alberta</MenuItem>
                <MenuItem value='British Columbia'>British Columbia</MenuItem>
                <MenuItem value='Manitoba'>Manitoba</MenuItem>
                <MenuItem value='New Brunswick'>New Brunswick</MenuItem>
                <MenuItem value='Newfoundland and Labrador'>Newfoundland and Labrador</MenuItem>
                <MenuItem value='Nova Scotia'>Nova Scotia</MenuItem>
                <MenuItem value='Prince Edward Island'>Prince Edward Island</MenuItem>
                <MenuItem value='Quebec'>Quebec</MenuItem>
                <MenuItem value='Saskatchewan'>Saskatchewan</MenuItem>
                <MenuItem value='Northwest Territories'>Northwest Territories</MenuItem>
                <MenuItem value='Nunavut'>Nunavut</MenuItem>
                <MenuItem value='Yukon'>Yukon</MenuItem>
              </Select>
            </FormControl>

            {/* US States */}
            <FormControl required style={{width: "100%"}}>
              <InputLabel label="select-state">State</InputLabel>
              <Select labelId="select-state" value={registerProvince} onChange={(e) => setregisterProvince(e.target.value)}>
                <MenuItem value='Alabama'>Alabama</MenuItem>
                <MenuItem value='Alaska'>Alaska</MenuItem>
                <MenuItem value='Arizona'>Arizona</MenuItem>
                <MenuItem value='Arkansas'>Arkansas</MenuItem>
                <MenuItem value='California'>California</MenuItem>
                <MenuItem value='Colorado'>Colorado</MenuItem>
                <MenuItem value='Connecticut'>Connecticut</MenuItem>
                <MenuItem value='Delaware'>Delaware</MenuItem>
                <MenuItem value='District of Columbia'>District of Columbia</MenuItem>
                <MenuItem value='Florida'>Florida</MenuItem>
                <MenuItem value='Georgia'>Georgia</MenuItem>
                <MenuItem value='Hawaii'>Hawaii</MenuItem>
                <MenuItem value='Idaho'>Idaho</MenuItem>
                <MenuItem value='Illinois'>Illinois</MenuItem>
                <MenuItem value='Indiana'>Indiana</MenuItem>
                <MenuItem value='Iowa'>Iowa</MenuItem>
                <MenuItem value='Kansas'>Kansas</MenuItem>
                <MenuItem value='Kentucky'>Kentucky</MenuItem>
                <MenuItem value='Louisiana'>Louisiana</MenuItem>
                <MenuItem value='Maine'>Maine</MenuItem>
                <MenuItem value='Maryland'>Maryland</MenuItem>
                <MenuItem value='Massachusetts'>Massachusetts</MenuItem>
                <MenuItem value='Michigan'>Michigan</MenuItem>
                <MenuItem value='Minnesota'>Minnesota</MenuItem>
                <MenuItem value='Mississippi'>Mississippi</MenuItem>
                <MenuItem value='Missouri'>Missouri</MenuItem>
                <MenuItem value='Montana'>Montana</MenuItem>
                <MenuItem value='Nebraska'>Nebraska</MenuItem>
                <MenuItem value='Nevada'>Nevada</MenuItem>
                <MenuItem value='New Hampshire'>New Hampshire</MenuItem>
                <MenuItem value='New Jersey'>New Jersey</MenuItem>
                <MenuItem value='New Mexico'>New Mexico</MenuItem>
                <MenuItem value='New York'>New York</MenuItem>
                <MenuItem value='North Carolina'>North Carolina</MenuItem>
                <MenuItem value='North Dakota'>North Dakota</MenuItem>
                <MenuItem value='Ohio'>Ohio</MenuItem>
                <MenuItem value='Oklahoma'>Oklahoma</MenuItem>
                <MenuItem value='Oregon'>Oregon</MenuItem>
                <MenuItem value='Pennsylvania'>Pennsylvania</MenuItem>
                <MenuItem value='Puerto Rico'>Puerto Rico</MenuItem>
                <MenuItem value='Rhode Island'>Rhode Island</MenuItem>
                <MenuItem value='South Carolina'>South Carolina</MenuItem>
                <MenuItem value='South Dakota'>South Dakota</MenuItem>
                <MenuItem value='Tennessee'>Tennessee</MenuItem>
                <MenuItem value='Texas'>Texas</MenuItem>
                <MenuItem value='Utah'>Utah</MenuItem>
                <MenuItem value='Vermont'>Vermont</MenuItem>
                <MenuItem value='Virginia'>Virginia</MenuItem>
                <MenuItem value='Virgin Islands'>Virgin Islands</MenuItem>
                <MenuItem value='Washington'>Washington</MenuItem>
                <MenuItem value='West Virginia'>West Virginia</MenuItem>
                <MenuItem value='Wisconsin'>Wisconsin</MenuItem>
                <MenuItem value='Wyoming'>Wyoming</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Country */}
          <div className='country'>
            <FormControl required style={{width: "100%"}}>
              <InputLabel label="select-country">Country</InputLabel>
              <Select labelId="select-country" value={registerCountry} onChange={(e) => setregisterCountry(e.target.value)}>
                <MenuItem value='Canada'>Canada</MenuItem>
                <MenuItem value='United States of America'>United States of America</MenuItem>
              </Select>
            </FormControl> 
          </div>        
          
          {/* I accept the [Terms of Use] & [Privacy Policy] --> checkbox */}

        </div>

      </div>
      
      <div className='button-container'>
        <button className='sign-up-button' onClick={register}>
          Register
        </button>
      </div>
    </div>
  )
}

export default SignUp

// email
// password --- weak/strong?