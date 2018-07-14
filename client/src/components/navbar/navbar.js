import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Icon, Input} from 'semantic-ui-react';
import SearchResultTemplate from '../templates/search-result-template';

import './navbar.css' ;

class navbar extends Component {
	constructor(){
		super()
		this.state={
			isMenuOpen:false,
			style:{
				height:"0px",
				padding:"0px",
				visibility:"hidden",
				fontSize:"0px",
				border:"0px",
				margin:"0px"
			},
			searchquery:""
		
		}

	}

	toggleMenu = () => {
		if (!this.state.isMenuOpen) {
			this.setState({isMenuOpen: true, style:{height:"50px", padding: '15px 0px 10px 0px', visibility:"visible", fontSize:"1em"}})
		} else {
			this.setState({isMenuOpen: false, style:{height:"0px", border:"0px", margin:"0px", padding:"0px", visibility:"hidden", fontSize:"0px"}})
		}
	}

	handleChange = e => {
		this.setState({...this.state, searchquery:e.target.value}, () => {
			if (this.state.searchquery === "") {
				this.clearSearch()
			} else {
				this.submitSearchQuery();
			}
		});
	}

	clearSearch = () => {
		this.setState({searchquery:""});
		this.props.clearSearchResults();
	}

	// creates what to display on search bar
	createSearchDisplay = searchQueryResults => {
		const display = searchQueryResults.results.map(result => {
			return <SearchResultTemplate clearSearch={this.clearSearch} data={{...result}} />
		})

		if (display.length === 0 ) display.push(<SearchResultTemplate clearSearch={this.clearSearch} text="No results found..." link={null} isNotResult={true} />)

		if (searchQueryResults.isMoreThanLimit) display.push(display.push(<SearchResultTemplate clearSearch={this.clearSearch} text="View all" link={"/people?q=" + this.state.searchquery} isNotResult={true} />))

		return display;
	}

	


	submitSearchQuery = debounce(() => {
		this.props.searchQuery(this.state.searchquery).then(() => {
			//quick check to see if search query is empty, if it is, remove results provided by search query
			if (this.state.searchquery === "") this.props.clearSearchResults();
		}).catch(() => {
			console.log("error in searchquery")
		})
	}, 250);



	render(){

		let searchDisplay = this.createSearchDisplay(this.props.search.data);

		return (
			<div>


				<div className="app-header">
					<div className="app-header-text-container">
						<h2 className="app-header-text">K i n t e r e s t</h2>
					</div>

					<div className="app-search-bar-container">
						<div id="app-search-bar-element-container">
							<Input type="text" value={this.state.searchquery} onChange={this.handleChange} icon={<Icon link={true} name="delete" onClick={() => this.clearSearch()} />} className="app-search-bar" fluid={true} placeholder="Search by username..." />
						</div>
						<div id="app-search-bar-results-container">
							{this.props.search.displaySearch && searchDisplay}
						</div>
					</div>
				</div>

				{this.props.isAuthenticated 
					? (
					<nav>
					  <div id="navbarcontainer">
					    <ul id="navbarlist">
					      <li onClick={() => this.props.history.push("/")} className="navbar-item-desktop" >Home</li>
					      <li onClick={() => this.props.history.push("/feed")} className="navbar-item-desktop">Feed</li>
					      <li onClick={() => this.props.togglepostpopup()} className="navbar-item-desktop">New post</li>
					      <li onClick={() => this.props.history.push("/profile")} className="navbar-item-desktop">Profile</li>
					      <li onClick={() => this.props.history.push("/settings")} className="navbar-item-desktop">Settings</li>
					      <li onClick={() => this.props.signOut().then(() => this.props.history.push("/signin"))} className="navbar-item-desktop">Sign out</li>
					    </ul>
					  </div>
					  <div id="navbar_container--mobile">
					    <ul onClick={()=> this.toggleMenu()} id="navbar_list--mobile">
					      <li href="#"><span><Icon name={this.state.isMenuOpen ? "close" : "bars"}/></span></li>
					      <li className="menu-item" style={this.state.style}><Link style={{"display":"block"}} to={"/"}>Home</Link></li>
					      <li className="menu-item" style={this.state.style}><Link style={{"display":"block"}} to={"/feed"}>Feed</Link></li>
					      <li className="menu-item" style={this.state.style} onClick={() => this.props.togglepostpopup()}>New post</li>
					      <li className="menu-item" style={this.state.style}><Link style={{"display":"block"}} to={"/profile"}>Profile</Link></li>
						  <li className="menu-item" style={this.state.style}><Link style={{"display":"block"}} to={"/settings"}>Settings</Link></li>
					      <li className="menu-item" style={this.state.style} onClick={() => this.props.signOut().then(() => this.props.history.push("/signin")) }>Sign out</li>
					    </ul>
					  </div>
					</nav>
					) : (
					<nav>
					  <div id="navbarcontainer">
					    <ul id="navbarlist">
					      <li className="navbar-item-desktop" onClick={() => this.props.history.push("/")} style={{"display":"inline-block"}} >Home</li>
					      <li className="navbar-item-desktop"  onClick={() => this.props.history.push("/signin")} style={{"display":"inline-block"}} >Sign in</li>
					      <li className="navbar-item-desktop"  onClick={() => this.props.history.push("/signup")} style={{"display":"inline-block"}} >Sign up</li>
					    </ul>
					  </div>
					  <div id="navbar_container--mobile">
					    <ul onClick={()=> this.toggleMenu()} id="navbar_list--mobile">
					      <li href="#" onClick={()=> this.toggleMenu()}><span><Icon name={this.state.isMenuOpen ? "close" : "bars"}/></span></li>
					      <li className="menu-item" style={this.state.style}><Link style={{"display":"block"}} to={"/"}>Home</Link></li>
					      <li className="menu-item" style={this.state.style}><Link style={{"display":"block"}} to={"/signin"}>Sign in</Link></li>
					      <li className="menu-item" style={this.state.style}><Link style={{"display":"block"}} to={"/signup"}>Sign up</Link></li>
					    </ul>
					  </div>
					</nav>
					)
				}
			</div>
		)
	
	}
	
}


const debounce = (func, wait, immediate) => {
	let timeout, result;
	return function() {
	    let context = this, args = arguments;
	    let later = function() {
		    timeout = null;
		    if (!immediate) result = func.apply(context, args);
	    };
	    let callNow = immediate && !timeout;
	    clearTimeout(timeout);
	    timeout = setTimeout(later, wait);
	    if (callNow) result = func.apply(context, args);
	    return result;
	};
}



export default navbar;