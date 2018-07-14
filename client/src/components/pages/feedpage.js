import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getFeed, deletePostsFromStore, sharePost, unsharePost, likePost, unlikePost, deletePost } from '../../actions/appfunctions';

import CardContainer from '../containers/cardContainer';
import UserBanner from '../containers/userBanner'

import queryString from 'querystring';

 
 
class feedpage extends Component {

	populatePostArray = () => {	

		let parsedUrlObject = queryString.parse(this.props.history.location.search)
		
		const page = parseInt(parsedUrlObject["?page"], 10) || 0;
			
		return this.props.get_posts({page:page}).catch(() => this.props.history.push("/"))
		
	}

	handlePageChange = e => {

		let parsedUrlObject = queryString.parse(this.props.history.location.search)

		let page = parseInt(parsedUrlObject["?page"], 10) || 0;

		const pagepath = `${this.props.history.location.pathname}?page=`

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


	render(){
		return(
			<div>
				<UserBanner 
					userProfile={this.props.userProfile}
					isProfileCurrentUsers={true}
					follow={() => this.props.history.push("/")}
				/>
				<CardContainer {...this.props} populatePostArray={this.populatePostArray} handlePageChange={this.handlePageChange} />
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {

	return {
		get_posts: (userid) => {
			return dispatch(getFeed(userid));
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
		userProfile:state.user.userProfile
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(feedpage);