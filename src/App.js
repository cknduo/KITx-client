import React, { useState } from 'react'
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

  // Establish Shopping Cart STATE, to be accessible for all components
  const [cart,setCart] = useState([])

  return (
    <div>
      <HeaderPublic />
      <HeaderStudent cartSize={cart.length} />
      <HeaderTeacher />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/teach' component={Teach} />
        <Route exact path='/sign-in' component={SignInSignUpPage} />
        <Route exact path='/cart' render={()=>(<ShoppingCart cart={cart} setCart={setCart} />)} />
        <Route exact path='/student/:id' component={StudentDashboard} />
        <Route exact path='/teacher/:id' component={TeacherDashboard} />
        <Route exact path='/course/:id' render={()=>(<CourseDetails cart={cart} setCart={setCart} />)} />
      </Switch>
    </div>
  )
}

export default App;
