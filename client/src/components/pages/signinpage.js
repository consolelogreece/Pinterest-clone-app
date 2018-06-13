import React, { Component } from 'react'
import Signinform from '../forms/signinform'
import { signin_native, signin_google } from '../../actions/auth'
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'

class signinpage extends Component {


	signin_native = data => this.props.signin_native(data).then(() => this.props.history.push("/"))

	signin_google = () => signin_google();
	

	render(){
		return(
			<div>
				<Signinform signin={this.signin_native} />
				<Button onClick={() => this.signin_google()} id="google">Google+</Button>
				<Button id="github">Github</Button>
			</div>
		)
	}
}

export default connect(null, { signin_native })(signinpage);