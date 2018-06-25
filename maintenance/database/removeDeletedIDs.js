import { Post } from '../../models/post-model';
import { User } from '../../models/user-model';
const ObjectID = require('mongodb').ObjectID;

const removeDeletedIDs =(userdata) => {


	const id_List = userdata.likedPostIds.concat(userdata.sharedPostIds);

	return Post.find({_id: {$in:id_List}}).then(data => {
		// no need to reconnect to the database if the lengths are equal, as there are no 'deleted post ids'.
		if (data.length === id_List.length) {
			return false
		}

		const nonDeletedPosts = data.map(post => (post._id.toString()));

		// remove the IDs of posts that no longer exist.
		return User.update({_id:userdata._id}, 
			{
		    $pull: {
		        likedPostIds: {
		            $nin: nonDeletedPosts
		        },
		        sharedPostIds: {
		        	$nin: nonDeletedPosts
		        }
		    }
		}).then(() => true)

	})

}


export default removeDeletedIDs;
