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

export const getPosts = data => dispatch => {
	return axios.get("/app/user?id="+ data.id + "&page=" + data.page).then(response => {
		dispatch({type:"RECEIVED_POSTS", data:response.data.data});
	})
}

export const getFeed = data => dispatch => {
	return axios.get("/app/feed?page=" + data.page).then(response => {
		dispatch({type:"RECEIVED_POSTS", data:response.data.data});
	})
}


export const getFollowingList = page => dispatch => {
	return axios.get("/app/getfollowinglist?page=" + page).then(response => {
		dispatch({type:"RECEIVED_FOLLOWING", data:response.data.data})
	})
}


export const deletePostsFromStore = () => {
	return ({type:"DELETE_POSTS_FROM_STORE"});
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
	console.log(postId)
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

export const unfollowAndRemoveFromFollowingPage = user => dispatch => {
	const userId = user.id

	dispatch({type:"USER_UNFOLLOWED", id:userId})
	dispatch({type:"REMOVE_USER_FROM_FOLLOWING", id:userId})
	return axios.post('/app/followuser', {userId: userId}).catch(response => {
		// if error, 'unfollow' post. This gives more snappy feedback when clicking follow, as it appears to follow immediately
		dispatch({type:"USER_FOLLOWED", id:userId})
		dispatch({type:"RE_ADD_USER_TO_FOLLOWING", user:user.user})
	})
}


export const deletePost = postId => dispatch => {
	dispatch({type:"POST_DELETED", id:postId});
	dispatch({type:"REMOVE_POST_FROM_USER_POST_PAGE", id:postId})
	return axios.post('/app/deletepost', {postId:postId}).catch(response => {
		dispatch({type:"UNDO_POST_DELETION", id:postId})
	});
}

export const editProfile = new_profile => dispatch => {
	return axios.post("/app/editprofile", {new_profile}).then(() => {
		dispatch({type:"PROFILE_EDITED", data:new_profile})
	})
}

export const searchQuery = searchquery => dispatch => {
	return axios.get("/app/searchbar?q=" + searchquery).then(response => {
		dispatch({type:"ADD_SEARCH_RESULTS_TO_STORE", data:response.data.results || {results:[], isMoreThanLimit:false}})
	})
}

export const getPeople = (searchquery, page) => dispatch => {
	return axios.get("/app/search?q=" + searchquery + "&page="+ page).then(response => {
		dispatch({type:"RECEIVED_PEOPLE", data:response.data.data})
	})
}


export const clearSearchResults = () => ({"type":"CLEAR_SEARCH_RESULTS"})



