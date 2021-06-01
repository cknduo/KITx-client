import React from "react"
import { useHistory } from 'react-router-dom'
import Axios from "axios"
import { useFormik } from 'formik'
import * as yup from 'yup'

import TextField from '@material-ui/core/TextField'
import './SignIn.css'

const SignIn = ({ setUserID, setUserInfo, setAccountType }) => {

  //Validation Schema
  const validationSchema = yup.object({
    email: yup
      .string('Enter e-mail')
      .email('Enter in an e-mail format')
      .required('E-mail is required'),
    password: yup
      .string('Enter password')
      .required('Password is required'),

  })

  let history = useHistory()

  // Login Function
  const login = async (info) => {
    const loginRes = await Axios({
      method: "POST",
      data: info,
      withCredentials: true,
      url: "/login/",
    })

    // Error Handling
    if (loginRes.data.error) {
      console.log({ "Error": loginRes.data.error, "Status": loginRes.status })
      alert(loginRes.data.error)
    }

    else {
      console.log({ "Response": loginRes.data.msg, "Status": loginRes.status })

      //Value Setter for the first authentication {Using deconstruction}
      setUserID(loginRes.data.userID)
      setUserInfo(loginRes.data.userInfo)
      setAccountType(loginRes.data.userInfo.accountType)

      // Redirect after Login
      if (loginRes.data.userInfo.accountType === "student") {
        history.push("/student/" + loginRes.data.userID)
      }
      else if (loginRes.data.userInfo.accountType === "teacher") {
        history.push("/teacher/" + loginRes.data.userID)
      }
      else {
        history.push("/")
        console.log("Error: Account Type Not Set")
      }
    }
  }

  // Form Function
  let formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit(values) {
      let authenticationInfo = {
        username: values.email,
        password: values.password
      }

      login(authenticationInfo)
    }
  })

  return (

    <div className='sign-in'>
      <div className='sign-in-form'>
        <form onSubmit={formik.handleSubmit}>
          <div className='sign-in-form-email'>
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
          <div className='sign-in-form-password'>
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

          <div className='sign-in-button-container'>
            <button className='sign-in-button' type="submit">
              Sign In
          </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default SignIn