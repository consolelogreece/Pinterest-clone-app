import React from 'react'

const ErrorMessageInline = ({ text }) => {
	const color = "#b8514a"

	return (
		<span style={{color:color}}>
			{ text }
		</span>
	)

}

export default ErrorMessageInline