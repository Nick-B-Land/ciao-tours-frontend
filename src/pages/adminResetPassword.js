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

	componentDidMount = () => {};

	handleEmployeeId = (e) => {
		this.setState({ employeeId: e.target.value });
	};

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
			user.password = "password";

			let resetResponse = await userAccountController.updateUser(
				user,
				user.user_id
			);

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
						<input
							type="text"
							value={this.state.employeeId}
							onChange={this.handleEmployeeId}
						/>
						<button
							className="btn PrimaryButton"
							onClick={this.handleResetPassword}
						>
							Reset Password
						</button>
					</div>
					<div className="col-2"></div>
				</div>
			</div>
		);
	}
}

export default AdminResetPassword;
