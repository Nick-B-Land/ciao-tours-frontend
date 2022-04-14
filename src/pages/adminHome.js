import React, { Component } from "react";
import "../style/stylesheet.css";
import employeeController from "../controllers/employeeController";
import BottomAdminNav from "../components/navs/bottomAdminNav";
import { Link } from "react-router-dom";
import TopNavWrapper from "../functionalComponents/topNavWrapper";

/**
 * AdminHome
 * Purpose: the landing page for admin users; ideally this page will show vital information for the admin to see, such as users locked out,
 * 	payrolls waiting to be completed, and quickly creating new users
 * 
 * Locally-Defined Functions and Variables
 * Functions
 * 	componentDidMount - runs on page load
 */
class AdminHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	//??
	componentDidMount() {
		employeeController.getEmployees().then((employee) => {
			console.log(<li key={employee.id}>{employee.data}</li>);
		});
	}

	render() {
		var monthName = [
			"JAN",
			"FEB",
			"MAR",
			"APR",
			"MAY",
			"JUN",
			"JUL",
			"AUG",
			"SEP",
			"OCT",
			"NOV",
			"DEC",
		];
		var current = new Date();
		var month = `${monthName[current.getMonth()]}`;
		var day = `${current.getDate()}`;
		var year = `${current.getFullYear()}`;

		return (
			<div className="container-fluid p-0 adminHomePage">
				<div className="row d-flex">
					<TopNavWrapper currentUser={this.props.currentUser} />
					<BottomAdminNav />
				</div>
				<div className="row">
					<div className="col-2"></div>
					<div className="col-8 innerAdmin">
						<div className="row">
							<div className="col min-vh-100">
								<div className="row mb-4">
									<div className="employeeHeader p-4 pt-2 pb-2 text-center">
										<h1 className="mb-2">
											Welcome, {this.props.currentUser.username}
										</h1>
									</div>
								</div>
								<div className="row">
									<div className="col p-2 text-center">
										<div className="p-3 bg-white border rounded-3">
											<h6>Today's Date</h6>
											<p className="h2 m-0">{month}</p>
											<p className="display-1 m-0">{day}</p>
											<p className="h2 m-0">{year}</p>
										</div>
									</div>
									<div className="col p-2">
										<div className="p-3 bg-white border rounded-3">
											<div className="d-flex justify-content-center">
												<Link to="/newEmployee">
													<button
														type="button"
														className="btn PrimaryButton btn-lg p-5 pt-2 pb-2"
													>
														<h2>Add New Employee</h2>
													</button>
												</Link>
											</div>
										</div>
									</div>
									<div className="col-md-6 p-2">
										<div className="p-3 bg-white border rounded-3">
											<div className="d-flex justify-content-center">
												<Link to="/resetPassword">
													<button
														type="button"
														className="btn PrimaryButton btn-lg p-5 pt-2 pb-2"
													>
														<h2>Reset Password</h2>
													</button>
												</Link>
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

export default AdminHome;
