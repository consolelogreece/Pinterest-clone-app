import React, { Component } from 'react';
import { connect } from 'react-redux';	
import { changePassword } from '../../actions/auth';
import Changepasswordform from '../forms/changepasswordform';


class settingspage extends Component {

	changePassword = credentials => changePassword(credentials)

	render(){
		return(
			<div>
				<h1>Settings</h1>
				<Changepasswordform changePassword={this.changePassword} token={this.props.token || null}/>
			</div>
		)
	}

}


const mapStateToProps = state => {
	return({
		token:state.user.token
	})
}

export default connect(mapStateToProps)(settingspage)