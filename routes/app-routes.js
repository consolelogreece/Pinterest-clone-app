import express from 'express';
import { Post } from '../models/post-model';
import { User } from '../models/user-model';
import validator from 'validator';
import getSkipCount from '../utils/getSkipCount'

const ObjectID = require('mongodb').ObjectID;

const router = express.Router();

const authCheck = (req, res, next) => {
	if (!req.user){
		//if user not logged in
		res.status(401).json({type:'error', message:'You are not authorized to perform this action', data:null, errors:null});
	} else {
		// if logged in
		next();
	}
};


//submit new post 
router.post('/newpost', authCheck, (req, res) => {
	const data = req.user;
	const { title, imgurl } = req.body.data;

	if (title.length > 100 || !validator.isURL(imgurl) || imgurl.length > 200 ){
		res.status(400).json({type:'error', message:'Something wen\'t wrong', data:null, errors:null});
		return;
	}   

	const newid = new ObjectID(); // add this id to authors post id list.
	const addpost = new Post({_id:newid, authorUsername:data.username, authorId:data.id, title:title, imageUrl:imgurl, userLikeIds:[], userShareIds:[], creationDate: new Date}).save();
	const addPostIdToUser = User.update({_id:data.id}, {$push:{postIds:{$each:[newid.toString()], $position:0}}})


	Promise.all([addpost, addPostIdToUser]).then(() => {
		res.status(200).json({type:'success', message:'Your post has been successfully created', data:{postId:newid}, errors:null})
	})
	.catch(err => {
		console.log(err);
		res.status(400).json({type:'error', message:'Something wen\'t wrong', data:null, errors:null})
	});
})

router.get("/user", async (req, res) => {

	try {
		const pageLimit = 12;
		const id = req.query.id;
		const page = req.query.page || 0;
		const userPostsAndUsername = await User.findOne({_id:id}, {postIds:1, _id:0, username:1, profile:1, followingIds:1, followersIds:1});

		// if user doesn't exist
		if (!userPostsAndUsername) {
			res.status(400).json({type:'error', message:'User doesn\'t exist', data:null, errors:null})
			return;
		}

		let skipCount = getSkipCount(pageLimit, userPostsAndUsername.postIds.length, page);

		const posts = await Post.find({_id: {$in:userPostsAndUsername.postIds}}).sort({creationDate:-1}).limit(pageLimit).skip(skipCount)

		const postReturnArray = posts.map(post => {
			return {
				likes:post.userLikeIds.length, 
				shares:post.userShareIds.length,
				_id:post._id,
				authorUsername:post.authorUsername,
				authorId:post.authorId,
				title:post.title,
				imageUrl:post.imageUrl,
				creationDate:post.creationDate
			}
		})


		res.status(200).json({type:'success', message:'Posts successfully retreived', data:{userProfile:{ username: userPostsAndUsername.username,  bio:userPostsAndUsername.profile.bio, picture:userPostsAndUsername.profile.picture,  followingcount:userPostsAndUsername.followingIds.length, followerscount:userPostsAndUsername.followersIds.length }, posts:postReturnArray, totalPosts:userPostsAndUsername.postIds.length}, errors:null})

	} catch (err) {
		console.warn(err);
		res.status(400).json({type:'error', message:'Something wen\'t wrong', data:null, errors:null})
	}
	

});

router.get("/feed", authCheck,  async (req, res) => {
	try {

		const pageLimit = 12;
		const page = req.query.page || 0;
		const data = req.user;

		const userFollowingData = await User.find({_id:{$in:data.followingIds}})

		let allIds = [];

		for (let i = 0; i < userFollowingData.length; i++){
			allIds = allIds.concat([...userFollowingData[i].postIds, ...userFollowingData[i].sharedPostIds])
		}

		const uniqueIdArray =  allIds.filter((item, pos, ar) => ar.indexOf(item) === pos);

		const skipCount = getSkipCount(pageLimit, allIds.size, page);

		const posts = await Post.find({_id:{$in:allIds}}).sort({creationDate:-1}).limit(pageLimit).skip(skipCount);

		const postReturnArray = posts.map(post => {
			return {
				likes:post.userLikeIds.length, 
				shares:post.userShareIds.length,
				_id:post._id,
				authorUsername:post.authorUsername,
				authorId:post.authorId,
				title:post.title,
				imageUrl:post.imageUrl,
				creationDate:post.creationDate
			}
		})

		res.status(200).json({type:'success', message:'Feed successfully retreived', data:{userProfile:{}, posts:postReturnArray, totalPosts:uniqueIdArray.length}, errors:null})


	} catch (err){
		console.warn(err)
		res.status(400).json({type:"failure", message:"Something wen't wrong", data:null, errors:null});
	}
	
});


