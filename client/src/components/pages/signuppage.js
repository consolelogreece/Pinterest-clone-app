import React, {Component} from 'react';
import { connect } from 'react-redux';
import Signupform from '../forms/signupform';
import {signup} from '../../actions/auth'

class signuppage extends Component{

	signup = data => this.props.signup(data).then(() => this.props.history.push("/signin"))

	render(){
		return (
			<Signupform signup={this.signup}/>
		)
	}
}
export default connect(null, { signup })(signuppage);