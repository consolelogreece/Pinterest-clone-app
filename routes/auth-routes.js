import express from 'express';
import passport from 'passport';
import { google } from 'googleapis';
import keys from '../config/keys'
import Signup from '../auth/Signup';
import { User } from '../models/user-model';
import Resetpasswordrequestemail from '../auth/Resetpasswordrequestemail';
import Resetpassword from '../auth/Resetpassword';
import removeDeletedIDs from '../maintenance/database/removeDeletedIDs'

import { isCorrectPassword, generateHash, validateChangePassword } from '../auth/authentication';

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


//auth signup
router.post('/signup', (req, res) => {
	Signup(req, req.app.get("databaseObject")).then(response => {

						// create response based on the data returned by Signup function.
						res.status(response.code).json({type:response.type, message:response.message, data:response.data, errors:response.errors})
					})
				   .catch(err => {
				   		console.log("==================", err);
				   		// incase of unhandled error, return general error.
				   		res.status(400).json({type:"general", message:"Something went wrong"}
				   	)})
					
});



router.get('/checkAuth', (req, res) => {
	const data = req.user;
	if (data === undefined){
		res.status(200).json({isAuthenticated:false, data:null});
	} else {
		res.status(200).json({isAuthenticated:true, data:{userProfile: {username: data.username, bio:data.profile.bio, picture:data.profile.picture, followerscount:data.followersIds.length, followingcount:data.followingIds.length}, userId: data.id, platform:data.platform, username:data.username, postIds:data.postIds, likedPostIds:data.likedPostIds, sharedPostIds:data.sharedPostIds, followingIds:data.followingIds}, errors:null});
		
		// this checks to see if any posts which the user has liked/shared has been removed, and removes any that has.
		removeDeletedIDs(data)
	}
});





//auth logout
router.get('/logout', authCheck, (req, res) => {
	req.logout();
	res.status(200).json({type:'logout', message:'logout successful', data:null, errors:null});
});


//send password reset email
router.post('/resetpasswordrequestemail', (req, res) => {
	 Resetpasswordrequestemail(req,  req.app.get("databaseObject"),  req.app.get("transporterObject")).then(response => {
		res.status(200).end()
	})
	.catch(err => {
		console.log(err)
		res.status(400).end()
	})
})

//reset password using link sent in email
router.post('/resetpassword', (req, res) => {
	 Resetpassword(req, req.app.get("databaseObject")).then(response => {
		res.status(response.code).json({type:response.type, message:response.message, data:response.data, errors:response.errors})
	})
	.catch(err => {
		console.log(err)
		if (err.name === "TokenExpiredError") {
			res.status(400).json({type:'token', message:'Token expired, please request another.', data:null})
		} else {
			res.status(400).json({type:'general', message:'something went wrong', data:null})
		}
		
		
	})
})

router.post('/changepassword', authCheck, async (req, res) => {
	const data = req.user;
	const credentials = req.body.credentials;
	

	if (validateChangePassword(credentials)) {
		res.status(403).json({type:"general", message:"You are not authorized to perform this action", data:null, errors:{general:"Not authorized"}})
		return;
	} 

	const isValidPassword = await isCorrectPassword(credentials.currentpassword, data.passwordHash);

	if (!isValidPassword) {
		res.status(403).json({type:"general", message:"You are not authorized to perform this action", data:null, errors:{currentpassword:"Incorrect password"}}) 
		return;
	}

	const newPasswordHash = await generateHash(credentials.newpassword);

	User.updateOne({_id:data._id}, {$set: {passwordHash:newPasswordHash}}).then(data => {
	 	res.status(200).json({type:"general", message:"Password change successful", data:null, errors:null})
	}).catch(err => {
		console.log(err);
		res.status(400).json({type:'general', errors:{general:"something wen't wrong"}, message:'something went wrong', data:null})

	})


})

router.post("/signin/native", passport.authenticate('local'), (req, res) => {
	const data = req.user;
	res.status(200).json({type:'success', message:'Sign in successful', data:{userProfile: {username: data.username, bio:data.profile.bio, picture:data.profile.picture, followerscount:data.followersIds.length, followingcount:data.followingIds.length}, userId: data.id, platform:data.platform, username:data.username, postIds:data.postIds, likedPostIds:data.likedPostIds, sharedPostIds:data.sharedPostIds, followingIds:data.followingIds}, errors:null});

});


router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
	const data = req.user;
	res.status(200).json({type:'success', message:'Sign in successful', data:{userProfile: {username: data.username, bio:data.profile.bio, picture:data.profile.picture, followerscount:data.followersIds.length, followingcount:data.followingIds.length}, userId: data.id, platform:data.platform, username:data.username, postIds:data.postIds, likedPostIds:data.likedPostIds, sharedPostIds:data.sharedPostIds, followingIds:data.followingIds}, errors:null});
});


router.get('/google', passport.authenticate('google', {
	scope:['profile']
}))




export default router;

