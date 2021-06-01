import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Axios from "axios"
import addNewDBCart from './functions/AddNewDBCart.js'

import './App.css'

import HeaderPublic from './components/Header-Public'
import HeaderStudent from './components/Header-Student'
import HeaderTeacher from './components/Header-Teacher'
import Footer from './components/Footer'

import HomePage from './pages/homepage'
import Teach from './pages/teach'
import SignInSignUpPage from './pages/signin-signup'
import StudentDashboard from './pages/student-dashboard'
import TeacherDashboard from './pages/teacher-dashboard'
import CourseDetails from './pages/course-details'
import ShoppingCart from './pages/shopping-cart'
import StudentLearning from './pages/student-learning'
import About from './pages/about'


function App() {

  // Establish Shopping Cart STATE, to be accessible for all components
  const [cart, setCart] = useState([])

  const [accountType, setAccountType] = useState("")
  const [userID, setUserID] = useState("")
  const [userInfo, setUserInfo] = useState("")

  // Login Checker & User Info Importer
  useEffect(() => {

    const checkLogin = async () => {
      const getRes = await Axios({
        method: "GET",
        withCredentials: true,
        url: "/userinfo/user",
      })
      getRes.data.userID? setUserID(getRes.data.userID) : setUserID("")
      getRes.data.userInfo.accountType? setAccountType(getRes.data.userInfo.accountType) : setAccountType("")
      getRes.data.userInfo? setUserInfo(getRes.data.userInfo) : setUserInfo("")
    }

    checkLogin()
  }, [])

  useEffect(() => {  //Pre-load cart state with items found in DB
    
    if ((userID !== "") && (accountType === "student") && (userInfo !== "")){
      let loadUserDBCartList = async () => {
        let tempCartArray = [] // initialize
        let dbCartArray = []
        // Retrieve from the database, the list of courses found in user's cart
        let DBCartItems = await Axios({
          method: "GET",
          withCredentials: true,
          url: `/carts/${userID}`,
        })
        if (DBCartItems.data) { // A cart record DOES exist in DB for this user!
          dbCartArray = DBCartItems.data.cartItems
          // Loop through the array of cart items in the DB
          if (dbCartArray.length !== 0) {
            for (let counter = 0; counter < dbCartArray.length; counter++) {

              //Fetch the current PRICE for the course before
              let itemPrice = 0  //reset variable before each iteration
              let courseData = await Axios({
                method: "GET",
                withCredentials: true,
                url: `/courses/${dbCartArray[counter]}`,
              })
              if (courseData.data) {  //related course found
                itemPrice = courseData.data.coursePrice
              }

              //Insert a new entry into the CART state, in proper format.
              let objectToAdd = {
                courseID: dbCartArray[counter],
                coursePrice: itemPrice,
              }
              tempCartArray[counter] = objectToAdd
            }
          }
        }
        else {
          // No cart record exists in DB for this user, need to create an empty cart in DB!
          addNewDBCart(userID, tempCartArray)
        }
        setCart(tempCartArray)
      }
      loadUserDBCartList()
    }
  }, [userID])

  const logout = async () => {
    const logoutRes = await Axios({
      method: "GET",
      withCredentials: true,
      url: "/logout/",
    })
    console.log(logoutRes.data)
    setCart([])
    setUserID("")
    setUserInfo("")
    setAccountType("")
  }

  return (

    <div className='app'>

      <div className='app-header'>
        {accountType === '' && <HeaderPublic />}
        {accountType === 'student' && <HeaderStudent cartSize={cart.length} logout={logout} userID={userID} />}
        {accountType === 'teacher' && <HeaderTeacher logout={logout} userID={userID} />}
      </div>

      <div className='app-content'>
        <Switch>
          <Route exact path='/' render={() => (<HomePage accountType={accountType} userID={userID} />)} />
          <Route exact path='/teach' component={Teach} />
          <Route exact path='/sign-in' render={() => (<SignInSignUpPage setUserID={setUserID} setUserInfo={setUserInfo} setAccountType={setAccountType} />)} />
          <Route exact path='/cart' render={() => (<ShoppingCart cart={cart} setCart={setCart} userID={userID} userInfo={userInfo} setUserInfo={setUserInfo} accountType={accountType} />)} />
          <Route exact path='/student/:id' component={StudentDashboard} />
          <Route exact path='/teacher/:id' component={TeacherDashboard} />
          <Route exact path='/course/:id' render={() => (<CourseDetails cart={cart} setCart={setCart} userID={userID} userInfo={userInfo} />)} />
          <Route exact path='/student/:id/course/:courseid/learn' component={StudentLearning} />
          <Route exact path='/about' component={About} />
        </Switch>
      </div>

      <div className='app-footer'>
        <Footer />
      </div>


    </div>
  )
}

export default App;