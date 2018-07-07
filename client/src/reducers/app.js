export default (state = {}, action = {}) => {
	switch (action.type) {
		case "TOGGLE_POST_POPUP":
			return {...state, renderNewPostPopup: !state.renderNewPostPopup }

		case "RECEIVED_FOLLOWING":
		case "RECEIVED_POSTS":
			if (!action.data) return {...state, currentPagePosts:{userProfile:{}, posts:[], totalposts:0}}; 
			return {...state, currentPagePosts:action.data}
			
		case "DELETE_POSTS_FROM_STORE":
			return {...state, currentPagePosts:{userProfile:{}, posts:[], totalposts:0}}

		case "REMOVE_USER_FROM_FOLLOWING":
		case "REMOVE_POST_FROM_USER_POST_PAGE":
			const newArray = state.currentPagePosts.posts.filter(post => post._id !== action.id);
			return {...state, currentPagePosts:{...state.currentPagePosts, posts:newArray}}	

		case "RE_ADD_USER_TO_FOLLOWING": 
			return {...state, currentPagePosts:{...state.currentPagePosts, posts:[...state.currentPagePosts.posts, action.user]}}

		case "ADD_SEARCH_RESULTS_TO_STORE":
			return {...state, search:{...state.search, displaySearch:true, data:{...action.data}}}

		case "CLEAR_SEARCH_RESULTS": 	
			return {...state, search:{...state.search, displaySearch:false, data:{results:[], isMoreThanLimit:false}}}





		default: return state;
	}
}



