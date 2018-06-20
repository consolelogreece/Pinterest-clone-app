import React, { Component } from 'react';
import { connect } from 'react-redux';
import { togglepostpopup } from '../../actions/appfunctions';
import axios from 'axios';


class homepage extends Component {

	render(){
		return(
			<div style={{ width:'100%', margin:'auto', 'backgroundColor':  this.props.renderNewPostPopup ? 'rgba(0,0,0,0.4)' : null}}>
				<h1>home</h1><br />
				<button onClick={() => this.props.onToggleClick()}>toggle post popup</button> <br />
				<h4>Implement login persistency. Make a call to the server on app load. If you have a cookie, server will send back the details, and can login with those. Otherwise, you arent logged in. proceed as normal</h4>	
				<button onClick={() => axios.get('/auth/logout')}>logout</button>
			</div>
		)
	}
}



const mapDispatchToProps = dispatch => {
  return {
    onToggleClick: () => {
      dispatch(togglepostpopup())
    }
    
  }
}



export default connect(null, mapDispatchToProps)(homepage);



