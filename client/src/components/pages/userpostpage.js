import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserPosts, deleteUserPostsFromStore } from '../../actions/appfunctions';
import Masonry from 'react-masonry-component';
import { Image, Card, Button, Icon, Grid } from 'semantic-ui-react';
import moment from 'moment';
import queryString from 'querystring'
 
class userpostpage extends Component {

	mapPosts = () => {
		return this.props.posts.map(post => {
			return (
			  <Card style={{ 'boxShadow':'4px 4px 2px #c4c2c2', marginLeft:'4px',marginRight:'4px',  border:"1px solid gray"}} key={post._id}>
			  	<div style={{'backgroundColor':'#474647', 'width':'auto'}}>
			   		<Image  style={{'maxHeight':'600px', "margin":"auto"}} src={post.imageUrl} onError={e => e.target.src='https://i.imgur.com/l0dkJDp.png'}/> 
			   	</div>
			    <Card.Content>
				    <Card.Header style={{textAlign:'center'}}>{post.title}</Card.Header>
			    </Card.Content>

			    <Card.Content>
			    <Grid container="true" centered="true">
				    <Grid.Row columns={3}>
				    	<Grid.Column textAlign="center">
				    		<Icon size="large" onClick={() => alert("followed")} name="angle double right"/>
				    	</Grid.Column>
				    	<Grid.Column textAlign="center">
				    		<Icon size="large" onClick={() => alert("liked")} name="like"/>
				      
				    	</Grid.Column>
				    	<Grid.Column textAlign="center">
				    		<Icon size="large" onClick={() => alert("shared")} name="share square"/>
				    	</Grid.Column>
				    </Grid.Row>
				</Grid>	
			    </Card.Content>

			    <Card.Content>
			    	<Card.Meta>{`Posted by ${this.props.username}`}</Card.Meta>
				    <Card.Meta>{`${moment(post.creationDate).format("MMM do YYYY, h:mm a")}`}</Card.Meta>
			    </Card.Content>
			  </Card>
			)
		});
	}

	componentDidMount(){
		let parsedUrlObject = queryString.parse(this.props.location.search)
		if (!Object.prototype.hasOwnProperty.call(parsedUrlObject, '?id')) this.props.history.push("/")
		else this.props.get_posts(parsedUrlObject['?id'])

		
	}


	componentWillUnmount(){
		this.props.deleteUserPostsFromStore();
	}

	render(){
		let postData = this.mapPosts();
		return(
		
				<Masonry elementType='ul' style={{width:'100%', margin:'auto'}}> 
					{postData}
				</Masonry>
			
		)
	}
}

const mapDispatchToProps = dispatch => {

	return {
		get_posts: (userid) => {
			return dispatch(getUserPosts(userid));
		},
		deleteUserPostsFromStore: () => {
			dispatch(deleteUserPostsFromStore());
		}
	}
}

const mapStateToProps = state => {
	return {
		posts:state.app.userpostpageposts.posts,
		username:state.app.userpostpageposts.username
	}
}

export default connect (mapStateToProps, mapDispatchToProps)(userpostpage);