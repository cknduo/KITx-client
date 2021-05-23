import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'

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
import ShoppingCart from './pages/shoppingcart'

function App() {

  console.log("WELCOME to APP.JS Home of the APP!!!!")
  

  const [cart,setCart] = useState([
    "60930ed5ceed3a654c87a71a","609f1807201b091de34f18ff"
    // {
    //   courseID: "60930ed5ceed3a654c87a71a"
      // imageURL: "https://b3h2.scene7.com/is/image/BedBathandBeyond/325343469473702p?$imagePLP$&wid=256&hei=256",
      // courseTitle: "Three Phase AC Electrical Circuit Design",
    // },
    // {
    //   courseID: "609f1807201b091de34f18ff"
      // imageURL: "https://az837918.vo.msecnd.net/publishedimages/listings/13258/en-CA/images/1/stone-wood-steel-M-3.jpg",
      // courseTitle: "Chemistry of Food",
    // }
  ])

  // React.useEffect(() => {
  //   console.log("Calling useEffect 1 on APP.JS")
  //   // const parsedCart = Number(localStorage.getItem("cart") || 0)
  //   // console.log("parsedCart= ", parsedCart)
  //   setCart(cart)
  // }, [])

  // React.useEffect(() => {
  //   localStorage.setItem("cart", cart)
  // }, [cart])

  return (
    <div>
      <HeaderPublic />
      {/* <HeaderStudent /> */}
      <HeaderStudent cartSize={cart.length} />
      <HeaderTeacher />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/teach' component={Teach} />
        <Route exact path='/signin' component={SignInSignUpPage} />
        <Route exact path='/cart' render={()=>(<ShoppingCart cart={cart} setCart={setCart} />)} />
        {/* <Route exact path='/cart' component={ShoppingCart} /> */}
        {/* <Route exact path='/student-dash' component={StudentDash} /> */}
        {/* <Route exact path='/teacher-dash' component={TeacherDash} /> */}
        {/* <Route exact path='/:id' component={CourseDetails} /> */}
        {/* <Route exact path='/:id' render={()=>(<CourseDetails setCart={setCart} />)} /> */}
        <Route exact path='/student/:id' component={StudentDashboard} />
        <Route exact path='/teacher/:id' component={TeacherDashboard} />
        <Route exact path='/course/:id' component={CourseDetails} />
      </Switch>
    </div>
  )
}

export default App;
