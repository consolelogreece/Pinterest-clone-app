import { verifyJWT, validateResetPassword, generateHash } from './authentication'

const Resetpassword = async (req, databaseObject) => {

	const responseUnauthorized = ({type:"general", message:"You are not authorized to perform this action", code:400, data:null, errors:{general:"Not authorized"}})

	if (validateResetPassword(req.body.credentials)) return responseUnauthorized

	const { newPass, confirmPass, token } = req.body.credentials

	const checkValidAndGetData = await verifyJWT(token, process.env.JWT_RESET_SECRET)

	if (!checkValidAndGetData) return responseUnauthorized

	const userEmail = checkValidAndGetData.email

	const db = databaseObject.db(process.env.MONGO_DATABASE);       					// get database
    const userCollection = db.collection(process.env.MONGO_COLLECTION_USERS);  			// get user collection

    const storedUserData = userCollection.findOne({email:userEmail})

	const newPasswordHash =  generateHash(newPass)

	return Promise.all([storedUserData, newPasswordHash]).then(([storedUserData, newPasswordHash]) => {

		if (token !== storedUserData.resetHash) return ({type:"general", message:"Invalid token, please request another email.", code:400, data:null, errors:{general:"Not authorized"}})

		return userCollection.updateOne({email:userEmail}, {$set: {passwordHash:newPasswordHash, resetHash:null}}).then(data => {
			return ({type:"general", message:"Password reset successful", errors:null, code:200, data:null, errors:null})
		})

	})
	.catch(err => {
		return responseUnauthorized
	})

}

export default Resetpassword