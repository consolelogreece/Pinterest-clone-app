import {Button} from 'semantic-ui-react';
import React from 'react';

const thirdpartysigninform = () => {
	return (
		<div>
			<form action="http://localhost:8080/auth/google">
				<Button style={{backgroundColor:"#d15559", color:"#fff"}}>Sign in with Google+</Button>
			</form>
		</div>
	)
}

export default thirdpartysigninform;