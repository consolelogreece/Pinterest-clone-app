import React, { Component } from 'react';
import { connect } from 'react-redux';
import { togglepostpopup } from '../../actions/appfunctions';
import "./homepage-styles.css"

class homepage extends Component {

	render(){
		return(
			<div id="home">
			  <div id="hello-container">
			  	{
			  		!this.props.isAuthenticated ? (
			  			<div>
				  			<h1 className="hello">Hello</h1>
						    <button onClick={() => this.props.history.push("/signin")} className="home-screen-buttons">Sign in</button> 
						    <button onClick={() => this.props.history.push("/signup")} className="home-screen-buttons">Sign up</button>
					    </div>
			  		) : (
			  			<div>
			  				<h1 className="hello">Welcome back, <br />{this.props.username}</h1>
			  			</div>
			  		)
			  	}
			  </div>
			</div>
		)
	}
}



const mapStateToProps = state => {
  return {
 	isAuthenticated:state.user.isAuthenticated,
 	username:state.user.username
  }
}



export default connect(mapStateToProps)(homepage);



