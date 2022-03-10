import React, { Component, useState, useEffect } from "react";
import "../style/stylesheet.css";
import EmployeeCard from "../components/employeeCard";
import employeeController from "../controllers/employeeController";
import TopAdminNav from "../components/topAdminNav";
import BottomAdminNav from "../components/bottomAdminNav";
import FlaggedDay from "../components/flaggedDay.js";
import EmployeeHours from "../components/employeeHours";
import { Link } from "react-router-dom";
import { flaggedDayData, empHoursData } from "../components/data";

class AdminHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			employeeList: [],
			employeesLoaded: false,
		};
	}

	componentDidMount() {
		employeeController.getEmployees().then((employees) => {
			this.setState({ employeeList: employees.data, employeesLoaded: true });
		});
	}

	

	// renderEmployees = () => {
	//     console.log("render Employees fired");
	//     console.log(this.state.employeeList);
	//     return this.state.employeeList.map(e => {

	//         <EmployeeCard
	//             key={e.id}
	//             firstName={e.firstName}
	//             lastName={e.lastName}
	//             jobTitle={e.jobTitle}
	//         />
	//     })
	// }

	render() {
		var adminName = "Administrator";
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
					<TopAdminNav />
					<BottomAdminNav />
				</div>
				<div className="row">
					<div className="col-2"></div>
					<div className="col-8 innerAdmin">
						<div className="row">
							<div className="col mt-2 min-vh-100">
								<h1 className="mb-2">Welcome, {adminName}</h1>
								<div className="container">
									<div className="row">
										<div className="col-md-9 p-2">
											<div className="p-3 bg-white pb-4 border rounded-3">
												<h2 className="text-center">Flagged Days</h2>
												<p>
													Below is a list of days or expenses that have been
													flagged.
												</p>
												<table className="table">
													<thead>
														<tr>
															<th scope="col">Name</th>
															<th scope="col">Date</th>
															<th scope="col">Issue</th>
															<th scope="col">Action</th>
														</tr>
													</thead>
													<tbody>
														{flaggedDayData.map(
															({ firstName, lastName, date, issue }) => (
																<FlaggedDay
																	firstName={firstName}
																	lastName={lastName}
																	date={date}
																	issue={issue}
																/>
															)
														)}
													</tbody>
												</table>
											</div>
										</div>
										<div className="col-md-3 p-2 text-center">
											<div className="p-3 bg-white border rounded-3">
												<h6>Today's Date</h6>
												<p className="h2 m-0">{month}</p>
												<p className="display-1 m-0">{day}</p>
												<p className="h2 m-0">{year}</p>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6 p-2">
											<div className="p-3 bg-white border rounded-3">
												<h2>List of Employees</h2>
												<table className="table">
													<thead>
														<tr>
															<th scope="col">Name</th>
															<th scope="col">Hours</th>
														</tr>
													</thead>
													<tbody>
														{empHoursData.map(
															({ firstName, lastName, hours }) => (
																<EmployeeHours
																	firstName={firstName}
																	lastName={lastName}
																	hours={hours}
																/>
															)
														)}
													</tbody>
												</table>
											</div>
										</div>
										<div className="col-md-6 p-2">
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
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* {this.state.employeesLoaded ? this.renderEmployees() : <h3>Loading</h3>} */}
			</div>
		);
	}
}

export default AdminHome;
