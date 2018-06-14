import axios from 'axios';




export const signup = credentials => dispatch => {
	return axios.post('/auth/signup', { credentials })
				.then(user => {
					//set cookies and dispatch actions
					console.log('signup successful')
				}).then(data => {
					dispatch({type:"USER_SIGNED_UP", data:{}})
				})
}





export const signin_native = credentials => dispatch => {
	return axios.post('/auth/signin/native', { credentials })
				.then(user => {
					localStorage.PinterestCloneJWT = user.data.data.JWT;
					localStorage.PinterestCloneEmail = user.data.data.email;
					dispatch(userSignedIn_Native(user.data.data))
					return user
				})
}



export const userSignedIn_Native = (user) => {
	return ({
		type:"USER_SIGNED_IN",
		user
	})
}





export const signin_google = () => {
	axios.get('/auth/google').then(response => {
		console.log("RESPONSE: ", response)
		if (response.status === 200) {
			window.location = response.data.url
		}
	})
}

export const signin_google_redirect = code => dispatch => {
	return axios.post('/auth/google/redirect', {code:code}).then(response => {
		console.log("RESPONSE: ", response)
	}).then(data => {
		dispatch({type:'LOGIN_GOOGLE', data:{}})
	})
}

export const resetPasswordRequestEmail = credentials => {
	axios.post('/auth/resetpasswordrequestemail', {credentials})
}

export const resetPassword = credentials => {
	return axios.post('/auth/resetpassword', {credentials})
}

export const changePassword = credentials => {
	return axios.post('auth/changepassword', { credentials })
}
//export const signin_github