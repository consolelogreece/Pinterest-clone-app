import React, { Component } from 'react';
import { connect } from 'react-redux';
import { togglepostpopup, submitpost } from '../../actions/appfunctions'
import Newpostform from '../forms/newpostform';

class homepage extends Component {

	submitpost = data => this.props.submitpost(data).then(data => console.log('data'))

	render(){
		return(
			<div>
				<h1>home</h1><br />
				<button onClick={() => this.props.onToggleClick()}>toggle post popup</button>
				{this.props.renderNewPostPopup && <Newpostform submit={this.submitpost} closeform={this.props.onToggleClick} />}
			
			</div>
		)
	}
}


const mapStateToProps = state => ({
	renderNewPostPopup:state.app.renderNewPostPopup
})


const mapDispatchToProps = dispatch => {
  return {
    onToggleClick: () => {
      dispatch(togglepostpopup())
    },
    submitpost: (data) => {
    	return dispatch(submitpost(data))
    }

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(homepage);