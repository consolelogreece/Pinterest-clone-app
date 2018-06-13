import { generateResetPasswordJWT } from './authentication'
import resetEmailTemplate from '../email_templates/PasswordResetTemplate'

const ResetPassword = async (req, databaseObject, transporterObject) => {

	let userEmail = req.body.credentials.email

	const db = databaseObject.db(process.env.MONGO_DATABASE);       		// get database
    const collection = db.collection(process.env.MONGO_COLLECTION_USERS);  	// get collection

	let userData = await collection.findOne({email:userEmail}) // check if email exists

	if (!userData) return

	const resetHash = await generateResetPasswordJWT(userEmail, "1h")

	await collection.updateOne({email:userEmail}, {$set:{resetHash:resetHash}})

	const urlOrigin = req.headers['x-forwarded-host']


	//generate email object
	const generatedEmail = resetEmailTemplate(urlOrigin, userEmail, process.env.SMTP_SERVER_EMAIL, userData.username, resetHash)

	//send reset link
	return transporterObject.sendMail(generatedEmail)


	
}

export default ResetPassword

