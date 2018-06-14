import express from 'express';
import passport from 'passport';
import { google } from 'googleapis';
import keys from '../config/keys'
import Signup from '../auth/Signup'
import Signin from '../auth/Signin'
import Resetpasswordrequestemail from '../auth/Resetpasswordrequestemail';
import Resetpassword from '../auth/Resetpassword';
import Changepassword from '../auth/Changepassword'

const router = express.Router();



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




router.post("/signin/native", (req, res) => {
	Signin(req, req.app.get("databaseObject")).then(response => {
		res.status(response.code).json({type:response.type, message:response.message, data:response.data, errors:response.errors})
	}).catch(err => {
	 	// in case of unhandled error, return generic error message
		console.log(err)
		res.status(400).json({type:'general', message:'something went wrong', data:null})
	}) 
});



//auth logout
router.get('/logout', (req, res) => {
	//handle with passportjs
	res.send("logging out")
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

//change password
router.post('/changepassword', (req, res) => {
	Changepassword(req, req.app.get("databaseObject")).then(response => {
		res.status(response.code).json({type:response.type, message:response.message, data:response.data, errors:response.errors})
	})
	.catch(err => {
		console.log(err)
		res.status(400).json({type:'general', message:'something went wrong', data:null})
	})
})

export default router;














// router.get('/google/redirect', (req, res) => {
// 	console.log("redirected")
// });


// router.get('/google', passport.authenticate('google', {
// 	scope:['profile']
// }))


// //auth with github
// router.get('/github', (req, res) => {
// 	//handle with passportjs
// 	res.send("logging in with github")
// })




// const oauth2Client = new google.auth.OAuth2(
// 	keys.google.clientID,
// 	keys.google.clientSecret,
// 	'http://localhost:3000/auth/google/redirect'
// );

// const googleScopes = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']

// const googleAuthUrl = oauth2Client.generateAuthUrl({scope:googleScopes});
// router.post('/google/redirect', async (req, res) => {
// 	res.end();
// 	const code = req.body.code;
// 	const { tokens } = await oauth2Client.getToken(code);
// 	oauth2Client.setCredentials(tokens);
	
// })

// router.get('/google', (req, res) => {
// 	res.json({url:googleAuthUrl})
// })