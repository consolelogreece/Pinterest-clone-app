import {Button} from 'semantic-ui-react';
import React from 'react';
import {Link} from 'react-router-dom'

const thirdpartysigninform = props=> {
	return (
		<div>

			<Link 
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
			
				to="/auth/google"
				target="_self"
				>
					Sign in with Google+
			</Link>

		</div>
	)
}

export default thirdpartysigninform;