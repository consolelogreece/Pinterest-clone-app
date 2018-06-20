export default (state = {}, action = {}) => {
	switch (action.type) {
		case "USER_SIGNED_IN":
			return {...state, ...action.user, isAuthenticated:true}
			break;
		case "USER_SIGNED_OUT":
			return {app:{renderNewPostPopup:false}, user:{isAuthenticated:false}};	
			break;

		case "LOGIN_GOOGLE":
			return {...state, ...action.user, isAuthenticated:true}
		
		default: return state;
	}
}



