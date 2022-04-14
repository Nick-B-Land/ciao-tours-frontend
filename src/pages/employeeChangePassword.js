import React, { Component } from "react";
import BottomAdminNav from "../components/navs/bottomAdminNav";
import BottomEmpNav from "../components/navs/bottomEmpNav";
import employeeController from "../controllers/employeeController";
import userAccountController from "../controllers/userAccountController";
import TopNavWrapper from "../functionalComponents/topNavWrapper";

class EmployeeChangePassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			oldPassword: "",
			newPassword1: "",
			newPassword2: "",
			passwordsMatch: true,
			submitFailed: false,
		};
	}

	/**
	 * checks if two new passwords match
	 */
	handlePasswordMatch = () => {
		if (
			this.state.newPassword1 &&
			this.state.newPassword2 &&
			this.state.newPassword1 === this.state.newPassword2
		) {
			this.setState({ passwordsMatch: true, submitFailed: false });
		} else {
			this.setState({ passwordsMatch: false, submitFailed: false });
		}
	};

	/**
	 * handles the state for old password
	 * @param {*} e 
	 */
	handleOldPassword = (e) => {
		if (this.state.submitFailed) {
			this.setState({ oldPassword: e.target.value, submitFailed: false });
		} else {
			this.setState({ oldPassword: e.target.value });
		}
	};

	/**
	 * handles state for new password
	 * @param {*} e 
	 */
	handleNewPassword1 = (e) => {
		this.setState({ newPassword1: e.target.value }, this.handlePasswordMatch);
	};

	/**
	 * handles state for confirm password
	 * @param {*} e 
	 */
	handleNewPassword2 = (e) => {
		this.setState({ newPassword2: e.target.value }, this.handlePasswordMatch);
	};

	/**
	 * handles resetting the password by calling the user controller and making an update
	 */
	handleResetPassword = async () => {
		if (
			this.props.currentUser.eID &&
			this.state.passwordsMatch &&
			this.state.oldPassword &&
			this.state.newPassword1 !== "" &&
			this.state.newPassword2 !== ""
		) {
			let userResponse = await userAccountController.getUserByEmployeeID(
				this.props.currentUser.eID
			);

			let user = userResponse.data[0];
			console.log(user);
			user.password = this.state.newPassword1;

			let resetResponse = await userAccountController.updateUser(user, user.id);

			console.log(resetResponse);
		} else {
			this.setState({ submitFailed: true });
		}
	};

	render() {
		return (
			<div className="container-fluid p-0 adminEmployeesPage">
				<div className="row d-flex">
					<TopNavWrapper currentUser={this.props.currentUser} />
					<BottomEmpNav />
				</div>
				<div className="row">
					<div className="col-2"></div>
					<div className="col-8 min-vh-100 innerAdmin">
						<div className="row mb-4">
							<div className="employeeHeader p-4 pt-2 pb-2 text-center">
								<h1 className="py-3">Change Password</h1>
							</div>
						</div>
						<div className="row mb-3">
							<div className="col d-flex justify-content-center">
								<div className="form-group">
									<h5>Old Password</h5>
									<input
										type="password"
										value={this.state.oldPassword}
										onChange={this.handleOldPassword}
										className="form-control"
									/>
								</div>
							</div>
						</div>
						<div className="row mb-3">
							<div className="col d-flex justify-content-center">
								<div className="form-group">
									<h5>New Password</h5>
									<input
										type="password"
										value={this.state.newPassword1}
										onChange={this.handleNewPassword1}
										className="form-control"
									/>
								</div>
							</div>
						</div>
						<div className="row mb-3">
							<div className="col d-flex justify-content-center">
								<div className="form-group">
									<h5>Confirm New Password</h5>
									<input
										type="password"
										value={this.state.newPassword2}
										onChange={this.handleNewPassword2}
										className="form-control"
									/>
								</div>
							</div>
						</div>
						<div className="row my-3">
							<div className="col d-flex justify-content-center">
								<button
									className="btn PrimaryButton"
									onClick={this.handleResetPassword}
								>
									Change Password
								</button>
							</div>
						</div>
						{!this.state.passwordsMatch && (
							<div className="row my-5">
								<div className="col-2"></div>
								<div
									className=" col-8  alert alert-danger d-flex align-items-center"
									role="alert"
								>
									<div>
										<h3>New Password's do not match!</h3>
									</div>
								</div>
								<div className="col-2"></div>
							</div>
						)}
						{this.state.submitFailed && (
							<div className="row my-5">
								<div className="col-2"></div>
								<div
									className=" col-8  alert alert-danger d-flex align-items-center"
									role="alert"
								>
									<div>
										<h3>Update failed, please retry!</h3>
									</div>
								</div>
								<div className="col-2"></div>
							</div>
						)}
					</div>
					<div className="col-2"></div>
				</div>
			</div>
		);
	}
}

export default EmployeeChangePassword;
