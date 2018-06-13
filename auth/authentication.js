import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import validator from 'validator'


export const generateHash = password => {
	const saltRounds = 10;
	return bcrypt.hash(password, saltRounds);
}


export const isCorrectPassword = (plainTextPassword, passwordHash) => {
	return bcrypt.compare(plainTextPassword, passwordHash)
}


export const generateJWT = email => {
	return new Promise((resolve, reject) => {
		jwt.sign({email:email}, process.env.JWT_SECRET, (err,jwt) => {
			if (jwt) resolve(jwt)
			else reject(false)
		})
	})
}

export const generateResetPasswordJWT = (email, expiration) => {
	return new Promise((resolve, reject) => {
		jwt.sign({email:email}, process.env.JWT_RESET_SECRET, { expiresIn: expiration }, (err,jwt) => {
			if (jwt) resolve(jwt)
			else reject(false)
		})
	})
}



export const verifyJWT = (token, secret) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secret, (err, data) => {
			if (err) reject (err)
			else resolve(data)

		})
	})
}




export const validateSignupCredentials = credentials => {

	let errors = {};
	let errorcount = 0;
	if (credentials.username === "") {errors.username = "Enter a valid username"; errorcount++}
	if (credentials.password === "") {errors.password = "Enter a valid password"; errorcount++}
	if (credentials.confirmpassword !== credentials.password) {errors.confirmpassword = "Passwords don't match"; errorcount++}
	if (!validator.isEmail(credentials.email)) {errors.email = "Enter a valid email"; errorcount++}

	if (errorcount === 0) return false
	else return errors

}


export const validateSigninCredentials = (credentials) => {
	let errors = {};
	let errorcount = 0;
	if (!validator.isEmail(credentials.email)) {errors.email = "Enter a valid email"; errorcount++}
	if (credentials.password === "") {errors.password = "Enter a valid password"; errorcount++}

	if (errorcount === 0) return false
	else return errors

}

export const validateChangePassword = (credentials) => {

	if (credentials.oldPass === "") return true
	if (credentials.newPass === "") return true
	if (credentials.confirmPass !== credentials.newPass) return true
	return false
}

export const validateResetPassword = credentials => {
	if (credentials.newPass === "") return true
	if (credentials.confirmPass !== credentials.newPass) return true
	return false
}