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
			<Card style={{'border':'1px solid grey', 'borderRadius':'6px', 'margin':'auto', zIndex:'1', boxShadow:'10px 10px 5px grey', height:"500px", width:"600px"}}>
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
					      <Grid.Column width={8}>
					        <Button style={{width:"90%"}} primary onClick={() => this.handleSubmit()} primary>Submit</Button>
					      </Grid.Column>
					      <Grid.Column width={8}>
					        <Button style={{width:"90%", backgroundColor:'#b8514a'}} primary onClick={() => this.props.closeform()}>cancel</Button>
					      </Grid.Column>
					    </Grid.Row>
					</Grid>
				</div>
				</Card.Description>
			</Card>


		)

	}

}

export default newpostform;