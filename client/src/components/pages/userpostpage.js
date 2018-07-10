import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPosts, deletePostsFromStore, sharePost, unsharePost, likePost, unlikePost, follow, unfollow, deletePost } from '../../actions/appfunctions';

import CardContainer from '../containers/cardContainer';
import UserBanner from '../containers/userBanner'

import Masonry from 'react-masonry-component';
import {Icon} from 'semantic-ui-react';

import queryString from 'querystring';
import PostCardTemplate from '../templates/post-card-template';
 
class userpostpage extends React.PureComponent {

	populatePostArray = () => {

		let parsedUrlObject = queryString.parse(this.props.history.location.search)

		// redirect to homepage if no Id provided
		if (!Object.prototype.hasOwnProperty.call(parsedUrlObject, '?id')) {
			this.props.history.push("/")
		} 
		else {
			const page = parseInt(parsedUrlObject["page"], 10) || 0;
			
			return this.props.get_posts({id:parsedUrlObject['?id'], page:page}).catch(() => this.props.history.push("/"))
		}
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
				break;
			case "prev":
				if (page !== 0) this.props.history.push(pagepath + (page - 1));
				break;
			case "next":
				this.props.history.push(pagepath + (page + 1));	
				break;
			case "last":
				// 12 = total posts per page.
				this.props.history.push(pagepath + (Math.floor(this.props.totalPosts / 12)));		
				break;
			default:
				break;


		}

		this.populatePostArray();
	}

	componentDidUpdate (prevProps) {
	    const newLocationKey = this.props.location.key;
	    const oldLocationKey = prevProps.location.key;
	    if (newLocationKey !== oldLocationKey)
	    this.populatePostArray();
	 }



	redirectSignin = () => {
		this.props.history.push("/signin");
	}

	render(){

		let parsedUrlObject = queryString.parse(this.props.history.location.search);

		let userId = parsedUrlObject['?id'];

		let isFollowing = false;
		let isProfileCurrentUsers = false;

		if (!!this.props.followingIds) {
			isFollowing = (this.props.followingIds.indexOf(userId) === -1 ) ? false : true;
			isProfileCurrentUsers = (userId !== this.props.userId) ? false : true;
		}

		return(
			<div>
				<UserBanner 
					follow={this.props.isAuthenticated ? ((isFollowing) ? this.props.unfollow : this.props.follow) : this.redirectSignin}
					isFollowing={isFollowing} 
					isProfileCurrentUsers={isProfileCurrentUsers}
					history={this.props.history} 
					userId={userId}
					userProfile={this.props.userProfile} 
				/>
				<CardContainer history={this.props.history} {...this.props} populatePostArray={this.populatePostArray} handlePageChange={this.handlePageChange} />
			</div>
		)
	}

}


const mapDispatchToProps = dispatch => {

	return {
		get_posts: (userid) => {
			return dispatch(getPosts(userid));
		},
		deletePostsFromStore: () => {
			dispatch(deletePostsFromStore());
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
		posts:state.app.currentPagePosts.posts,
		userId:state.user.userId,
		likedPostIds:state.user.likedPostIds,
		sharedPostIds:state.user.sharedPostIds,
		followingIds:state.user.followingIds,
		isAuthenticated:state.user.isAuthenticated,
		totalPosts:state.app.currentPagePosts.totalPosts,
		userProfile:state.app.currentPagePosts.userProfile
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(userpostpage);