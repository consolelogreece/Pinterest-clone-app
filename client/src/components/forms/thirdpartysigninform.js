import {Button} from 'semantic-ui-react';
import React from 'react';

const thirdpartysigninform = props=> {
	return (
		<div>
			<a 
				href="http://localhost:8080/auth/google" 
				style={{    
					display: "block",
				    width: "180px",
				    height: "40px",
				    background: "#4E9CAF",
				    padding: "10px",
				    textAlign: "center",
				    borderRadius: "5px",
				    color: "white",
				    fontWeight: "bold",
				    backgroundColor:"#d15559", 
				    color:"#fff"
				}}
			>
				Sign in with Google+
			</a>
		</div>
	)
}

export default thirdpartysigninform;