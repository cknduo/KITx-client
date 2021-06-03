import React, { useState } from "react"
import { useHistory } from 'react-router-dom'
import Axios from "axios"
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './SignUp.css'

const SignUp = ({ setUserID, setUserInfo, setAccountType }) => {
  // Authentication
  // const [registerUsername, setRegisterUsername] = useState("")
  // const [confirmUsername, setConfirmUsername] = useState("")
  // const [registerPassword, setRegisterPassword] = useState("")
  // const [confirmPassword, setConfirmPassword] = useState("")

  // User Information
  const [registerAccountType, setregisterAccountType] = useState("student") // Default Selection: Student
  const [registerProvince, setregisterProvince] = useState("")
  const [registerPostalCode, setregisterPostalCode] = useState("")
  const [registerCountry, setregisterCountry] = useState("")
  // const [userAgreement, setUserAgreement] = useState(false)

  let history = useHistory()

  //Validation Schema
  const signUpValidationSchema = Yup.object({
    firstName: Yup
      .string('Enter First Name')
      .required('First Name is Required'),
    lastName: Yup
      .string('Enter Last Name')
      .required('Last Name is Required'),
    email: Yup
      .string('Enter Email')
      .email('Enter a Valid Email')
      .required('Email is Required'),
    confirmEmail: Yup
      .string('Confirm Email')
      .email('Enter a Valid Email')
      .oneOf([Yup.ref('email'), null], "Emails Must Match")
      .required('Email Confirmation is Required'),
    password: Yup
      .string('Enter Password')
      .min(5, "Minimum 5 Characters")
      .max(25, "Maximum 25 Characters")
      .required('Password is Required'),
    confirmPassword: Yup
      .string('Confirm Password')
      .min(5, "Minimum 5 Characters")
      .max(25, "Maximum 25 Characters")
      .oneOf([Yup.ref('password'), null], "Passwords Must Match")
      .required('Password Confirmation is Required'),
    streetAddress: Yup
      .string('Enter Street Address')
      .required('Street Address is Required'),
    city: Yup
      .string('Enter City')
      .required('City is Required'),
    postalCode: Yup
      .string('Enter Postal Code')
      .matches(/^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z][ -]?[0-9][ABCEGHJ-NPRSTV-Z][0-9]$/i, "Invalid Postal Code"),
    zipCode: Yup
      .string('Enter Zip Code')
      .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, "Invalid Zip Code"),
    province: Yup
      .string('Enter Province'),
    state: Yup
      .string('Enter State'),
    country: Yup
      .string('Enter Country')
  })

  // Form Function
  let formik = useFormik({
    initialValues: { firstName: "", lastName: "", email: "", confirmEmail: "", password: "", confirmPassword: "", streetAddress: "", city: "", postalCode: "", zipCode: "", province: "", state: "", country: "" },
    validationSchema: signUpValidationSchema,
    onSubmit(values) {



      let registrationInfo = {
        // Authentication
        username: values.email,
        password: values.password,

        // User Information
        accountType: registerAccountType,
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.streetAddress,
        city: values.city,
        province: registerProvince,
        postalCode: registerPostalCode,
        country: registerCountry
      }

      register(registrationInfo)
    }
  })

  //Register Function
  const register = (regInfo) => {

    // if (userAgreement !== true) {
    //   alert("Please Accept the Terms of Use & Privacy Policy")
    // }

    // else {

    Axios({
      method: "POST",
      data: regInfo,
      withCredentials: true,
      url: "/register/",
    }).then((signUpResponse) => {
      console.log(signUpResponse.data)

      // Error Handling
      if (signUpResponse.data.error) {
        console.log({ "Error": signUpResponse.data.error, "Status": signUpResponse.status })
        alert(signUpResponse.data.error)
      }

      else {
        console.log({ "Response": signUpResponse.data.msg, "Status": signUpResponse.status })

        //Value Setter for the first authentication {Using deconstruction}
        setUserID(signUpResponse.data.userID)
        setUserInfo(signUpResponse.data.userInfo)
        setAccountType(signUpResponse.data.userInfo.accountType)

        // Redirect after Login
        if (signUpResponse.data.userInfo.accountType === "student") {
          history.push("/student/" + signUpResponse.data.userID)
        }
        else if (signUpResponse.data.userInfo.accountType === "teacher") {
          history.push("/teacher/" + signUpResponse.data.userID)
        }
        else {
          history.push("/")
          console.log("Error: Account Type Not Set")
        }

      }
    })
    // }
  }

  return (
    <div className="sign-up">
      <form onSubmit={formik.handleSubmit}>
        <div className='radio-container'>
          <span className='account-type-prompt'>I am a</span>
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
              name="firstName"
              id="firstName"
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </div>

          {/* Last Name */}
          <div className='last-name'>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              id="lastName"
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
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
                name="email"
                id="email"
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>

            {/* Confirm Email */}
            <div className='confirm-email'>
              <TextField
                fullWidth
                label="Confirm Email"
                name="confirmEmail"
                id="confirmEmail"
                onChange={formik.handleChange}
                error={formik.touched.confirmEmail && Boolean(formik.errors.confirmEmail)}
                helperText={formik.touched.confirmEmail && formik.errors.confirmEmail}
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
                name="password"
                id="password"
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </div>

            {/* Confirm Password */}
            <div className='confirm-password'>
              <TextField
                fullWidth
                label="Confirm Password"
                type='password'
                name="confirmPassword"
                id="confirmPassword"
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
              name="streetAddress"
              id="streetAddress"
              onChange={formik.handleChange}
              error={formik.touched.streetAddress && Boolean(formik.errors.streetAddress)}
              helperText={formik.touched.streetAddress && formik.errors.streetAddress}
            />
          </div>

          <div className='city-and-postal-code'>
            {/* City */}
            <div className='city'>
              <TextField
                fullWidth
                label="City"
                name="city"
                id="city"
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </div>

            {/* Postal Code & Zip Code */}
            <div className='postal-code'>
              {(registerCountry === "Canada" || registerCountry === "") ?
                <TextField
                  fullWidth
                  label="Postal Code"
                  name="postalCode"
                  id="postalCode"
                  onChange={(e) => setregisterPostalCode(e.target.value)}
                  error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
                  helperText={formik.touched.postalCode && formik.errors.postalCode}
                />
                :
                <TextField
                  fullWidth
                  label="Zip Code"
                  name="zipCode"
                  id="zipCode"
                  onChange={(e) => setregisterPostalCode(e.target.value)}
                  error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                  helperText={formik.touched.zipCode && formik.errors.zipCode}
                />
              }
            </div>
          </div>

          <div className='provinces-and-country'>
            {/* Canadian Provinces & US States */}
            <div className='provinces-states'>
              {(registerCountry === "Canada" || registerCountry === "") ?
                <FormControl required style={{ width: "100%" }}>
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
                :
                <FormControl required style={{ width: "100%" }}>
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
              }
            </div>

            {/* Country */}
            <div className='country'>
              <FormControl required style={{ width: "100%" }}>
                <InputLabel label="select-country">Country</InputLabel>
                <Select labelId="select-country" value={registerCountry} onChange={(e) => {
                  setregisterCountry(e.target.value)
                  setregisterProvince("")
                }}>
                  <MenuItem value='Canada'>Canada</MenuItem>
                  <MenuItem value='United States of America'>United States of America</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="check-box">
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={formik.handleChange}
                    name="agreement"
                    color="primary"
                  />
                }
                label={<div>
                  <span>I accept the </span>
                  <Link onClick={(e) => history.push('/terms-of-use')}>Terms of Use</Link>
                  <span> and </span>
                  <Link onClick={(e) => history.push('/privacy-policy')}>Privacy Policy</Link>
                </div>
                }
              />

            </div>


          </div>

        </div>

        <div className='button-container'>
          <button className='sign-up-button' type="submit">
            Register
        </button>
        </div>
      </form>
    </div>
  )
}

export default SignUp