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
  return (
    <div>
      <HeaderPublic />
      <HeaderStudent />
      <HeaderTeacher />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/teach' component={Teach} />
        <Route exact path='/signin' component={SignInSignUpPage} />
        <Route exact path='/cart' component={ShoppingCart} />
        <Route exact path='/student-dash' component={StudentDash} />
        <Route exact path='/teacher-dash' component={TeacherDash} />
        <Route exact path='/:id' component={CourseDetails} />
      </Switch>
    </div>
  );
}

export default App;
