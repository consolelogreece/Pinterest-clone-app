import { isCorrectPassword, generateHash, verifyJWT, validateChangePassword } from './authentication'

const changePassword = async (req, databaseObject) => {

	const responseUnauthorized = ({type:"general", message:"You are not authorized to perform this action", code:400, data:null, errors:{general:"Not authorized"}})

	if (validateChangePassword(req.body.credentials)) return responseUnauthorized

	const { currentpassword, newpassword, token } = req.body.credentials

	const checkValidAndGetData = await verifyJWT(token, process.env.JWT_SECRET)

	if (!checkValidAndGetData) return responseUnauthorized

	const userEmail = checkValidAndGetData.email

	const db = databaseObject.db(process.env.MONGO_DATABASE);       					// get database
    const userCollection = db.collection(process.env.MONGO_COLLECTION_USERS);  			// get user collection

    const storedUserData = await userCollection.findOne({email:userEmail})

	const isValidPassword = await isCorrectPassword(currentpassword, storedUserData.passwordHash)

	if (!isValidPassword) return ({type:"general", message:"You are not authorized to perform this action", code:400, data:null, errors:{currentpassword:"Incorrect password"}}) 

	const newPasswordHash = await generateHash(newpassword)

	return userCollection.updateOne({email:userEmail}, {$set: {passwordHash:newPasswordHash}}).then(data => {
		return ({type:"general", message:"Password change successful", errors:null, code:200, data:null, errors:null})
	})


}
export default changePassword
