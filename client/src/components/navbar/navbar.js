import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Icon} from 'semantic-ui-react';

import styles from './navbar.css' 

class navbar extends Component {
	constructor(){
		super()
		this.state={
			isMenuOpen:false,
			style:{
				height:"0px",
				padding:"0px",
				visibility:"hidden",
				fontSize:"0px"
			}
		}
	}

	toggleMenu = () => {
		if (!this.state.isMenuOpen) {
			this.setState({isMenuOpen: true, style:{height:"50px", padding:"15px 0 0 0", visibility:"visible", fontSize:"1em"}})
		} else {
			this.setState({isMenuOpen: false, style:{height:"0px",  padding:"0px", visibility:"hidden", fontSize:"0px"}})
		}
	}

	render(){
		if (this.props.isAuthenticated) {
			return (
				<nav>
				  <div id="navbarcontainer">
				    <ul id="navbarlist">
				      <li onClick={() => this.props.history.push("/")} style={{"display":"inline-block"}} >Home</li>
				      <li onClick={() => this.props.history.push("/feed")} style={{"display":"inline-block"}} >Feed</li>
				      <li onClick={() => this.props.history.push("/profile")} style={{"display":"inline-block"}} >Profile</li>
				      <li onClick={() => this.props.signOut().then(() => this.props.history.push("/signin"))}>Sign out</li>
				    </ul>
				  </div>
				  <div id="navbar_container--mobile">
				    <ul id="navbar_list--mobile">
				      <li href="#" onClick={()=> this.toggleMenu()}><span><Icon name={this.state.isMenuOpen ? "close" : "bars"}/></span></li>
				      <li className="menu-item" style={this.state.style}><Link style={{"display":"block"}} to={"/"}>Home</Link></li>
				      <li className="menu-item" style={this.state.style}><Link style={{"display":"block"}} to={"/feed"}>Feed</Link></li>
				      <li className="menu-item" style={this.state.style}><Link style={{"display":"block"}} to={"/"}>Profile</Link></li>
				      <li className="menu-item" style={this.state.style} onClick={() => this.props.signOut().then(() => this.props.history.push("/signin"))}>Sign out</li>
				    </ul>
				  </div>
				</nav>
			)

		} else {

			return (
				<div>
				  <div id="navbarcontainer">
				    <ul id="navbarlist">
				      <li onClick={() => this.props.history.push("/")} style={{"display":"inline-block"}} >Home</li>
				      <li onClick={() => this.props.history.push("/signin")} style={{"display":"inline-block"}} >Sign in</li>
				      <li onClick={() => this.props.history.push("/signup")} style={{"display":"inline-block"}} >Sign up</li>
				    </ul>
				  </div>
				  <div id="navbar_container--mobile">
				    <ul id="navbar_list--mobile">
				      <li href="#" onClick={()=> this.toggleMenu()}><span><Icon name={this.state.isMenuOpen ? "close" : "bars"}/></span></li>
				      <li className="menu-item" style={this.state.style}><Link style={{"display":"block"}} to={"/"}>Home</Link></li>
				      <li className="menu-item" style={this.state.style}><Link style={{"display":"block"}} to={"/signin"}>Sign in</Link></li>
				      <li className="menu-item" style={this.state.style}><Link style={{"display":"block"}} to={"/signup"}>Sign up</Link></li>
				    </ul>
				  </div>
				</div>
			)
		}
	}
	
}


export default navbar;