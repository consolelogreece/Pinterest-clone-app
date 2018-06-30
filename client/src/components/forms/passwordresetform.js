import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Form, Button } from 'semantic-ui-react'
import ErrorMessageInline from '../messages/ErrorMessageInline'
import SuccessMessageInline from '../messages/SuccessMessageInline'

class PasswordResetForm extends Component {
	
	state={
		data:{
			newPass:"",
			confirmPass:""
		},
		success:false,
		errors:{},
		loading:false
	}

	handleChange = e => {
		this.setState({data:{...this.state.data, [e.target.name]:e.target.value}})
	}

	handleSubmit = () => {
		const errors = this.validate()

		this.setState({errors:errors, success:false, loading:true}, () => {
			if (Object.keys(this.state.errors).length === 0) this.props.ResetPassword({...this.state.data, token:this.props.resetToken})
				.then(() => this.setState({success:true, loading:false}))
				.catch(err => {
					this.setState({
						loading:false, 
						errors:{[err.response.data.type]:err.response.data.message}
					})
				})
			else this.setState({loading:false, errors:{...errors}})
		})	
	}

	validate = () => {
		let errors = {}
		const {newPass, confirmPass} = this.state.data
		if (newPass === "") errors["newPass"] = "cant be blank"
		if (confirmPass !== newPass) errors["confirmPass"] = "Passwords don't match"
		return errors
	}


	render(){
		const { data, loading, errors, success } = this.state
		return(
			<div>
				<Form error={errors.general && errors.general.toString()} loading={loading} onChange={(e) => this.handleChange(e)}>
					<Form.Field error={!!errors.newPass}>
						<label>New password</label>
						<Input name="newPass" type="password" value={data.newPass} />
						{!!errors.newPass && <ErrorMessageInline text={errors.newPass} />}
					</Form.Field>

					<Form.Field error={!!errors.confirmPass}>
						<label>Confirm new password</label>
						<Input type="password" name="confirmPass" value={data.confirmPass} />
						{!!errors.confirmPass && <ErrorMessageInline text={errors.confirmPass} />}
					</Form.Field>	
					{success && <SuccessMessageInline text="Password change successful!" />}
					{errors.general && <ErrorMessageInline text={errors.general} />}  
				</Form>	
				<Button style={{backgroundColor:"#d15559", color:"#fff"}} onClick={() => this.handleSubmit()}>Change password</Button>
			</div>

		)
	}
}

export default connect(null)(PasswordResetForm)
