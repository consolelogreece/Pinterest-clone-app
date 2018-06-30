import React, { Component } from 'react'
import { Input, Form, Button } from 'semantic-ui-react'
import ErrorMessageInline from '../messages/ErrorMessageInline'
import SuccessMessageInline from '../messages/SuccessMessageInline'
import validator from 'validator'

class PasswordResetRequestForm extends Component {
	state={
		data:{
			email:""
		},
		sent:false,
		errors:{},
		loading:false
	}

	handleChange = e => {
		this.setState({data:{...this.state.data, [e.target.name]:e.target.value}})
	}

	handleSubmit = () => {
		const errors = this.validate()
		this.setState({errors:errors}, () => {
			if (Object.keys(this.state.errors).length === 0) {
				this.props.resetPassword({...this.state.data})
				this.setState({sent:true})

			}
		})	
	}

	validate = () => {
		let errors = {}
		if (!validator.isEmail(this.state.data.email)) errors.email = "Enter a valid email"
		return errors
	}


	render(){
		const { data, errors, sent } = this.state

	
		return(
			<div onChange={(e) => this.handleChange(e)}>
			<h3> Reset password </h3>
				<Form>
					<Form.Field error={(!!errors.email || !!errors.general)}>
						<label>Email</label>
						<Input type={"text"} value={data.email} name={'email'} onChange={(e) => this.handleChange(e)} />
						{!!errors.email && <ErrorMessageInline text={errors.email} />}
						{!!sent && <SuccessMessageInline text={"A reset link will be sent if the email exists"} />} {/*A generic success message like this that always shows helps prevent enumeration attacks.*/}
					</Form.Field>
					<Button style={{backgroundColor:"#d15559", color:"#fff"}} onClick={() => this.handleSubmit()}>Send reset email</Button> <Button onClick={() => this.props.setReset()}>Back</Button>		
				</Form>
			</div>

		)
	}
}
export default PasswordResetRequestForm