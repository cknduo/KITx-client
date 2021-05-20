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
  return (
    <div>
      <HeaderPublic />
      <HeaderStudent />
      <HeaderTeacher />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/teach' component={Teach} />
        <Route exact path='/sign-in' component={SignInSignUpPage} />
        <Route exact path='/cart' component={ShoppingCart} />
        <Route exact path='/student/:id' component={StudentDashboard} />
        <Route exact path='/teacher/:id' component={TeacherDashboard} />
        <Route exact path='/course/:id' component={CourseDetails} />
      </Switch>
    </div>
  )
}

export default App;
