import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFollowingList, unfollowAndRemoveFromFollowingPage} from '../../actions/appfunctions';
import FollowingTemplate from '../templates/following-template';
import {Icon} from 'semantic-ui-react';
import queryString from 'querystring';

class myfollowinglistpage extends Component {

 	populatePostArray = () => {
		let parsedUrlObject = queryString.parse(this.props.history.location.search)
		const page = parseInt(parsedUrlObject["?page"], 10) || 0;
		return this.props.getFollowingList(page).catch(() => this.props.history.push("/"))
	}

	handlePageChange = e => {

		let parsedUrlObject = queryString.parse(this.props.history.location.search)
		let page = parseInt(parsedUrlObject["?page"], 10) || 0;

		const pagepath = `${this.props.history.location.pathname}?page=`

		switch(e.target.id) {
		
			case "first":
				this.props.history.push(pagepath + "0");
				this.populatePostArray();
				break;
			case "prev":
				if (page !== 0) this.props.history.push(pagepath + (page - 1));
				this.populatePostArray();
				break;
			case "next":
				this.props.history.push(pagepath + (page + 1));
				this.populatePostArray();
				break;
			case "last":
				// 12 = total posts per page.
				this.props.history.push(pagepath + (Math.floor(this.props.totalPosts / 12)));
				this.populatePostArray();
				break;
			default:
				return;
		}
	}

	componentDidMount(){
		this.props.getFollowingList(0)
	}


	render(){

		const following = this.props.followinglist.map(following => {
			return <FollowingTemplate unfollow={this.props.unfollow} data={{...following}} />
		})
		return(
		<div>
			<h1>Following list</h1>
			{following}
				<div onClick={e => this.handlePageChange(e)} style={{ display:"flex", justifyContent:"center", margin:"auto"}}>			
					<Icon id="first" style={{color:"#d15559"}} size="huge" link={true} name="angle double left"/>
					<Icon id="prev" style={{color:"#d15559"}} size="huge" link={true} name="angle left"/>
					<Icon id="next" style={{color:"#d15559"}} size="huge" link={true} name="angle right"/>
					<Icon id="last" style={{color:"#d15559"}} size="huge" link={true} name="angle double right"/>
				</div>
		</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getFollowingList: page => {
			return dispatch(getFollowingList(page))
		},
		unfollow: (id, user)  => {
			dispatch(unfollowAndRemoveFromFollowingPage({id:id,user:user}))
		}
	}
}

const mapStateToProps = state => {
	return {
		followinglist:state.app.currentPagePosts.posts
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(myfollowinglistpage);