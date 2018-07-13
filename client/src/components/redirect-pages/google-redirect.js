import { Component } from 'react';
import queryString from 'query-string'
import { connect } from 'react-redux';
import { signin_google_redirect } from '../../actions/auth'

class googleRedirect extends Component {

	componentDidMount(){
		const parsed = queryString.parse(this.props.location.search);
		const code = parsed.code;

		this.props.signin_google_redirect(code).then(() => this.props.history.push("/"))
	}

	render(){
		return null;
	}
}

export default connect(null, { signin_google_redirect })(googleRedirect);