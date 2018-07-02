import React from 'react';
import { Image, Card, Icon, Grid } from 'semantic-ui-react';
import moment from 'moment';

const card = props => {
		return (
		<Card style={{ 'boxShadow':'4px 4px 2px #c4c2c2', marginLeft:'4px',marginRight:'4px',  border:"1px solid gray"}}>
		  	<div style={{'backgroundColor':'#474647', 'width':'auto'}}>
		   		<Image  style={{'maxHeight':'600px', "margin":"auto"}} src={props.imageUrl} onError={e => e.target.src='https://i.imgur.com/l0dkJDp.png'}/> 
		   	</div>
		    <Card.Content>
			    <Card.Header style={{textAlign:'center'}}>{props.title}</Card.Header>
		    </Card.Content>

		    <Card.Content>
		    <Grid container={true} centered={true}>
			    <Grid.Row columns={3}>
			    	<Grid.Column textAlign="center">
			    		{props.doesPostBelongCurrentUser 
			    			?
			    			<Icon size="large" onClick={() => props.deletePost(props.id)} link={true} name="delete"/>
			    			:
			    			<Icon size="large" onClick={() => props.follow(props.authorId)} link={true} name="plus square" color={props.isFollowing ? "green" : "grey"}/>
			    			
			    		}
			    	</Grid.Column>
			    	<Grid.Column textAlign="center">
			    		<Icon size="large" onClick={() => props.likePost(props.id)} link={true} name="like" color={props.isLiked ? "red" : "grey"}/>
			      
			    	</Grid.Column>
			    	<Grid.Column textAlign="center">
			    		<Icon size="large" onClick={() => props.sharePost(props.id)} name="share square" link={true} color={props.isShared ? "blue" : "grey"}/>
			    	</Grid.Column>
			    </Grid.Row>
			</Grid>	
		    </Card.Content>

		    <Card.Content>
		    {props.doesPostBelongCurrentUser 
		    	?
		    	<Card.Meta>{"Posted by You"}</Card.Meta>
		    	:
		    	<Card.Meta>{"Posted by "} <a href={`/user?id=${props.authorId}`}>{props.username}</a></Card.Meta>
		    }
		    	
			    <Card.Meta>{`${moment(props.creationDate).format("MMM Do YYYY, h:mm a")}`}</Card.Meta>
		    </Card.Content>
		</Card>
		//aa
	)
}

export default card;