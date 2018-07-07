import React from 'react';
import {Icon} from 'semantic-ui-react';
import styles from './following-template-style.css';
import {Link} from 'react-router-dom'

const followingtemplate = props => {

	return (
      <div style={{padding:'2px 2px 1px 2px'}} key={props.data._id} id="following-entry">
        <div className="entry-picture-container">
          <img alt="User's display pic" className="entry-picture" src={props.data.profile.picture} onError={e => e.target.src='https://i.imgur.com/xRped5d.png'} />
        </div>

        <div className="entry-username-container">
          <h4 className="entry-username"><Link to={`/user?id=${props.data._id}`}>{props.data.username}</Link></h4>
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