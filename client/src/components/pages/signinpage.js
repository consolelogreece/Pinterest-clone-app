import React, { Component } from 'react'
import SigninForm from '../forms/signinform'
import { resetPasswordRequestEmail, signin_native, signin_google } from '../../actions/auth'
import { connect } from 'react-redux';
import PasswordResetRequestForm from '../forms/passwordresetrequestform';

class signinpage extends Component {
	state={
		reset:false
	}

	resetpassword = data => resetPasswordRequestEmail(data)

	setReset = () => this.setState({reset:!this.state.reset})

	signin_native = data => this.props.signin_native(data).then(() => this.props.history.push("/"))

	signin_google = () => signin_google().then(resp => console.log("=-===", resp));
	

	render(){
		return(
			<div>
				{this.state.reset ? <PasswordResetRequestForm resetPassword={this.resetpassword} setReset={this.setReset}/> : <SigninForm setReset={this.setReset} signin={this.signin_native}/>}
				<a href="http://localhost:8080/auth/google">Google+</a>
			</div>
		)
	}
}

export default connect(null, { signin_native })(signinpage);