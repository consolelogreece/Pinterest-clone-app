import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Icon} from 'semantic-ui-react';
import { getPeople } from '../../actions/appfunctions'
import queryString from 'querystring';
import PeopleCard from '../templates/search-result-template';

class myfollowinglistpage extends Component {

 		populatePostArray = () => {

		let parsedUrlObject = queryString.parse(this.props.history.location.search)

		// redirect to search if no Id provided
		if (!Object.prototype.hasOwnProperty.call(parsedUrlObject, '?q')) {
			this.props.history.push("/")
		} 
		else {
			const page = parseInt(parsedUrlObject["page"], 10) || 0;
			
			return this.props.getPeople(parsedUrlObject['?q'], page).catch(() => this.props.history.push("/"))
		}
	}

	handlePageChange = e => {

		let parsedUrlObject = queryString.parse(this.props.history.location.search)
		let page = parseInt(parsedUrlObject["page"], 10) || 0;

		if (!Object.prototype.hasOwnProperty.call(parsedUrlObject, '?q')) {
			this.props.history.push("/")
		} 

		const pagepath = `${this.props.history.location.pathname}?q=${parsedUrlObject['?q']}&page=`

		switch(e.target.id) {
		
			case "first":
				this.props.history.push(pagepath + "0");
				break;
			case "prev":
				if (page !== 0) this.props.history.push(pagepath + (page - 1));
				break;
			case "next":
				this.props.history.push(pagepath + (page + 1));
				break;
			case "last":
				// 12 = total posts per page.
				this.props.history.push(pagepath + (Math.floor(this.props.totalPosts / 12)));
				break;
			default:
				break;

			
		}
		this.populatePostArray();
	}

	componentDidMount(){
		this.populatePostArray();
	}





	render(){

		const people = this.props.followinglist.map(following => {
			return <PeopleCard unfollow={this.props.unfollow} data={{...following}} />
		})

		return (
			<div>
				<h1>People</h1>
					{people}
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
		getPeople: (searchQuery, page) => {
			return dispatch(getPeople(searchQuery, page))
		}
	}
}

const mapStateToProps = state => {
	return {
		followinglist:state.app.currentPagePosts.posts,
		totalPosts:state.app.currentPagePosts.totalPosts
	}
}





export default connect(mapStateToProps, mapDispatchToProps)(myfollowinglistpage);
