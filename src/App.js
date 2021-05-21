import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.css'

import HeaderPublic from './components/Header-Public'
import HeaderStudent from './components/Header-Student'
import HeaderTeacher from './components/Header-Teacher'

import HomePage from './pages/homepage'
import Teach from './pages/teach'
import SignInSignUpPage from './pages/signin-signup'
import StudentDash from './pages/student-dash'
import TeacherDash from './pages/teacher-dash'
import CourseDetails from './pages/course-details'
import ShoppingCart from './pages/shoppingcart'

function App() {

  const [cart,setCart] = useState([
    {
      courseID: 1,
      imageURL: "https://b3h2.scene7.com/is/image/BedBathandBeyond/325343469473702p?$imagePLP$&wid=256&hei=256",
      courseTitle: "Intro to Chloe's Pottery",
      price: 2000,
    },
    {
      courseID: 2,
      imageURL: "https://az837918.vo.msecnd.net/publishedimages/listings/13258/en-CA/images/1/stone-wood-steel-M-3.jpg",
      courseTitle: "Intro to Thor's Blacksmithery",
      price: 1000,
    }
  ])

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
        {/* <Route exact path='/cart' render={(props)=>(<ShoppingCart {...props} />)} /> */}
        {/* <Route exact path='/cart' component={ShoppingCart} /> */}
        <Route exact path='/student-dash' component={StudentDash} />
        <Route exact path='/teacher-dash' component={TeacherDash} />
        {/* <Route exact path='/:id' component={CourseDetails} /> */}
        <Route exact path='/:id' render={()=>(<CourseDetails setCart={setCart} />)} />
      </Switch>
    </div>
  );
}

export default App;
