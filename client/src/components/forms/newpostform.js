import React, { Component } from 'react';
import {Grid, Card, Button, Form, Input, Image} from 'semantic-ui-react';
import validator from 'validator';

class newpostform extends Component {
		state = {
			data:{
				title:'a',
				imgurl:'https://i.imgur.com/l0dkJDp.png'
			},
			loading:false,
			errors:{}
		}

		handleSubmit = () => {

			if (!this.props.isAuthenticated) {
				this.props.redirect_to_login();
				this.props.closeform();
			}

			const errors = this.validate()
			this.setState({errors:errors})
		

			if (Object.keys(errors).length === 0) {
				this.setState({loading:true})
				this.props.submit(this.state.data).then(() => this.setState({loading:false}))
					.catch(err => {
						this.setState({errors:err.response.data.errors, loading:false})
					}).then(() => {
						this.props.closeform();
					})
				} 
		}

		validate = () => {
			let errors = {};
			const data = this.state.data;

			if (data.title === "") errors['title'] = "Can't be blank";
			if (!validator.isURL(data.imgurl)) errors['imgurl'] = "Must be valid url"
			if (data.imgurl === "") errors['imgurl'] = "Can't be blank";

			return errors;


		}

		handleChange = e => {
			this.setState({data:{...this.state.data, [e.target.name]:e.target.value}})
		}

	render(){
		return(	
			<Card style={{'border':'1px solid grey', 'borderRadius':'6px', 'margin':'auto', boxShadow: "10px 5px 10px 5px rgba(0, 0, 0, 0.2), 10px 5px 10px 5px rgba(0, 0, 0, 0.19)", height:"500px", width:"600px"}}>
				<div style={{'backgroundColor':'#474647', 'width':'auto'}}>
					<Image style={{"margin":"auto", height:"300px"}} src={this.state.data.imgurl} onError={e => e.target.src='https://i.imgur.com/l0dkJDp.png'}/> 	
				</div>
				<Card.Header style={{textAlign:"center"}}> <b>Make it a good'n</b> </Card.Header>
				<Card.Description>
				<div>
					<Form onChange={(e) => this.handleChange(e)}>
						<Form.Field>
							<label>Title</label>
							<Input value={this.state.data.title} name="title" />
						</Form.Field>
						<Form.Field>
							<label>Image URL</label>
							<Input value={this.state.data.imgurl} name="imgurl" />
						</Form.Field>
					</Form>
					<Grid style={{textAlign:"center"}}>
					    <Grid.Row>
					 		<Button.Group style={{width:"90%", margin:"0 auto"}} >
								<Button style={{ backgroundColor:"#d15559", color:"#fff"}} onClick={() => this.handleSubmit()} primary>Submit</Button>
						    	<Button.Or />
						   		<Button style={{backgroundColor:"#cecccc", color:"#212121"}} onClick={() => this.props.closeform()}>cancel</Button>
					  		</Button.Group> 
					    </Grid.Row>
					</Grid>
				</div>
				</Card.Description>
			</Card>


		)

	}

}

export default newpostform;