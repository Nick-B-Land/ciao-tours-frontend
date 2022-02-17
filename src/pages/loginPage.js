import React, { Component } from "react";
import loginController from "../controllers/loginController";
import logo from "../style/CAIO logo.png";
import "../style/stylesheet.css";

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
		};
	}

	handleUsernameInput = (e) => {
		this.setState({ username: e.target.value });
		console.log(this.state.username);
	};

	handlePasswordInput = (e) => {
		this.setState({ password: e.target.value });
	};

	handleLogin = async () => {
		let response = await loginController.login(
			this.state.username,
			this.state.password
		);
		console.log(response);

		if (response.status === 200) {
			console.log("logged in");
			let employeeTypes = response.data.roles;

			if (employeeTypes.includes("ROLE_EMPLOYEE")) {
				this.props.navigate("/employee");
			} else {
				this.props.navigate("/admin");
			}
		} else {
			console.log("could not log in");
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
										<div className="p-2 mx-auto">Login</div>
										<div className="row">
											<div className="d-flex justify-content-between">
												<div className="m-2">Username</div>
												<div>
													<input
														type="text"
														value={this.state.username}
														onChange={this.handleUsernameInput}
													/>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="d-flex justify-content-between">
												<div className="m-2">Password</div>
												<div>
													<input
														type="password"
														value={this.state.password}
														onChange={this.handlePasswordInput}
													/>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="d-flex justify-content-center">
												<div>
													<button
														onClick={this.handleLogin}
														className="btn PrimaryButton"
													>
														Login
													</button>
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
