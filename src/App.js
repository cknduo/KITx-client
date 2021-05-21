import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.css'
import PublicHeader from './components/PublicHeader'
import HomePage from './pages/homepage'
import SignInSignUpPage from './pages/signin-signup'
import StudentDash from './pages/student-dash'
import TeacherDash from './pages/teacher-dashboard'
import CourseDetails from './pages/course-details'

function App() {
  return (
    <div>
      <PublicHeader />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/signin' component={SignInSignUpPage} />
        <Route exact path='/student' component={StudentDash} />
        <Route exact path='/teacher' component={TeacherDash} />
        <Route exact path='/:id' component={CourseDetails} />
      </Switch>
    </div>
  );
}

export default App;
