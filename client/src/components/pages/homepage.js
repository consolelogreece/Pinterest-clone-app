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
				add view all page with pagination, so views can view all results of search
					<br />
				check why having "onclick" on a link causes a whole page refresh -> very strange
				<br />
				why does mongodb $text $search not work with letter a? 
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



