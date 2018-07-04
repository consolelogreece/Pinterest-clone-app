import React, { Component } from 'react';
import { connect } from 'react-redux';
import { togglepostpopup } from '../../actions/appfunctions';


class homepage extends Component {

	render(){
		return(
			<div style={{ width:'100%', margin:'auto', 'backgroundColor': (this.props.renderNewPostPopup ? 'rgba(0,0,0,0.4)' : null)}}>
				<h1>home</h1><br />
				<h2>TODO:
				<br />
				 Add search bar, query database on typing, but debounce so as to not spam the database unneccesarily




				</h2>
				<button onClick={() => this.props.onToggleClick()}>toggle post popup</button> <br />
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



