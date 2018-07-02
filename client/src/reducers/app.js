export default (state = {}, action = {}) => {
	switch (action.type) {
		case "TOGGLE_POST_POPUP":
			return {...state, renderNewPostPopup: !state.renderNewPostPopup }

		case "RECEIVED_POSTS":
			if (!action.data) return {...state, currentPagePosts:{userProfile:{}, posts:[], totalposts:0}}; 
			return {...state, currentPagePosts:action.data}
			
		case "DELETE_POSTS_FROM_STORE":
			return {...state, currentPagePosts:{userProfile:{}, posts:[], totalposts:0}}

		case "REMOVE_POST_FROM_USER_POST_PAGE":
			const newArray = state.currentPagePosts.posts.filter(post => post._id !== action.id);
			return {...state, currentPagePosts:{...state.currentPagePosts, posts:newArray}}	

		default: return state;
	}
}



