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
				<h3> IMPLEMENT DELTION OF POSTS. DELETE POST AND POSTID FROM USER POST ARRAY. HOW AM I GOING TO DELETE THE POSTID FROM OTHERS LIKED/SHARED ARRAYS? PERHAPS ON INITIAL LOAD, WHEN SEARCHING FOR IDS, IF POST DOESNT EXIST, REMOVE IT FROM THE USERS DOCUMENT IN COLLECTION</h3>
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



