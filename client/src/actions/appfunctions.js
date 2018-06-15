import axios from 'axios';
export const togglepostpopup = () => {
	return ({type:"TOGGLE_POST_POPUP"})
}

export const submitpost = data => dispatch => {
	return axios.post("/auth/newpost", {data}).then(response => {
		dispatch({type:"SUBMIT_POST"})
		return response;
	})
}

