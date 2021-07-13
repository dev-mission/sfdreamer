import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.scss';

import { AuthContextProvider, AuthProtectedRoute } from './AuthContext';

import Header from './Header';
import Footer from './Footer';

import Home from './Home';
import Login from './Login';
import Passwords from './Passwords';
import Register from './Register';
import Users from './Users';
import Resources from './Resources';
import Questionnaire from './Questionnaire';
import Forms from './Forms';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/passwords">
            <Passwords />
          </Route>
          <Route path="/questionnaire">
            <Questionnaire />
          </Route>
          <Route path="/forms">
            <Forms />
          </Route>
          {process.env.REACT_APP_FEATURE_REGISTRATION === 'true' && (
            <Route path="/register">
              <Register />
            </Route>
          )}
          <Route path="/resources">
            <Resources />
          </Route>
          <AuthProtectedRoute path="/account">
            <Users />
          </AuthProtectedRoute>
        </Switch>
        <Footer />
      </Router>
    </AuthContextProvider>
  );
}

export default App;
