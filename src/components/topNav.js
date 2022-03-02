import React, { Component } from "react";
import loginController from "../controllers/loginController";
import logo from "../style/CAIO logo.png";

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
					<a className="d-flex align-items-center" onClick={this.handleLogout}>
						Logout
					</a>
				</div>
			</div>
		);
	}
}

export default TopNav;
