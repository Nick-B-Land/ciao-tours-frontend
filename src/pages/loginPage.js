import React, { Component } from "react";
import loginController from "../controllers/loginController";
import logo from "../style/CAIO logo.png";
import "../style/stylesheet.css";
/**
 * Locally-Defined Functions and Variables
 * 
 * Variables
 * 	username - holds the state of currently typed username
 * 	password - holds the state of currently typed password
 * 	validLogin - becomes false if login is denied
 * 
 * Functions
 * 	handleUsernameInput - controls state of username
 * 	handlePasswordInput - controls state of password
 * 	handleLogin - calls the login controller to validate login, response determines if user is logged in or denied access
 * 
 */

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			validLogin: true
		};
	}

	handleUsernameInput = (e) => {
		this.setState({ username: e.target.value });
	};

	handlePasswordInput = (e) => {
		this.setState({ password: e.target.value });
	};

	handleLogin = async () => {
		//calls login controller to validate login
		let response = await loginController.login(
			this.state.username,
			this.state.password
		);

		//valid username/password
		if (response.status === 200) {
			let responseData = await response.json();

			let sessionObj = {};
			sessionObj.roles = responseData.roles;
			sessionObj.uID = responseData.id;
			sessionObj.eID = responseData.employeeID;
			sessionObj.username = responseData.username;

			sessionStorage.setItem("userSession", JSON.stringify(sessionObj));
			this.props.currentUser.Set();
			let employeeTypes = responseData.roles;
			if (employeeTypes.includes("ROLE_EMPLOYEE")) {
				this.props.navigate("/employee");
			} else {
				this.props.navigate("/admin");
			}
		} 
		//invalid username/password
		else {
			this.setState( {validLogin: false});
		}
	};

	render() {
		return (
			<div className="container-fluid min-vh-100 loginscreen">
				<div className="row">
					<div className="col-6 p-0">
						<div className="loginBG"></div>
					</div>
					<div className="col-6 d-flex justify-content-center">
						<div className="row min-vh-100">
							<div className="col d-flex align-items-center">
								<div className="row">
									<div className="col d-flex flex-column">
										<div className="mx-auto">
											<img className="mx-auto" src={logo} alt="logo" />
										</div>
										<div className="p-2 mx-auto"><h2>Login</h2></div>
										<div className="row">
											<div className="col d-flex justify-content-between">
												<div className="form-group">
													<h4>Username</h4>
													<input
														type="text"
														value={this.state.username}
														onChange={this.handleUsernameInput}
														className="form-control"
													/>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col d-flex justify-content-between">
												<div className="form-group">
													<h4>Password</h4>
													<input
														type="password"
														value={this.state.password}
														onChange={this.handlePasswordInput}
														className="form-control"
													/>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col d-flex p-3 justify-content-center">
												<div>
													<button
														onClick={this.handleLogin}
														className="btn btn-lg PrimaryButton"
													>
														Login
													</button>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col d-flex p-3 justify-content-center">
												<div className="invalid">
													{/* error message for invalid un/pw */}
													{this.state.validLogin ? null : "Invalid Username or Password"}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default LoginPage;
