import React from 'react';
import {Icon} from 'semantic-ui-react';
import styles from './search-result-template-style.css'
import {Link} from 'react-router-dom';

const followingtemplate = props => {
  if (props.isNotResult) {
    return (
       <div key="NOT-RESULT-TEXT" id="search-result-entry">
        <div className="NOT-RESULT-TEXT">
          {props.link ?  <h4><Link className="VIEW-ALL" onClick={() => props.clearSearch()} to={props.link}>{props.text}</Link></h4>
                      :  <h4 className="NO-RESULTS">{props.text}</h4>
          }
         
        </div>
      </div>
    )

  } else {

    return (
        <div key={props.data._id} id="search-result-entry">
          <div className="search-result-entry-picture-container">
            <img alt="User's display pic" className="search-result-entry-picture" src={props.data.profile.picture} onError={e => e.target.src='https://i.imgur.com/xRped5d.png'} />
          </div>

          <div className="search-result-entry-username-container">
            <h4 className="search-result-entry-username"><Link to={`/user?id=${props.data._id}`} onClick={() => props.clearSearch()} >{props.data.username}</Link></h4>
          </div>

          <div className="search-result-entry-bio-container">
            <h4 className="search-result-entry-username">{props.data.profile.bio}</h4>
          </div>
        </div>
    )
  }
}

export default followingtemplate;