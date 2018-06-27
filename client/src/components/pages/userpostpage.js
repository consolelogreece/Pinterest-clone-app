import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserPosts, deleteUserPostsFromStore, sharePost, unsharePost, likePost, unlikePost, follow, unfollow, deletePost } from '../../actions/appfunctions';

import Masonry from 'react-masonry-component';
import {Button, Grid, Icon} from 'semantic-ui-react';

import queryString from 'querystring';
import PostCardTemplate from '../templates/post-card-template';
 
class userpostpage extends Component {

	mapPosts = () => {
		if (!this.props.posts) {
			//if there are no posts
			this.populatePostArray();
			return <h3>loading...</h3>
		} else {




		return this.props.posts.map(post => {
			let isLiked;
			let isShared;
			let isFollowing;

			if (this.props.isAuthenticated) {
				isLiked = (this.props.likedPostIds.indexOf(post._id) === -1 ) ? false : true
				isShared = (this.props.sharedPostIds.indexOf(post._id) === -1 ) ? false : true
				isFollowing = (this.props.followingIds.indexOf(post.authorId) === -1 ) ? false : true	 
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
				  key={post._id}
				  id={post._id}
				  likePost={this.props.isAuthenticated ? ((isLiked) ? this.props.unlikePost : this.props.likePost) : this.redirectSignin}
				  sharePost={this.props.isAuthenticated ? ((isShared) ? this.props.unsharePost : this.props.sharePost) : this.redirectSignin}
				  follow={this.props.isAuthenticated ? ((isFollowing) ? this.props.unfollow : this.props.follow) : this.redirectSignin}
				  isAuthenticated={this.props.isAuthenticated}
				  authorId={post.authorId}
				  doesPostBelongCurrentUser={doesPostBelongCurrentUser}
				  isLiked={isLiked}
				  isShared={isShared}
				  isFollowing={isFollowing}
				  deletePost={this.props.isAuthenticated ? this.props.deletePost : this.redirectSignin}
			  />
			)
		});
	} 
	}

	redirectSignin = () => {
		this.props.history.push("/signin")
	}

	populatePostArray = () => {

		let parsedUrlObject = queryString.parse(this.props.history.location.search)

		if (!Object.prototype.hasOwnProperty.call(parsedUrlObject, '?id')) {
			this.props.history.push("/")
		} 
		else {
			const page = parseInt(parsedUrlObject["page"], 10) || 0;
			
			return this.props.get_posts({id:parsedUrlObject['?id'], page:page}).catch(() => this.props.history.push("/"))
		}
	}

	componentDidMount(){
		this.populatePostArray();
	}


	componentWillUnmount(){
		this.props.deleteUserPostsFromStore();
	}

	handlePageChange = e => {

		let parsedUrlObject = queryString.parse(this.props.history.location.search)
		let page = parseInt(parsedUrlObject["page"], 10) || 0;

		if (!Object.prototype.hasOwnProperty.call(parsedUrlObject, '?id')) {
			this.props.history.push("/")
		} 

		const pagepath = `${this.props.history.location.pathname}?id=${parsedUrlObject['?id']}&page=`

		switch(e.target.id) {
		
			case "first":
				this.props.history.push(pagepath + "0");
				this.populatePostArray();
				break;
			case "prev":
				if (page !== 0) this.props.history.push(pagepath + (page - 1));
				this.populatePostArray();
				break;
			case "next":
				this.props.history.push(pagepath + (page + 1));
				this.populatePostArray();
				break;
			case "last":
				this.props.history.push(pagepath + (Math.floor(this.props.totalPosts / 8)));
				this.populatePostArray();
				break;
		}
	}


	render(){

		let postData = this.mapPosts();

		return(
			<div style={{width:"100%"}}> 
				<Masonry > 
					{postData}
				</Masonry>
				<div onClick={e => this.handlePageChange(e)} style={{ display:"flex", justifyContent:"center", margin:"auto"}}>			
					<Icon id="first" size="huge" link={true} name="angle double left"/>
					<Icon id="prev" size="huge" link={true} name="angle left"/>
					<Icon id="next" size="huge" link={true} name="angle right"/>
					<Icon id="last" size="huge" link={true} name="angle double right"/>
				</div>
			</div>
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
		},
		likePost: id => {
			dispatch(likePost(id))
		},
		unlikePost: id => {
			dispatch(unlikePost(id))
		},
		sharePost:id => {
			dispatch(sharePost(id))
		},
		unsharePost:id => {
			dispatch(unsharePost(id))
		},
		follow: id => {
			dispatch(follow(id))
		},
		unfollow: id => {
			dispatch(unfollow(id))
		},
		deletePost: id => {
			dispatch(deletePost(id))
		}
	}
}

const mapStateToProps = state => {
	return {
		posts:state.app.userpostpageposts.posts,
		userId:state.user.userId,
		likedPostIds:state.user.likedPostIds,
		sharedPostIds:state.user.sharedPostIds,
		followingIds:state.user.followingIds,
		isAuthenticated:state.user.isAuthenticated,
		totalPosts:state.app.userpostpageposts.totalPosts
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(userpostpage);