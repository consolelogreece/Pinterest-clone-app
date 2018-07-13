const template = (urlOrigin, emailTo, emailFrom, username, resetHash) => {
	const url = `https://console-log-reece-kinterest.herokuapp.com/resetpassword/page?token=${resetHash}`;

	let message = {
	    from: emailFrom,
	    to: emailTo,
	    subject: 'Pinterest clone app password reset request',
	    html: `
	    <div>
		    <h3>Hey, ${username}!</h3>
		    <div>
		    <p>
		    	Please use the following link to <a href=${url}>reset your password.</a>
		    </p>
		    <p>
		    	For security reasons, this link expires in 1 hour.
		    </p>
		    <p>
		    	If you didn't request this email, just ignore it.
		    </p>
		    <p>
		    	Please don't reply to this email.
		    </p>
		    </div>
	    </div>
	    	`
	};
	return message
}

export default template