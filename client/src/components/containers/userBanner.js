import React from 'react';
import styles from './userBannerStyle.css'

const userBanner = props => {
	return (

		<div>
			<div className="banner-wrapper--mobile">
			  <div className="banner--mobile">

			    <div className="pic-box--mobile">
			      <img alt="User's display pic" onError={e => e.target.src='https://i.imgur.com/xRped5d.png'} className="picture-element--mobile" src={!props.userProfile.picture ? "https://i.imgur.com/xRped5d.png" : props.userProfile.picture} />
			    </div>

			    <div className="info-box--mobile">
			        <h2 id="username--mobile" className="stat-element--mobile">
			          {props.userProfile.username}
			        </h2>		      
			      <div className="stat-box--mobile">

			        <h2 id="followers--mobile" className="stat-element--mobile">
			          Followers: {props.userProfile.followerscount}
			        </h2>

			        <h2 id="following--mobile" className="stat-element--mobile">
			          Following: {props.userProfile.followingcount}
			        </h2>        
			      </div>
			      <div className="bio-element--mobile">
			        <h3>{typeof props.userProfile.bio === 'string' ? (props.userProfile.bio.length === 0 ? "User has not provided a bio." : props.userProfile.bio) : "Loading..."}</h3>
			      </div>
			    </div>
			  </div>
			</div>
			<div className="banner-wrapper">
			  <div className="banner">

			    <div className="pic-box">
			      <img alt="User's display pic" onError={e => e.target.src='https://i.imgur.com/xRped5d.png'} className="picture-element" src={!props.userProfile.picture ? "https://i.imgur.com/xRped5d.png" : props.userProfile.picture} />
			    </div>

			    <div className="info-box">
			      <div className="stat-box">
			        <h2 id="username" className="stat-element">
			          {props.userProfile.username}
			        </h2>
			        <h2 id="followers" className="stat-element">
			          Followers: {props.userProfile.followerscount}
			          </h2>
			        <h2 id="following" className="stat-element">
			          Following: {props.userProfile.followingcount}
			        </h2>
			      </div>
			      <div className="bio-element">
			        <h3>{typeof props.userProfile.bio === 'string' ? (props.userProfile.bio.length === 0 ? "User has not provided a bio." : props.userProfile.bio) : "Loading..."}</h3>
			      </div>
			    </div>
			  </div>
			</div>
		</div>
	)
}

export default userBanner;