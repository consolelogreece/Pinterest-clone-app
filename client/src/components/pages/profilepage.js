import React, { Component } from 'react';
import Modifyprofileform from '../forms/modifyprofileform'
import {connect} from 'react-redux';
import {editProfile} from '../../actions/appfunctions';

class profilepage extends Component {

	render(){

		return(
			<div>
				<h1>My Profile</h1>
				<Modifyprofileform editProfile={this.props.editProfile} userProfile={this.props.userProfile} />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		userProfile:state.user.userProfile
	}

}
const mapDispatchToProps = dispatch => {
	return {
		editProfile: new_profile => {
			return dispatch(editProfile(new_profile))
		}
	}
	
}

export default connect (mapStateToProps, mapDispatchToProps)(profilepage);