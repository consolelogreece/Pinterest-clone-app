import React, { Component } from 'react'
import SigninForm from '../forms/signinform'
import { resetPasswordRequestEmail, signin_native, signin_google } from '../../actions/auth'
import { connect } from 'react-redux';
import PasswordResetRequestForm from '../forms/passwordresetrequestform';
import Thirdpartysigninform from '../forms/thirdpartysigninform';
import './pagestyles.css'

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
			<div className="main-page-container">
				{this.state.reset ? <PasswordResetRequestForm resetPassword={this.resetpassword} setReset={this.setReset}/> : <SigninForm setReset={this.setReset} signin={this.signin_native}/>}
				<br />
				<h2 style={{ width: "100%", textAlign: "center", borderBottom: "1px solid #000", "lineHeight": "0.1em", margin: "10px 0 20px" }}><span style={{background:"#fff", padding:"0 10px"}}>or</span></h2>
				<Thirdpartysigninform signin_google={this.signin_google}/>
			</div>
		)
	}
}



export default connect(null, { signin_native })(signinpage);