export default (state = {}, action = {}) => {
	switch (action.type) {
		case "TOGGLE_POST_POPUP":
			return {...state, renderNewPostPopup: !state.renderNewPostPopup }
			break;

		case "RECEIVED_USER_POSTS":
			return {...state, userpostpageposts:action.data}
			break;
		case "DELETE_USER_POSTS_FROM_STORE":
			return {...state, userpostpageposts:[]}

		case "REMOVE_POST_FROM_USER_POST_PAGE":
			const newArray = state.userpostpageposts.posts.filter(post => post._id !== action.id);
			return {...state, userpostpageposts:{...state.userpostpageposts, posts:newArray}}	

		default: return state;
	}
}



