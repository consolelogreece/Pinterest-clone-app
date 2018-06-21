import axios from 'axios';
export const togglepostpopup = () => {
	return ({type:"TOGGLE_POST_POPUP"})
}

export const submitpost = data => dispatch => {
	return axios.post("/app/newpost", {data}).then(response => {
		dispatch({type:"SUBMIT_POST"})
		return response;
	})
}

export const getUserPosts = userid => dispatch => {
	return axios.get("/app/user?id="+ userid).then(response => {
		dispatch({type:"RECEIVED_USER_POSTS", data:response.data.data})
	})
}

export const deleteUserPostsFromStore = () => {
	return ({type:"DELETE_USER_POSTS_FROM_STORE"})
}

