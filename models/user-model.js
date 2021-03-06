import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username:String,
	email:String,
	passwordHash:String,
	platformId:String,
	platform:String,
	postIds:Array,
	likedPostIds:Array,
	sharedPostIds:Array,
	followingIds:Array,
	followersIds:Array,
	profile: {
		bio:String,
		picture:String
	}
});

UserSchema.index({username: "text"}, { default_language: "none" })

const User = mongoose.model('User', UserSchema);

export { User };