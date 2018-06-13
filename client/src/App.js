import React, { Component } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import homepage from './components/pages/homepage';
import signinpage from './components/pages/signinpage';
import signuppage from './components/pages/signuppage';
import googleRedirect from './components/redirect-pages/google-redirect';

class App extends Component {
  render() {
    return (
      <div>
	    <Switch>
	    	<Route path='/signin' exact component={signinpage} />
        <Route path='/signup' exact component={signuppage} />
        <Route path='/auth/google/redirect' component={googleRedirect} />
	    	<Route path='/' component={homepage} />
      	</Switch>
      </div>
    );
  }
}

export default App;
