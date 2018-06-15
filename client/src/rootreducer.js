import { combineReducers } from 'redux'
import user from './reducers/user'
import app from './reducers/app'

export default combineReducers({
	user,
	app
})