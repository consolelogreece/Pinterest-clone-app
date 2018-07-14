import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import rootreducer from './rootreducer'

import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { checkLoggedIn_GetData } from './actions/auth' 

import "semantic-ui-css/semantic.min.css"

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

const store = createStore(rootreducer, initialState, composeWithDevTools(applyMiddleware(thunk)))
if (localStorage.userdata) {
	const data = JSON.parse(localStorage.getItem("userdata"))
	store.dispatch({
		type:"SAVE_PREVIOUS_INSTANCE_USERNAME_TO_STORE", 
		userdata: data
	})
}

checkLoggedIn_GetData().then(response => {
	if (response.data.isAuthenticated) {
		store.dispatch({type:"USER_SIGNED_IN", user:response.data.data})
	}

}).catch(err => {
	console.log(err);
	localStorage.clear();
})

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Route component={App}/>
		</Router>
	</Provider>
	, 
	document.getElementById('root'));


					
			