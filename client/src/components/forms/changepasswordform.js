import React, { Component } from 'react';
import {Form, Input, Button} from 'semantic-ui-react';
import ErrorMessageInline from '../messages/ErrorMessageInline';

class changepasswordform extends Component {
	state={
		data:{
			currentpassword:'',
			newpassword:'',
			confirmpassword:''
		},
		loading:false,
		success:false,
		errors:{}
	}

	handlechange = e => {
		this.setState({data:
			{...this.state.data, [e.target.name]:e.target.value}
		})
	}


	handlesubmit = () => {
		const errors = this.validate();

		this.setState({errors:errors}, () => {
			if (Object.keys(this.state.errors).length === 0) {
				this.setState({loading:true})
				this.props.changePassword({...this.state.data, token:this.props.token})
										.then(() => this.setState({loading:false, success:true}))
										.catch(err => this.setState({errors:err.response.data.errors, loading:false, success:false}))

			}
		})	
	}


	validate = () => {
		let errors = {};
		const data = this.state.data;

		if (data.currentpassword === '') errors['currentpassword'] = "Can't be blank";
		if (data.newpassword === '') errors['newpassword'] = "Can't be blank";
		if (data.confirmpassword !== data.newpassword) errors['confirmpassword'] = "Passwords don't match";
		return errors;
	}





	render(){
		const {data, loading, errors} = this.state;
		return(
			<Form loading={loading}>
				<Form.Field error={!!errors.currentpassword}>
					<label>Current password</label>
					<Input id="currentpassword" name="currentpassword" onChange={e => this.handlechange(e)} value={data.currentpassword} />
					{!!errors.currentpassword && <ErrorMessageInline text={errors.currentpassword}/>}
				</Form.Field>
				<Form.Field error={!!errors.newpassword}>
					<label>New password</label>
					<Input id="newpassword" name="newpassword" onChange={e => this.handlechange(e)} value={data.newpassword} />
					{!!errors.newpassword && <ErrorMessageInline text={errors.newpassword}/>}
				</Form.Field>
				<Form.Field error={!!errors.confirmpassword}>
					<label>Confirm password</label>
					<Input id="confirmpassword" name="confirmpassword" onChange={e => this.handlechange(e)} value={data.confirmpassword} />
					{!!errors.confirmpassword && <ErrorMessageInline text={errors.confirmpassword}/>}
				</Form.Field>
				<Button onClick={() => this.handlesubmit()}>Change password</Button>
			</Form>
		)
	}

}

export default changepasswordform;