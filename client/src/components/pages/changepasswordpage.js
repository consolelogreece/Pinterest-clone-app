import React, { Component } from 'react';
import { connect } from 'react-redux';	
import { changePassword } from '../../actions/auth';
import Changepasswordform from '../forms/changepasswordform';


class changepasswordpage extends Component {

	changePassword = credentials => changePassword(credentials)

	render(){
		return(
			<Changepasswordform changePassword={this.changePassword} token={this.props.token || null}/>
		)
	}

}


const mapStateToProps = state => {
	return({
		token:state.user.token
	})
}

export default connect(mapStateToProps)(changepasswordpage)