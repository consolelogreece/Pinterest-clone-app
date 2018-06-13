import { isCorrectPassword, generateJWT, validateSigninCredentials } from './authentication'

const Signin = async (req, databaseObject) => {
	
	// validateSigninCredentials function returns 'false' if the credentials are valid. 
	//This will only trigger if the user alters the code client side, as there is client side validation. Thus there is no need for a more in depth error message.
	if (validateSigninCredentials(req.body.credentials)) return {type:"general", message:"something went wrong", code:400, data:null, errors:{general:"Invalid credentials"}}

	const { password, email } = req.body.credentials
	
	const db = databaseObject.db(process.env.MONGO_DATABASE);       		// get database
    const collection = db.collection(process.env.MONGO_COLLECTION_USERS);  	// get collection

	let userData = await collection.findOne({email:email}) // check if email exists

	if (!userData) return {type:"general", message:"Invalid credentials", code:400, data:null, errors:{general:"Invalid credentials"}} // if email doesnt exist, send error to client
	
	const isValidPassword = await isCorrectPassword(password, userData.passwordHash) // check password is valid

	if (!isValidPassword) return {type:"general", message:"Invalid credentials", code:400, data:null, errors:{general:"Invalid credentials"}} // if password invalid, send error to client

	const generatedJWT = await generateJWT(email) // generate jwt

	return {type:"success", data:{email:email, JWT:generatedJWT, going:userData.going}, message:"Signin successful", code:200, errors:null} // return send jwt to client
	
}

export default Signin