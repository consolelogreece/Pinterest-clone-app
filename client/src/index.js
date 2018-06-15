import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import rootreducer from './rootreducer'

import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { userSignedIn_Native } from './actions/auth' 

import "semantic-ui-css/semantic.min.css"

const initialState = {
	app:{
		renderNewPostPopup:false
	}
	
}

const store = createStore(rootreducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

if (localStorage.PinterestCloneJWT) {
	const user = { JWT: localStorage.PinterestCloneJWT, email: localStorage.PinterestCloneEmail };
	store.dispatch(userSignedIn_Native(user));
}

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
	, 
	document.getElementById('root'));
registerServiceWorker();

					
			