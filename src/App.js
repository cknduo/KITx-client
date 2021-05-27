import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Axios from "axios"
import addNewDBCart from './functions/AddNewDBCart.js'

import './App.css'

import HeaderPublic from './components/Header-Public'
import HeaderStudent from './components/Header-Student'
import HeaderTeacher from './components/Header-Teacher'

import HomePage from './pages/homepage'
import Teach from './pages/teach'
import SignInSignUpPage from './pages/signin-signup'
import StudentDashboard from './pages/student-dashboard'
import TeacherDashboard from './pages/teacher-dashboard'
import CourseDetails from './pages/course-details'
import ShoppingCart from './pages/shopping-cart'

function App() {

  // Establish Shopping Cart STATE, to be accessible for all components
  const [cart, setCart] = useState([])

  const [accountType, setAccountType] = useState("")
  const [userID, setUserID] = useState("") // Pass {userID} into teacher and student dashboard when ready for integration
  
  useEffect(() => {

    const checkLogin = async () => {
      const getRes = await Axios({
        method: "GET",
        withCredentials: true,
        url: "/userinfo/user",
      })
  
      console.log("Data Received from server is : ", getRes.data)
      setUserID(getRes.data.userID)
      console.log("User ID exported to App.js is: ", getRes.data.userID)
    }

    checkLogin()
  }, [])

  useEffect(() => {
    
    if (userID !== "") {
      let loadUserDBCartList = async () => {
        let tempCartArray = [] // initialize
        let dbCartArray = []
        // Retrieve from the database, the list of courses found in user's cart
        let DBCartItems = await Axios({
          method: "GET",
          withCredentials: true,
          url: `/carts/${userID}`,
        })
        if(DBCartItems.data) { // A cart record DOES exist in DB for this user!
          dbCartArray = DBCartItems.data.cartItems
          // Loop through the array of cart items in the DB
          if (dbCartArray.length !== 0){
            for (let counter = 0; counter < dbCartArray.length; counter++) {
              //Insert a new entry into the CART state, in proper format.
              let objectToAdd = {
                courseID: dbCartArray[counter],
                coursePrice: 0, 
              }
              tempCartArray[counter] = objectToAdd
            }
          }
        }
        else {
          // No cart record exists in DB for this user, need to create an empty cart in DB!
          addNewDBCart(userID,tempCartArray)
        }
        setCart(tempCartArray)
      }
      loadUserDBCartList()
    }
  }, [userID])

  return (
    <div>
      {/* Headers */}
      {/* {accountType === '' && <HeaderPublic />}
      {accountType === 'student' && <HeaderStudent />}
      {accountType === 'teacher' && <HeaderTeacher />} */}
      <HeaderPublic />
      <HeaderStudent cartSize={cart.length} />
      <HeaderTeacher />

      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/teach' component={Teach} />
        <Route exact path='/sign-in' render={() => (<SignInSignUpPage setUserID={setUserID} />)} />
        <Route exact path='/cart' render={() => (<ShoppingCart cart={cart} setCart={setCart} userID={userID}/>)} />
        <Route exact path='/student/:id' component={StudentDashboard} />
        <Route exact path='/teacher/:id' component={TeacherDashboard} />
        <Route exact path='/course/:id' render={() => (<CourseDetails cart={cart} setCart={setCart} userID={userID}/>)} />

      </Switch>
    </div>
  )
}

export default App;