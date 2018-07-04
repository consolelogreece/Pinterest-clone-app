import { combineReducers } from 'redux'
import user from './reducers/user'
import app from './reducers/app'


const initialState = {
	app:{
		renderNewPostPopup:false,
		currentPagePosts:{
			posts:[],
			username:'',
			userProfile:{},
			totalPosts:0
		}
	},
	user:{
		isAuthenticated:false
	}
}


const appReducer = combineReducers({
	user,
	app
})


const rootReducer = (state, action) => {
	if (action.type === 'USER_LOGGED_OUT') {
		state = initialState;
	}

	return appReducer(state, action)
}

export default rootReducer;

