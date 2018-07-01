import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import LocalStrategy from 'passport-local';
import keys from './keys';
import { User } from '../models/user-model';
import { isCorrectPassword } from '../auth/authentication';

passport.serializeUser((user,done) => {
	done(null, user.id)
});

passport.deserializeUser((id,done) => {
	User.findById(id).then(user => {
		done(null, user)
	})
});

passport.use(
	new GoogleStrategy({
		// strategy options
		callbackURL:'http://localhost:3000/auth/google/redirect',
		clientID:keys.google.clientID,
		clientSecret:keys.google.clientSecret
	}, (accessToken, refreshToken, profile, done) => {

		//check if user exists already
		User.findOne({platform:'google', platformId:profile.id}).then((currentUser) => {
			//if true, user already in db
			if (currentUser){
				done(null, currentUser)
			} else {
				new User({
					username:profile.displayName,
					platformId:profile.id,
					platform:'google',
					postIds:[],
					likedPostIds:[],
					sharedPostIds:[],
					followingIds:[],
					followersIds:[],
					profile:{
						bio:"",
						picture:profile._json.image.url
					},
					nestatesta:"1212"

				}).save().then((newUser) => {
					done(null, newUser)
				})

			}
		});

		
	})
)



passport.use(
	new LocalStrategy({
		usernameField:'email',
		passwordField:'password'

	},
		(email, password, done) => {
			User.findOne({platform:'native', email:email}, async (err, user) => {
				if (err) return done(err);
				if (!user) return done(null, false);
				const isValidPassword = await isCorrectPassword(password, user.passwordHash);
				if (!isValidPassword) return done(null, false);
				return done(null, user);
			})
		}
	)
)

