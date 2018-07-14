import express from 'express';
import path from 'path';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth-routes';
import appRoutes from './routes/app-routes';
import mongoClient from 'mongodb';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import LocalStrategy from 'passport-local';
import { User } from './models/user-model';
import { isCorrectPassword } from './auth/authentication';

dotenv.config();

const app = express();

///////////////////////////////////passport config/////////////////////
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
        callbackURL:'/auth/google/redirect',
        clientID:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET
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
                    }

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

/////////////////////////////////////////////////////////////////////




app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[process.env.COOKIE_SESSION_KEY],
    name:"sessionId",
    cookie:{
        httpOnly:true
    }
}));

//init passport

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URL);

let db;

mongoClient.connect(process.env.MONGO_URL, (err, database) => {
	if (err) throw err;

	db = database;
	
	app.set('databaseObject', db);
});


let smtpConfig = {
    host: process.env.SMTP_SERVER_NAME,
    port: process.env.SMTP_SERVER_PORT,
    connectionTimeout:3000,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
};

let transporter = nodemailer.createTransport(smtpConfig)

app.set("transporterObject", transporter)

app.use(helmet());

app.use(bodyParser.json());


//set up auth routes
app.use('/auth', authRoutes)

//set up app routes
app.use('/app', appRoutes)

app.use(express.static(__dirname + '/client/build'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})


const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Running on port " + port));