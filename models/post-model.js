import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	authorId:String,
	title:String,
	imageUrl:String,
	userLikeIds:Array,
	userShareIds:Array,
	creationDate:Date
});

const Post = mongoose.model('post', PostSchema);

export { Post };