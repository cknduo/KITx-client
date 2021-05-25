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
import ShoppingCart from './pages/shopping-cart'

function App() {

  // Establish Shopping Cart STATE, to be accessible for all components
  const [cart,setCart] = useState([])

  const [accountType, setAccountType] = useState("")
  const [userID, setUserID] = useState("")
  
  useEffect(() => {
    console.log("User ID exported to App.js is: ", userID)
    // Pass {userID} into teacher and student dashboard when ready for integration
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
        <Route exact path='/sign-in' render={() => (<SignInSignUpPage setUserID={setUserID} setAccountType={setAccountType}/>)} />
        <Route exact path='/cart' render={()=>(<ShoppingCart cart={cart} setCart={setCart} />)} />
        <Route exact path='/student/:id' component={StudentDashboard} />
        <Route exact path='/teacher/:id' component={TeacherDashboard} />
        <Route exact path='/course/:id' render={()=>(<CourseDetails cart={cart} setCart={setCart} />)} />
      </Switch>
    </div>
  )
}

export default App;
