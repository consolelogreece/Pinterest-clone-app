import React from 'react'

const SuccessMessageInline = ({ text }) => {
	const color = "#22962a"

	return (
		<span style={{color:color}}>
			{ text }
		</span>
	)

}

export default SuccessMessageInline