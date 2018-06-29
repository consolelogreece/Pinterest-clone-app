import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
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
			username:'',
			totalPosts:0
		}
	},
	user:{
		isAuthenticated:false
	}
}

const store = createStore(rootreducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

checkLoggedIn_GetData().then(response => {
	if (response.data.isAuthenticated) {
		store.dispatch({type:"USER_SIGNED_IN", user:response.data.data})
	}

})

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Route component={App}/>
		</Router>
	</Provider>
	, 
	document.getElementById('root'));
registerServiceWorker();

					
			