import React from 'react';
import { Image, Card, Icon, Grid, Button, Label } from 'semantic-ui-react';
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
		    		<Grid.Column width={8} textAlign="center">
			    		<Button  onClick={() => props.likePost(props.id)} as='div' labelPosition='right'>
					      <Button color='red'>
					        <Icon name={props.isLiked ? "heart" : "heart outline"} />
					      </Button>
					      <Label as='a' basic pointing='left'>
					       	{props.likes}
					      </Label>
					    </Button>
			    	</Grid.Column>

			    	<Grid.Column width={8} textAlign="center">
			    		<Button onClick={() => props.sharePost(props.id)} as='div' labelPosition='right'>
					      <Button color='blue'>
					        <Icon name={props.isShared ? "share square" : "share square outline"} />
					      </Button>
					      <Label as='a' basic pointing='left'>
					       	{props.shares}
					      </Label>
					    </Button>
			    	</Grid.Column>
			</Grid>	
		    </Card.Content>

		    <Card.Content>
			    <Grid>
				   	<Grid.Column width={12}>
					    {props.doesPostBelongCurrentUser 
					    	?
					    	<Card.Meta>{"Posted by You"}</Card.Meta>
					    	:
					    	<Card.Meta>{"Posted by "} <a href={`/user?id=${props.authorId}`}>{props.username}</a></Card.Meta>
					    }

						<Card.Meta>{`${moment(props.creationDate).format("MMM Do YYYY, h:mm a")}`}</Card.Meta>
					</Grid.Column>
					<Grid.Column width={4}>
					   	{props.doesPostBelongCurrentUser &&	
					    	<div style={{marginTop:"10px", marginLeft:"10px"}}>
				    			<Icon size="large" onClick={() => {
				    					if (window.confirm('Are you sure you wan\'t to delete? This action can\'t be undone.')) {
								        	props.deletePost(props.id)
								    	} else {
								        	return false;
								    	}
				    					}} 
				    				link={true} 
				    				name="delete"
				    			/>
				    		</div>				  			
				    	}
					</Grid.Column>
				</Grid>
		    </Card.Content>
		</Card>
	)
}

export default card;