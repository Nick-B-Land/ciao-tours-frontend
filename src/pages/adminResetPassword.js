import React, { Component } from "react";
import BottomAdminNav from "../components/navs/bottomAdminNav";
import employeeController from "../controllers/employeeController";
import userAccountController from "../controllers/userAccountController";
import TopNavWrapper from "../functionalComponents/topNavWrapper";

class AdminResetPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			employeeId: "",
		};
	}

	handleEmployeeId = (e) => {
		this.setState({ employeeId: e.target.value });
	};

	/**
	 * resets the password on the admin side, autos to password and the emp can go in and change it
	 */
	handleResetPassword = async () => {
		let employeeResponse = await employeeController.getEmployeeByID(
			this.state.employeeId
		);

		if (employeeResponse.status === 200) {
			let employee = employeeResponse.data[0];
			let userResponse = await userAccountController.getUserByEmployeeID(
				employee.employeeId
			);

			let user = userResponse.data[0];
			console.log(user);
			user.password = "password";

			let resetResponse = await userAccountController.updateUser(user, user.id);

			console.log(resetResponse);
		}
	};

	render() {
		return (
			<div className="container-fluid p-0 adminEmployeesPage">
				<div className="row d-flex">
					<TopNavWrapper currentUser={this.props.currentUser} />
					<BottomAdminNav />
				</div>
				<div className="row">
					<div className="col-2"></div>
					<div className="col-8 min-vh-100 innerAdmin">
						<div className="row mb-4">
							<div className="employeeHeader p-4 pt-2 pb-2 text-center">
								<h1 className="py-3">Reset a Password</h1>
							</div>
						</div>
						<div className="row">
							<div className="col d-flex justify-content-center">
								<div className="form-group">
									<h5>Employee ID</h5>
									<input
										type="text"
										value={this.state.employeeId}
										onChange={this.handleEmployeeId}
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
									Reset Password
								</button>
							</div>
						</div>
					</div>
					<div className="col-2"></div>
				</div>
			</div>
		);
	}
}

export default AdminResetPassword;
