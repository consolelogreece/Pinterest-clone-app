export default (state = {}, action = {}) => {
	let newArray = [];
	switch (action.type) {
		case "TOGGLE_POST_POPUP":
			return {...state, renderNewPostPopup: !state.renderNewPostPopup }

		case "RECEIVED_PEOPLE":
		case "RECEIVED_FOLLOWING":
		case "RECEIVED_POSTS":
			if (!action.data) return {...state, currentPagePosts:{userProfile:{}, posts:[], totalposts:0}}; 
			return {...state, currentPagePosts:action.data}
			
		case "DELETE_POSTS_FROM_STORE":
			return {...state, currentPagePosts:{userProfile:{}, posts:[], totalposts:0}}

		case "REMOVE_USER_FROM_FOLLOWING":
		case "REMOVE_POST_FROM_USER_POST_PAGE":
			newArray = state.currentPagePosts.posts.filter(post => post._id !== action.id);
			return {...state, currentPagePosts:{...state.currentPagePosts, posts:newArray}}	

		case "RE_ADD_USER_TO_FOLLOWING": 
			return {...state, currentPagePosts:{...state.currentPagePosts, posts:[...state.currentPagePosts.posts, action.user]}}

		case "ADD_SEARCH_RESULTS_TO_STORE":
			return {...state, search:{...state.search, displaySearch:true, data:{...action.data}}}

		case "CLEAR_SEARCH_RESULTS": 	
			return {...state, search:{...state.search, displaySearch:false, data:{results:[], isMoreThanLimit:false}}}


		case "USER_LIKED_POST":
			newArray = incrementLikeOrShare(state.currentPagePosts.posts, action.id, "likes", 1);
			return {...state, currentPagePosts:{...state.currentPagePosts, posts:newArray}}


		case "USER_UNLIKED_POST":
			newArray = incrementLikeOrShare(state.currentPagePosts.posts, action.id, "likes", -1);
			return {...state, currentPagePosts:{...state.currentPagePosts, posts:newArray}}

		case "USER_SHARED_POST":
			newArray = incrementLikeOrShare(state.currentPagePosts.posts, action.id, "shares", 1);
			return {...state, currentPagePosts:{...state.currentPagePosts, posts:newArray}}
		
		case "USER_UNSHARED_POST":
			newArray = incrementLikeOrShare(state.currentPagePosts.posts, action.id, "shares", -1);
			return {...state, currentPagePosts:{...state.currentPagePosts, posts:newArray}}

		default: return state;
	}
}


const incrementLikeOrShare = (postArray, postId, type, inc) => {
	const newArray = postArray.map(post => {
		if (postId === post._id) {
			return {...post, [type]:post[type] + inc }
		}
		return post;
	})
	return newArray;
}




