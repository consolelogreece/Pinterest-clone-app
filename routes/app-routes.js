import express from 'express';
import { Post } from '../models/post-model';
import { User } from '../models/user-model';
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

	try {
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

	} catch (err) {
		console.log(err);
		res.status(400).json({type:'error', message:'Something wen\'t wrong', data:null, errors:null})
	}

		

		
	
})

router.get("/user", async (req, res) => {
	try {
		const id = req.query.id;
		const page = req.query.page
		const userPostsAndUsername = await User.findOne({_id:id}, {postIds:1, _id:0, username:1});

		// if user doesn't exist
		if (!userPostsAndUsername) {
			res.status(400).json({type:'error', message:'User doesn\'t exist', data:null, errors:null})
			return;
		}

		let skipCount = (function(pageLimit, totalPosts, pageno){
			let skip = pageLimit * page;

			if (skip > totalPosts) return (totalPosts - (totalPosts % pageLimit))
			return skip
		})(8, userPostsAndUsername.postIds.length, page);



		const postDataArray = await Post.find({_id: {$in:userPostsAndUsername.postIds}}).limit(8).skip(skipCount)


		res.status(200).json({type:'success', message:'Posts successfully retreived', data:{username:userPostsAndUsername.username, posts:postDataArray, totalPosts:userPostsAndUsername.postIds.length}, errors:null})
	} catch (err) {
		console.log(err)
		res.status(400).json({type:'error', message:'Something wen\'t wrong', data:null, errors:null})
	}
	
});



// Like/share/follow are essentially toggle switches. this helps minimise bugs/duplications //////////////////////////////////////////


router.post("/likepost", authCheck, (req, res) => {
	const postId = req.body.postId;
	const userdata = req.user;
	try{
		if (userdata.likedPostIds.indexOf(postId) === -1) {
			
				const addUserIdToPost = Post.updateOne({_id:postId}, {$push:{userLikeIds:userdata._id.toString()}})
				const addPostIdToUserLikes = User.update({_id:userdata.id}, {$push:{likedPostIds:postId}})
				Promise.all([addUserIdToPost, addPostIdToUserLikes]).then(() => {
					res.status(200).json({type:"success", message:"Post successfully liked", data:null, errors:null});
				}).catch(err => {
					console.warn(err)
					res.status(400).json({type:"failure", message:"Something wen't wrong", data:null, errors:null});
				});	
		} else {
				const removeUserIdFromPost = Post.updateOne({_id:postId}, {$pull:{userLikeIds:userdata._id}})
				const removedPostIdFromUserLikes = User.update({_id:userdata.id}, {$pull:{likedPostIds:postId}})
				Promise.all([removeUserIdFromPost, removedPostIdFromUserLikes]).then(() => {
					res.status(200).json({type:"success", message:"Post successfully unliked", data:null, errors:null});
				}).catch(err => {
					console.warn(err)
					res.status(400).json({type:"failure", message:"Something went wrong", data:null, errors:null});
				});
			
		}
	} catch (err) {
		console.warn(err)
		res.status(400).json({type:"failure", message:"Something wen't wrong", data:null, errors:null});
	}

});

router.post("/sharepost", authCheck,  (req, res) => {
	const postId = req.body.postId;
	const userdata = req.user;
	try{
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
				const removeUserIdFromPost = Post.updateOne({_id:postId}, {$pull:{userShareIds:userdata._id}})
				const removedPostIdFromUserShares = User.update({_id:userdata.id}, {$pull:{sharedPostIds:postId}})
				Promise.all([removeUserIdFromPost, removedPostIdFromUserShares]).then(() => {
					res.status(200).json({type:"success", message:"Post successfully unshared", data:null, errors:null});
				}).catch(err => {
					console.warn(err)
					res.status(400).json({type:"failure", message:"Something went wrong", data:null, errors:null});
				});
			
		}
	} catch (err) {
		console.warn(err)
		res.status(400).json({type:"failure", message:"Something wen't wrong", data:null, errors:null});
	}

});


router.post("/followuser", authCheck, (req, res) => {
	const userId = req.body.userId;
	const userdata = req.user;
	try{
		if (userdata.followingIds.indexOf(userId) === -1) {
			
			User.updateOne({_id:userdata._id}, {$push:{followingIds:userId}}).then(() => {
				res.status(200).json({type:"success", message:"User successfully follwed", data:null, errors:null});
			}).catch(err => {
				console.warn(err);
				res.status(400).json({type:"failure", message:"Something wen't wrong", data:null, errors:null});
			});

			
		} else {
			User.updateOne({_id:userdata._id}, {$pull:{followingIds:userId}}).then(() => {
				res.status(200).json({type:"success", message:"User successfully unfollwed", data:null, errors:null});
			}).catch(err => {
				console.warn(err);
				res.status(400).json({type:"failure", message:"Something wen't wrong", data:null, errors:null});
			});
			
		}
	} catch (err) {
		console.warn(err)
		res.status(400).json({type:"failure", message:"Something wen't wrong", data:null, errors:null});
	}

});

router.post("/deletepost", authCheck, (req, res) => {
	const postId = req.body.postId;
	const userdata = req.user;
	console.log(postId)
	try{

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

	} catch (err) {
		console.warn(err)
		res.status(400).json({type:"failure", message:"Something wen't wrong", data:null, errors:null});
	}

});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default router;