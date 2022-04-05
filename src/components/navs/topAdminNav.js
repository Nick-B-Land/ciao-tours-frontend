import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../style/CAIO logo.png";

/**
 * holds the top nav bar with the logo and logout button
 */
class TopAdminNav extends Component {
	render() {
		return (
			<div className="row basicNavBar">
				<div className="col d-flex justify-content-between">
					<img src={logo} alt="CIAO Tours Logo"></img>
					<h1 className="d-flex align-items-end">CAIO Tours EMS</h1>
					<p className="switchLabel">Employee View</p>

					<Link to="/">Logout</Link>
				</div>
			</div>
		);
	}
}

export default TopAdminNav;
