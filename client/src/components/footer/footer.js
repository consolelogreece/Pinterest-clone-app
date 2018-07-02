import React from 'react';
import styles from './footer.css';
import { Icon } from 'semantic-ui-react';

const footer = () => {
	return(
		<div className="app-footer">
			<div className="footer-text-box">
				<h4>Produced by consolelogreece</h4>
				<a target ="_blank" rel="noopener noreferrer" href="https://github.com/consolelogreece/Pinterest-clone-app"><Icon name="github" className="github-button" size="big"/> </a>
			</div>
		</div>
	)
}

export default footer;