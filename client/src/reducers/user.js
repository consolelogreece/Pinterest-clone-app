export default (state = {}, action = {}) => {
	switch (action.type) {
		case "USER_SIGNED_IN":
			console.log(action)
			return {...state, token: action.user.JWT, email:action.user.email }
			break;
		
		default: return state;
	}
}



