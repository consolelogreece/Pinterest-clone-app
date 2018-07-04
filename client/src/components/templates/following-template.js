import React from 'react';
import {Icon} from 'semantic-ui-react';
import styles from './following-template-style.css'

const followingtemplate = props => {

	return (
      <div key={props._id} id="following-entry">
        <div className="entry-picture-container">
          <img alt="User's display pic" className="entry-picture" src={props.data.profile.picture} onError={e => e.target.src='https://i.imgur.com/xRped5d.png'} />
        </div>

        <div className="entry-username-container">
          <h4 className="entry-username">{props.data.username}</h4>
        </div>

        <div className="entry-bio-container">
          <h4 className="entry-bio">{props.data.profile.bio}</h4>
        </div>

        <div className="action-buttons-container">
          <Icon size="huge" link={true} name="close" onClick={() => props.unfollow(props.data._id, props.data)} />
        </div> 
      </div>
	)
}

export default followingtemplate;