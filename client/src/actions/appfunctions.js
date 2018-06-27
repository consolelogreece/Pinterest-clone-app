import axios from 'axios';
export const togglepostpopup = () => {
	return ({type:"TOGGLE_POST_POPUP"});
}

export const submitpost = data => dispatch => {
	return axios.post("/app/newpost", {data}).then(response => {
		dispatch({type:"SUBMIT_POST", id:response.data.data.postId});
		return response;
	})
}

export const getUserPosts = data => dispatch => {
	return axios.get("/app/user?id="+ data.id + "&page=" + data.page).then(response => {
		dispatch({type:"RECEIVED_USER_POSTS", data:response.data.data});
	})
}

export const deleteUserPostsFromStore = () => {
	return ({type:"DELETE_USER_POSTS_FROM_STORE"});
}


export const likePost = postId => dispatch => {
	dispatch({type:"USER_LIKED_POST", id:postId})
	return axios.post('/app/likepost', {postId: postId}).catch(response => {
		// if error, 'unlike' post. This gives more snappy feedback when clicking like, as it appears to be liked immediately
		dispatch({type:"USER_UNLIKED_POST", id:postId});
	})
}

export const unlikePost = postId => dispatch => {
	dispatch({type:"USER_UNLIKED_POST", id:postId})
	return axios.post('/app/likepost', {postId: postId}).catch(response => {
		// if error, 'unlike' post. This gives more snappy feedback when clicking like, as it appears to be liked immediately
		dispatch({type:"USER_LIKED_POST", id:postId});
	})
}


export const sharePost = postId => dispatch => {
	dispatch({type:"USER_SHARED_POST", id:postId})
	return axios.post('/app/sharepost', {postId: postId}).catch(response => {
		// if error, 'UNAHRE' post. This gives more snappy feedback when clicking share, as it appears to be shared immediately
		dispatch({type:"USER_UNSHARED_POST", id:postId});
	})
}

export const unsharePost = postId => dispatch => {
	dispatch({type:"USER_UNSHARED_POST", id:postId})
	return axios.post('/app/sharepost', {postId: postId}).catch(response => {
		// if error, 'UNAHRE' post. This gives more snappy feedback when clicking share, as it appears to be shared immediately
		dispatch({type:"USER_SHARED_POST", id:postId});
	})
}

export const follow = userId => dispatch => {
	dispatch({type:"USER_FOLLOWED", id:userId})
	return axios.post('/app/followuser', {userId: userId}).catch(response => {
		// if error, 'unfollow' post. This gives more snappy feedback when clicking follow, as it appears to follow immediately
		dispatch({type:"USER_UNFOLLOWED", id:userId})
	})
}

export const unfollow = userId => dispatch => {
	dispatch({type:"USER_UNFOLLOWED", id:userId})
	return axios.post('/app/followuser', {userId: userId}).catch(response => {
		// if error, 'unfollow' post. This gives more snappy feedback when clicking follow, as it appears to follow immediately
		dispatch({type:"USER_FOLLOWED", id:userId})
	})
}

export const deletePost = postId => dispatch => {
	dispatch({type:"POST_DELETED", id:postId});
	dispatch({type:"REMOVE_POST_FROM_USER_POST_PAGE", id:postId})
	return axios.post('/app/deletepost', {postId:postId}).catch(response => {
		dispatch({type:"UNDO_POST_DELETION", id:postId})
	});
}

