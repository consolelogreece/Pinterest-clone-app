import axios from 'axios';

export const signup = credentials => dispatch => {
	return axios.post('/auth/signup', { credentials })
				.then(user => {
					//set cookies and dispatch actions
				}).then(data => {
					dispatch({type:"USER_SIGNED_UP", data:{}})
				})
}


// Call this on initial web app load. As the cookie is http only, this checks if I have a valid cookie, and if I do, return the data.
export const checkLoggedIn_GetData = () => {
	return axios.get('/auth/checkAuth')
}

export const signin_native = credentials => dispatch => {
	return axios.post('/auth/signin/native',  credentials )
				.then(user => {
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
	return axios.get('/auth/google').then(response => {
		if (response.status === 200) {
			window.location = response.data.url
		}
	})
}

export const signin_google_redirect = code => dispatch => {
	return axios.get(`/auth/google/redirect?code=${code}`, {code:code}).then(response => {
		dispatch({type:'LOGIN_GOOGLE', user:response.data.data})
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

export const logout_google = () => dispatch => {
	return axios.get("/auth/google/logout")
		.then(user => {
			dispatch({type:"USER_LOGGED_OUT"})
		})
}


