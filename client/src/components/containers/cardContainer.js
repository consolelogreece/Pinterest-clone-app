import React, { Component } from 'react';

import Masonry from 'react-masonry-component';
import {Icon} from 'semantic-ui-react';

import PostCardTemplate from '../templates/post-card-template';
 
class cardContainer extends Component {

	mapPosts = () => {
		if (!this.props.posts) {
			//if there are no posts
			this.props.populatePostArray();
			return <h3>loading...</h3>
		} else {




		return this.props.posts.map(post => {
			let isLiked;
			let isShared;

			if (this.props.isAuthenticated) {
				isLiked = (this.props.likedPostIds.indexOf(post._id) === -1 ) ? false : true
				isShared = (this.props.sharedPostIds.indexOf(post._id) === -1 ) ? false : true
			}

			let doesPostBelongCurrentUser = false

			if (this.props.isAuthenticated) {
				if (this.props.userId === post.authorId) doesPostBelongCurrentUser = true;	
			}
 		
			return (
			  <PostCardTemplate 
				  imageUrl={post.imageUrl} 
				  title={post.title} 
				  username={post.authorUsername} 
				  creationDate={post.creationDate}
				  likes={post.likes}
				  shares={post.shares}
				  key={post._id}
				  id={post._id}
				  likePost={this.props.isAuthenticated ? ((isLiked) ? this.props.unlikePost : this.props.likePost) : this.redirectSignin}
				  sharePost={this.props.isAuthenticated ? ((isShared) ? this.props.unsharePost : this.props.sharePost) : this.redirectSignin}
				  isAuthenticated={this.props.isAuthenticated}
				  authorId={post.authorId}
				  doesPostBelongCurrentUser={doesPostBelongCurrentUser}
				  isLiked={isLiked}
				  isShared={isShared}
				  deletePost={this.props.isAuthenticated ? this.props.deletePost : this.redirectSignin}
			  />
			)
		});
	} 
	}

	redirectSignin = () => {
		this.props.history.push("/signin")
	}

	componentDidMount(){
		this.props.populatePostArray();
	}


	componentWillUnmount(){
		this.props.deletePostsFromStore();
	}

	render(){

		let postData = this.mapPosts();

		return(
			<div style={{width:"100%"}}> 
				<Masonry options = {{fitWidth:true}} style={{'margin':"auto", alignItems:'center', justifyContent:'center',  display:'flex'}} > 
					{postData}
				</Masonry>
				<div onClick={e => this.props.handlePageChange(e)} style={{ display:"flex", justifyContent:"center", margin:"auto"}}>			
					<Icon id="first" style={{color:"#d15559"}} size="huge" link={true} name="angle double left"/>
					<Icon id="prev" style={{color:"#d15559"}} size="huge" link={true} name="angle left"/>
					<Icon id="next" style={{color:"#d15559"}} size="huge" link={true} name="angle right"/>
					<Icon id="last" style={{color:"#d15559"}} size="huge" link={true} name="angle double right"/>
				</div>
			</div>
		)
	}
}

export default cardContainer;