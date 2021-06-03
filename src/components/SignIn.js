import React from "react"
import { useHistory } from 'react-router-dom'
import Axios from "axios"
import { useFormik } from 'formik'
import * as Yup from 'yup'

import TextField from '@material-ui/core/TextField'
import './SignIn.css'

const SignIn = ({ setUserID, setUserInfo, setAccountType }) => {

  let history = useHistory()

  //Validation Schema
  const signInValidationSchema = Yup.object({
    email: Yup
      .string('Enter Email')
      .email('Enter a Valid Email')
      .required('E-mail is Required'),
    password: Yup
      .string('Enter Password')
      .required('Password is Required'),

  })

  // Form Function
  let formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: signInValidationSchema,
    onSubmit(values) {
      let authenticationInfo = {
        username: values.email,
        password: values.password
      }

      login(authenticationInfo)
    }
  })

  // Login Function
  const login = async (authInfo) => {
    const loginRes = await Axios({
      method: "POST",
      data: authInfo,
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

  return (

    <div className='sign-in'>
      <form onSubmit={formik.handleSubmit} className='sign-in-form'>
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
  )
}

export default SignIn