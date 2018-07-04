import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import homepage from './components/pages/homepage';
import signinpage from './components/pages/signinpage';
import signuppage from './components/pages/signuppage';
import resetpasswordpage from './components/pages/resetpasswordpage';
import myfollowinglistpage from './components/pages/myfollowinglistpage';
import settingspage from './components/pages/settingspage';
import profilepage from './components/pages/profilepage';

import feedpage from './components/pages/feedpage';
import userpostpage from './components/pages/userpostpage';
import googleRedirect from './components/redirect-pages/google-redirect';

import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer'

import { togglepostpopup, submitpost } from './actions/appfunctions'
import {signOut} from './actions/auth'

import Newpostform from './components/forms/newpostform';
import {Transition} from 'semantic-ui-react';
import { connect } from 'react-redux';


const PrivateRoute = ({isAuthenticated, component: Component, ...rest}) => {
    return (
      <Route
        {...rest}
        render={props =>
           isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to="/signin"   
            />
          )
        }
      />
    )
};

const NotLoggedInOnlyRoute = ({isAuthenticated, component: Component, ...rest}) => {
    return (
      <Route
        {...rest}
        render={props =>
           isAuthenticated ? (
            <Redirect
              to="/"   
            />
          ) : (
            <Component {...props} />
          ) 
        }
      />
    )
};




class App extends Component {

  submitpost = data => this.props.submitpost(data);

  redirect_to_login = () => this.props.history.push('/signin');


  render() {
    return (
      <div style={{minHeight:"100vh",  paddingBottom: '80px', position: 'relative', 'wordWrap':'break-word','margin':'0 auto', 'width': '100%', maxWidth:'1200px'}}>
        {/*New post form implemented here, so can be rendered anywhere in the app.*/}
        <Transition animation='scale' duration={175} visible={this.props.renderNewPostPopup}>
          <div style={{ zIndex:'99', 'width': '90%', 'position': 'fixed', 'left': '50%', 'marginLeft': '-45%',marginTop:"20px", maxHeight:"600px"}}> 
            <Newpostform redirect_to_login={this.redirect_to_login} isAuthenticated={this.props.isAuthenticated} submit={this.submitpost} closeform={this.props.onToggleClick} />
          </div>
        </Transition>

        <Navbar togglepostpopup={this.props.onToggleClick} history={this.props.history} signOut={this.props.signOut} isAuthenticated={this.props.isAuthenticated} />

  	    <Switch>
  	    	<NotLoggedInOnlyRoute isAuthenticated={this.props.isAuthenticated} path='/signin' exact component={signinpage} />
          <NotLoggedInOnlyRoute isAuthenticated={this.props.isAuthenticated} path='/signup' exact component={signuppage} />
          <NotLoggedInOnlyRoute isAuthenticated={this.props.isAuthenticated} path='/resetpassword' component={resetpasswordpage} />
          <PrivateRoute isAuthenticated={this.props.isAuthenticated} path='/feed' component={feedpage} />
          <PrivateRoute isAuthenticated={this.props.isAuthenticated} path='/following' component={myfollowinglistpage} />
          <PrivateRoute isAuthenticated={this.props.isAuthenticated} path='/profile' component={profilepage} />
          <PrivateRoute isAuthenticated={this.props.isAuthenticated} path='/settings' component={settingspage} />
          <Route isAuthenticated={this.props.isAuthenticated} path='/user' component={userpostpage} />
          <Route isAuthenticated={this.props.isAuthenticated} path='/auth/google/redirect' component={googleRedirect} />
  	    	<Route isAuthenticated={this.props.isAuthenticated} path='/' component={homepage} />
        </Switch>

        <Footer />


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
    },
    signOut: () => {
      return dispatch(signOut())
    }

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);
