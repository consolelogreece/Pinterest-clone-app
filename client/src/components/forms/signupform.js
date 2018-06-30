import React, { Component } from 'react';
import { Button, Input, Form, Container } from 'semantic-ui-react';
import validator from 'validator';
import ErrorMessageInline from '../messages/ErrorMessageInline';



class signupform extends Component {
	constructor(){
		super();
		this.state={
			data:{
				username:'a',
				email:'a@a.com',
				password:'a',
				confirmpassword:'a'
			},
			loading:false,
			errors:{}
		}
	}

	handlechange = e => {
		this.setState({data:{...this.state.data, [e.target.name]:e.target.value}})
	}

	handleSignup = () => {
		this.setState({errors: this.validate()}, () => {
			if (Object.keys(this.state.errors).length === 0) {
				this.signup();
			}
		})
	}

	signup = () => {
 		this.props.signup(this.state.data).catch(err => {
 			this.setState({errors:err.response.data.errors, loading:false})
 		})
	}

	validate = () => {
		let errors={};
		let { data } = this.state;
		if (data.username === '') errors['username'] = "Can't be blank";
		if (!validator.isEmail(data.email)) errors['email'] = "Invalid email";
		if (data.email === '') errors['email'] = "Can't be blank";
		if (data.password === '') errors['password'] = "Can't be blank";
		if (data.confirmpassword !== data.password) errors['confirmpassword'] = "Passwords don't match";
		return errors;
	}





	render(){
		const {data, loading, errors} = this.state;
		return(

			<Container loading={loading} style={{"maxWidth":"960px"}}>
				<Form>
					<Form.Field error={!!errors.username}>
						<label>Username</label>
						<Input name="username" type="text" id="username" value={data.username} onChange={(e) => this.handlechange(e)} />
						{!!errors.username && <ErrorMessageInline text={errors.username} /> }
					</Form.Field>
					<Form.Field error={!!errors.email}>
						<label>Email</label>
						<Input name="email" type="text" id="email" value={data.email} onChange={(e) => this.handlechange(e)} />
						{!!errors.email && <ErrorMessageInline text={errors.email} /> }
					</Form.Field>
					<Form.Field error={!!errors.password}>
						<label>Password</label>
						<Input name="password" type="password" id="password" value={data.password} onChange={(e) => this.handlechange(e)} />
						{!!errors.password && <ErrorMessageInline text={errors.password} /> }
					</Form.Field>
					<Form.Field error={!!errors.confirmpassword}>
						<label>Confirm password</label>
						<Input name="confirmpassword" type="password" id="confirmpassword" value={data.confirmpassword} onChange={(e) => this.handlechange(e)} />
						{!!errors.confirmpassword && <ErrorMessageInline text={errors.confirmpassword} /> }
					</Form.Field>
					<Button style={{backgroundColor:"#d15559", color:"#fff"}} onClick={() => this.handleSignup()}>Sign up </Button>
				</Form>
			</Container>

		)

	}
}

export default signupform;