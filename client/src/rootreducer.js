import { combineReducers } from 'redux'
import user from './reducers/user'
import app from './reducers/app'


const initialState = {
	app:{
		renderNewPostPopup:false,
		currentPagePosts:{
			posts:[],
			userProfile:{
			},
			totalPosts:0
		},
		search:{
			data:{
				results:[],
				isMoreThanLimit:false

			},
			displaySearch:false
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
		localStorage.clear();
		state = initialState;
	}

	return appReducer(state, action)
}

export default rootReducer;

