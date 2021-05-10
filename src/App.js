import { Switch, Route } from 'react-router-dom'

import './App.css'
import Header from './components/Header'
import HomePage from './pages/homepage'
import SignInSignUpPage from './pages/signin-signup'

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/signin' component={SignInSignUpPage} />
      </Switch>
    </div>
  );
}

export default App;