router.post("/editprofile", authCheck, (req, res) => {
	const profile = req.body.new_profile
	const user_id = req.user._id

	if (profile.bio.length > 100 || (!validator.isURL(profile.picture) && profile.picture.length > 0)){
		res.status(400).json({type:'error', message:'Something wen\'t wrong', data:null, errors:null});
		return;
	}   

	User.updateOne({_id:user_id}, {$set:{profile:{bio:profile.bio, picture:profile.picture}}}).then(()=>{
		res.status(200).json({type:"success", message:"Profile changed successfully", data:null, errors:null})
	}).catch(err => {
		console.log(err);
		res.status(400).json({type:'error', message:'Something wen\'t wrong', data:null, errors:null})
	})

})


// Like/share/follow are essentially toggle switches. this helps minimise bugs/duplications //////////////////////////////////////////


router.post("/likepost", authCheck, (req, res) => {
	const postId = req.body.postId;
	const userdata = req.user;

	if (userdata.likedPostIds.indexOf(postId) === -1) {

		if (!ObjectID.isValid(postId)) {
			res.status(400).json({type:"failure", message:"Invalid user Id", data:null, errors:null});
			return
		}
		
		const addUserIdToPost = Post.updateOne({_id:postId}, {$push:{userLikeIds:userdata._id.toString()}})
		const addPostIdToUserLikes = User.update({_id:userdata.id}, {$push:{likedPostIds:postId}})
		Promise.all([addUserIdToPost, addPostIdToUserLikes]).then(() => {
			res.status(200).json({type:"success", message:"Post successfully liked", data:null, errors:null});
		}).catch(err => {
			console.warn(err)
			res.status(400).json({type:"failure", message:"Something wen't wrong", data:null, errors:null});
		});	

	} else {

		const removeUserIdFromPost = Post.updateOne({_id:postId}, {$pull:{userLikeIds:userdata._id.toString()}})
		const removedPostIdFromUserLikes = User.update({_id:userdata.id}, {$pull:{likedPostIds:postId}})
		Promise.all([removeUserIdFromPost, removedPostIdFromUserLikes]).then(() => {
			res.status(200).json({type:"success", message:"Post successfully unliked", data:null, errors:null});
		}).catch(err => {
			console.warn(err)
			res.status(400).json({type:"failure", message:"Something went wrong", data:null, errors:null});
		});
	
	}


});

router.post("/sharepost", authCheck,  (req, res) => {
	const postId = req.body.postId;
	const userdata = req.user;

	if (!ObjectID.isValid(postId)) {
		res.status(400).json({type:"failure", message:"Invalid user Id", data:null, errors:null});
		return
	}

	if (userdata.sharedPostIds.indexOf(postId) === -1) {
		
		const addUserIdToPost = Post.updateOne({_id:postId}, {$push:{userShareIds:userdata._id.toString()}})
		const addPostIdToUserShare = User.update({_id:userdata.id}, {$push:{sharedPostIds:postId}})

		Promise.all([addUserIdToPost, addPostIdToUserShare]).then(() => {
			res.status(200).json({type:"success", message:"Post successfully shared", data:null, errors:null});
		}).catch(err => {
			console.warn(err)
			res.status(400).json({type:"failure", message:"Something wen't wrong", data:null, errors:null});
		});	
	} else {
		const removeUserIdFromPost = Post.updateOne({_id:postId}, {$pull:{userShareIds:userdata._id.toString()}})
		const removedPostIdFromUserShares = User.update({_id:userdata.id}, {$pull:{sharedPostIds:postId}})
		Promise.all([removeUserIdFromPost, removedPostIdFromUserShares]).then(() => {
			res.status(200).json({type:"success", message:"Post successfully unshared", data:null, errors:null});
		}).catch(err => {
			console.warn(err)
			res.status(400).json({type:"failure", message:"Something went wrong", data:null, errors:null});
		});
	
	}

});



