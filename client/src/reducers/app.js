export default (state = {}, action = {}) => {
	switch (action.type) {
		case "TOGGLE_POST_POPUP":
			return {...state, renderNewPostPopup: !state.renderNewPostPopup }
			break;
		case "SUBMIT_POST":
			return state;
			break;
		case "RECEIVED_USER_POSTS":
			return {...state, userpostpageposts:action.data}
			break;
		case "DELETE_USER_POSTS_FROM_STORE":
			return {...state, userpostpageposts:[]}


		default: return state;
	}
}



