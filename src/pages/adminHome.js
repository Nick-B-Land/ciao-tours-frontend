import React, { Component, useState, useEffect } from "react";
import "../style/stylesheet.css";
import EmployeeCard from "../components/employeeCard";
import employeeController from "../controllers/employeeController";
import TopAdminNav from "../components/topAdminNav";
import BottomAdminNav from "../components/bottomAdminNav";
import TopNavWrapper from "../functionalComponents/topNavWrapper";

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
	// 	console.log("render Employees fired");
	// 	console.log(this.state.employeeList);
	// 	return this.state.employeeList.map((e) => {
	// 		<EmployeeCard
	// 			key={e.id}
	// 			firstName={e.firstName}
	// 			lastName={e.lastName}
	// 			jobTitle={e.jobTitle}
	// 		/>
	// 	});
	// };

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
					<TopNavWrapper />
					<BottomAdminNav />
				</div>
				<div className="row">
					<div className="col-2"></div>
					<div className="col-8 innerAdmin">
						<div className="row">
							<div className="col min-vh-100 adminContent">
								<h1>Welcome, {adminName}</h1>

								<div className="flaggedDays">
									<h2>Flagged Days</h2>
									<p>
										Below is a list of days or expenses that have been flagged.
									</p>
									<table>
										<thead>
											<tr>
												<th>Name</th>
												<th>Date</th>
												<th>Issue</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Francis Mack</td>
												<td className="flagDate">Jan 10</td>
												<td>Unsure if hours are correct</td>
												<td>
													<button>Resolve</button>
												</td>
											</tr>
										</tbody>
									</table>
								</div>

								<div className="todaysDate">
									<h2>Today's Date</h2>
									<p className="curMonth">{month}</p>
									<p className="curDay">{day}</p>
									<p className="curYear">{year}</p>
								</div>

								<div className="listOfEmp">
									<h2>List of Employees</h2>
									<table>
										<thead>
											<tr>
												<th>Name</th>
												<th>Hours</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Francis Mack</td>
												<td>22</td>
											</tr>
										</tbody>
									</table>
								</div>

								<div className="empty"></div>
							</div>
						</div>
						<div className="row">
							<div className="col-2"></div>
							<div className="col"></div>
						</div>
					</div>
					<div className="col-2"></div>
				</div>

				{/* {this.state.employeesLoaded ? this.renderEmployees() : <h3>Loading</h3>} */}
			</div>
		);
	}
}

export default AdminHome;
