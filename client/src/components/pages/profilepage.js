import React, { Component } from 'react';
import Modifyprofileform from '../forms/modifyprofileform'
import {connect} from 'react-redux';
import {editProfile} from '../../actions/appfunctions';
import {Button} from 'semantic-ui-react';

class profilepage extends Component {

	render(){

		return(
			<div>
				<h1>My Profile</h1>
				<Modifyprofileform editProfile={this.props.editProfile} userProfile={this.props.userProfile} />
				<div style={{borderTop:"1px solid #000", paddingTop:"5px",  "margin":"5px auto 5px auto", textAlign:"center"}}>
					<Button onClick={() => this.props.history.push("/user?id=" + this.props.userId)}>My posts</Button>
					<Button onClick={() => this.props.history.push("/following")}>My following list</Button>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		userProfile:state.user.userProfile,
		userId:state.user.userId
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