router.post("/followuser", authCheck, (req, res) => {
	const userId = req.body.userId;
	const userdata = req.user;


	if (!ObjectID.isValid(userId)) {
		res.status(400).json({type:"failure", message:"Invalid user Id", data:null, errors:null});
		return
	}


	if (userdata.followingIds.indexOf(userId) === -1) {
		
		// add the id of the person the user wants to follow, to their 'followingIds array
		const addUserIdToFollowing = User.updateOne({_id:userdata._id}, {$push:{followingIds:userId}})

		// add the id of of the user to the person they want to follow's 'following' array
		const addUserIdToFollowers = User.updateOne({_id:userId}, {$push:{followersIds:userdata._id.toString()}})

		Promise.all([addUserIdToFollowing, addUserIdToFollowers]).then(() => {
			res.status(200).json({type:"success", message:"User successfully follwed", data:null, errors:null});
		}).catch(err => {
			console.warn(err);
			res.status(400).json({type:"failure", message:"Something wen't wrong", data:null, errors:null});
		});

		
	} else {
		// remove the id of the person the user wants to follow, to their 'followingIds array
		const removeUserIdFromFollowing = User.updateOne({_id:userdata._id}, {$pull:{followingIds:userId}})
		// remove the id of the user to the person they want to follow's 'following' array
		const removeUserIdInFollowers = User.updateOne({_id:userId}, {$pull:{followersIds:userdata._id.toString()}})
		
		Promise.all([removeUserIdFromFollowing, removeUserIdInFollowers]).then(() => {
			res.status(200).json({type:"success", message:"User successfully unfollwed", data:null, errors:null});
		}).catch(err => {
			console.warn(err);
			res.status(400).json({type:"failure", message:"Something wen't wrong", data:null, errors:null});
		});
		
	}


});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


router.get("/getfollowinglist", authCheck, async (req, res) => {

	try {
		const pageLimit = 12;
		const userdata = req.user;
		const page = req.query.page || 0;
		const totalFollowing = userdata.followingIds.length

		let skipCount = getSkipCount(pageLimit, totalFollowing, page);

		const userFollowingDetails = await User.find({_id:{$in:userdata.followingIds}}, { _id:1, username:1, profile:1}).limit(pageLimit).skip(skipCount)

		res.status(200).json({type:'success', message:'Following successfully retreived', data:{posts:userFollowingDetails, userProfile:{}, totalPosts:totalFollowing}, errors:null})

	} catch (err) {
		console.warn(err);
		res.status(400).json({type:"failure", message:"Something wen't wrong", data:null, errors:null});
	}

})


router.post("/deletepost", authCheck, (req, res) => {
	const postId = req.body.postId;
	const userdata = req.user;

	// remove post id from the user's "postIds" array.
	const removeIdFromPostArray = User.updateOne({_id:userdata._id}, {$pull:{postIds:postId}})

	// remove post. Both id's are important, as this ensures the post will only be deleted if it belongs to the requesting user.
	const removePost = Post.deleteOne({_id:postId, authorId:userdata._id});

	Promise.all([removeIdFromPostArray, removePost]).then(() => {
		res.status(200).json({type:"success", message:"Post successfully deleted", data:null, errors:null})
	}).catch(err => {
		console.warn(err)
		res.status(400).json({type:"failure", message:"Something wen't wrong", data:null, errors:null});
	})
});

router.get("/searchbar", (req, res) => {

	let searchQuery = req.query.q;
	
	User.find({$text:{$search:searchQuery}}, {_id:1, username:1, profile:1, score:{$meta:"textScore"}}).sort({score:{$meta:"textScore"}}).limit(8).then(results => {
		let returnResults = results;
		let isMoreThanLimit = false;
		if (results.length === 8) {
			returnResults = returnResults.splice(0, 7)
			isMoreThanLimit = true
		}
		res.json({results:{results:returnResults, isMoreThanLimit:isMoreThanLimit}})

	}).catch(err => {
		console.warn(err)
		res.status(400).json({type:"failure", message:"Something wen't wrong", data:null, errors:null});
	})
})

router.get("/search",  async (req, res) => {

	const pageLimit = 12;
	const page = req.query.page || 0;
	const searchQuery = req.query.q;

	if (searchQuery == "") {
		res.status(400).json({type:"failure", message:"Please provide a search query.", data:null, errors:null});
		return;
	}

	try{

		let totalNumberOfSearchResults = await User.countDocuments({$text:{$search:searchQuery}});

		let skipCount = getSkipCount(pageLimit, totalNumberOfSearchResults, page);

		let searchResults = await User.find({$text:{$search:searchQuery}}, {_id:1, username:1, profile:1, score:{$meta:"textScore"}}).sort({score:{$meta:"textScore"}}).limit(pageLimit).skip(skipCount)

		res.status(200).json({type:'success', message:'Search successfull', data:{posts: searchResults, userProfile:{}, totalPosts:totalNumberOfSearchResults}, errors:null})

	} catch(err) {

		console.warn(err);

		res.status(400).json({type:"failure", message:"Something wen't wrong", data:null, errors:null});
	}

})


export default router;
