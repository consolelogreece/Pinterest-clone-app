export default (state = {}, action = {}) => {
	switch (action.type) {
		case "TOGGLE_POST_POPUP":
			return {...state, renderNewPostPopup: !state.renderNewPostPopup }
			break;
		case "SUBMIT_POST":
			console.log("SUBMIT_POST REDUCER TRIGGERED");
			return state;
			break;

		default: return state;
	}
}



