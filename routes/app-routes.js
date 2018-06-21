import express from 'express';
import { Post } from '../models/post-model';
import { User } from '../models/user-model';
const ObjectID = require('mongodb').ObjectID;

const router = express.Router();

//submit new post 
router.post('/newpost', (req, res) => {
	const data = req.user;
	const { title, imgurl } = req.body.data;
	if (data === undefined){
		res.status(400).json({type:'error', message:'You are not authorized to perform this action', data:null, errors:null})
	} else {
		const newid = new ObjectID(); // add this id to authors post id list.
		const addpost = new Post({_id:newid, authorId:data.id, title:title, imageUrl:imgurl, userLikeIds:[], userShareIds:[], creationDate: new Date}).save();
		const addPostIdToUser = User.update({_id:data.id}, {$push:{postIds:newid}})

		Promise.all([addpost, addPostIdToUser]).then(() => {
			res.status(200).json({type:'success', message:'Your post has been successfully created', data:null, errors:null})
		})
		.catch(err => {
			console.log(err);
			res.status(400).json({type:'error', message:'Something wen\'t wrong', data:null, errors:null})
		});

		
	}
})

router.get("/user", async (req, res) => {
	try {
		const id = req.query.id;
		const userPostsAndUsername = await User.findOne({_id:id}, {postIds:1, _id:0, username:1});
		const postDataArray = await Post.find({_id: {$in:userPostsAndUsername.postIds}})
		res.status(200).json({type:'success', message:'Posts successfully retreived', data:{username:userPostsAndUsername.username, posts:postDataArray}, errors:null})
	} catch (err) {
		console.log(err)
		res.status(400).json({type:'error', message:'Something wen\'t wrong', data:null, errors:null})
	}
	
});

export default router;