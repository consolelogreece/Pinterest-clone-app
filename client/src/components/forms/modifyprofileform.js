import React, { Component } from 'react';
import styles from './modifyprofilestyles.css';
import {Input, Image, Button} from 'semantic-ui-react';
import validator from 'validator';
import SuccessMessageInline from '../messages/SuccessMessageInline';
import ErrorMessageInline from '../messages/ErrorMessageInline';

class modifyprofileform extends Component {

	constructor(props){
		super(props)
		console.log(this.props)
		this.state={
			bio:this.props.userProfile.bio,
			picture:this.props.userProfile.picture,
			errors:{},
			loading:false,
			success:false
		}

	}

	handleChange = e => {
		console.log("changing")
		this.setState({...this.state, [e.target.name]:e.target.value})
	}

	validateForm = () => {
		let errors = {};
		// if the picture input box value is longer than length 0, and the url is invalid, display error. leave empty = user wants default image.
		if (!validator.isURL(this.state.picture) && this.state.picture.length > 0) errors.picture = "Enter a valid image url"
			if (this.state.bio.length > 100) errors.bio = "Your bio can't be longer than 100 characters"
		return errors
	}



	handleSubmit = () => {
		const errors = this.validateForm()
		this.setState({errors:errors, success:false})
		if (Object.keys(errors).length === 0) {
			this.props.editProfile({bio:this.state.bio, picture:this.state.picture}).then(() => {
				console.log("okok")
				this.setState({success:true})
			}).catch(() => {
				console.log("error")
			})
		}
	}



	render(){
		const {errors, success} = this.state
		return(	
			<div>
				<div style={{margin:'20px 0px', borderBottom:"1px solid #000"}}>	
					<h3>Edit profile</h3>
				</div>
				<div className="modify-profile-form">
					<div className="modify-pic-box">
				    	<label className="modify-profile-labels">Display picture</label> <br />
				   		<div className="modify-picture-element-container">
				    		<Image className="modify-picture-element" src={this.state.picture} onError={e => e.target.src='https://i.imgur.com/xRped5d.png'} />
				    	</div>
				    	<div className="modify-element-form">
				        	<label className="modify-profile-labels">Edit display picture url</label> <br />
				        	<Input name="picture" value={this.state.picture} onChange={e => this.handleChange(e)} placeholder="www.example.com/example.png" fluid={true} className="modify-picture-input"/>
				        	{errors.picture && <div style={{"margin":"0 auto 5px auto", textAlign:"center"}}><ErrorMessageInline style={{"margin":"0 auto", textAlign:"center"}} text={errors.picture}/></div>}
				    	</div>
				  	</div>

				  	<div className="modify-bio-box">
				  		<label className="modify-profile-labels">Edit bio</label> <br />
				    	<Input name="bio" value={this.state.bio} onChange={e => this.handleChange(e)} placeholder="Hey, i'm James and I love swimming!" fluid={true} className="modify-picture-input"/>
				    	{errors.bio && <div style={{"margin":"0 auto 5px auto", textAlign:"center"}}><ErrorMessageInline style={{"margin":"0 auto", textAlign:"center"}} text={errors.bio}/></div>}
				  	</div>
				  	{success && <div style={{"margin":"0 auto 5px auto", textAlign:"center"}}><SuccessMessageInline style={{"margin":"0 auto", textAlign:"center"}} text="Profile changes saved succesfully"/></div>}
				  	<Button onClick={() => this.handleSubmit()} style={{backgroundColor:"#d15559", color:"#fff", "width":"30%", margin:"0 auto"}}>Save changes</Button>

				</div>
			</div>
		)
	}
}

export default modifyprofileform;