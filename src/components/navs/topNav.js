import React, { Component } from "react";
import { Link } from "react-router-dom";
import loginController from "../../controllers/loginController";
import logo from "../../style/CAIO logo.png";

/**
 * holds the top nav bar with the logo and logout button
 */
class TopNav extends Component {
	handleLogout = async () => {
		let response = await loginController.logout();

		console.log(response);

		if (response.status === 200) {
			console.log("logged out");
			this.props.currentUser.Clear();
			this.props.navigate("/");
		} else {
			console.log("logout failed (this is weird)");
		}
	};

	render() {
		return (
			<div className="row basicNavBar">
				<div className="col d-flex justify-content-between">
					<img src={logo} alt="CIAO Tours Logo"></img>
					<h1 className="d-flex align-items-end">CAIO Tours EMS</h1>
					<Link
						className="d-flex align-items-center"
						onClick={this.handleLogout}
						to="/"
					>
						Logout
					</Link>
				</div>
			</div>
		);
	}
}

export default TopNav;
