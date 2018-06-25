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

		case "USER_LIKED_POST":
			return {...state, likedPostIds:[...state.likedPostIds, action.id]}

		case "USER_UNLIKED_POST":
			const newLikedPostIdArray = state.likedPostIds.filter(id => id !== action.id);
			return {...state, likedPostIds:newLikedPostIdArray}

		case "USER_SHARED_POST":
			return {...state, sharedPostIds:[...state.sharedPostIds, action.id]}

		case "USER_UNSHARED_POST":
			const newSharedPostIdArray = state.sharedPostIds.filter(id => id !== action.id);
			return {...state, sharedPostIds:newSharedPostIdArray}

		case "USER_FOLLOWED":
			return {...state, followingIds:[...state.followingIds, action.id]}

		case "USER_UNFOLLOWED":
			const newFollowingIdArray = state.followingIds.filter(id => id !== action.id);
			return {...state, followingIds:newFollowingIdArray}

		// both of these reducers add an id to the postId array.
		case "UNDO_POST_DELETION":
		case "SUBMIT_POST":
			return {...state, postIds:[...state.postIds, action.id]}


		case "POST_DELETED": 
			const newPostIdArray = state.postIds.filter(id => id !== action.id);
			return {...state, postIds:newPostIdArray}	





		
		default: return state;
	}
}



