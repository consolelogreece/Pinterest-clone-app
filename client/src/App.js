import React, { Component } from 'react';
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';

import homepage from './components/pages/homepage';
import signinpage from './components/pages/signinpage';
import signuppage from './components/pages/signuppage';
import resetpasswordpage from './components/pages/resetpasswordpage';
import changepasswordpage from './components/pages/changepasswordpage';
import userpostpage from './components/pages/userpostpage';
import googleRedirect from './components/redirect-pages/google-redirect';

import { togglepostpopup, submitpost } from './actions/appfunctions'
import Newpostform from './components/forms/newpostform';
import {Transition} from 'semantic-ui-react';
import { connect } from 'react-redux';

class App extends Component {

  submitpost = data => this.props.submitpost(data).then(data => console.log('data'));

  redirect_to_login = () => this.props.history.push('/signin');


  render() {
    return (
      <div style={{ 'wordWrap':'break-word','margin':'0 auto', 'height': '100%', 'width': '100%', maxWidth:'1200px'}}>
  	    <Switch>
  	    	<Route path='/signin' exact component={signinpage} />
          <Route path='/signup' exact component={signuppage} />
          <Route path='/user' component={userpostpage} />
          <Route path='/resetpassword' component={resetpasswordpage} />
          <Route path='/changepassword' component={changepasswordpage} />
          <Route path='/auth/google/redirect' component={googleRedirect} />
  	    	<Route path='/' component={homepage} />
        </Switch>

        {/*New post form implemented here, so can be rendered anywhere in the app.*/}
        <Transition animation='scale' duration={175} visible={this.props.renderNewPostPopup}>
          <div style={{'width': '90%', 'position': 'fixed', 'left': '50%', 'marginLeft': '-45%'}}> 
            <Newpostform redirect_to_login={this.redirect_to_login} isAuthenticated={this.props.isAuthenticated}b submit={this.submitpost} closeform={this.props.onToggleClick} />
          </div>
        </Transition>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  renderNewPostPopup:state.app.renderNewPostPopup,
  isAuthenticated:state.user.isAuthenticated
})


const mapDispatchToProps = dispatch => {
  return {
    onToggleClick: () => {
      dispatch(togglepostpopup())
    },
    submitpost: (data) => {
      return dispatch(submitpost(data))
    }

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
