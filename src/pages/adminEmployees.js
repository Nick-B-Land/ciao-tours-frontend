import React, { Component } from "react";
import "../style/stylesheet.css";
import BottomAdminNav from "../components/navs/bottomAdminNav";
import employeeController from "../controllers/employeeController";
import { Link } from "react-router-dom";
import EmployeeCard from "../components/adminEmployees/employeeCard";
import TopNavWrapper from "../functionalComponents/topNavWrapper";

/**
 * AdminEmployees
 * Purpose: page that loads the current list of employees and allows admin to select an employee and edit/remove them or to 
 * 	create new employees
 * 
 * Locally-Defined Functions and Variables
 * Variables
 * 	employeeList - current list of all employees in the database
 * 	employeesLoaded - becomes true when employeeList is fully loaded
 * 
 * Functions
 * 	componentDidMount - runs on page load, calls getEmployees to get the current list of employees from the database and set state
 * 	getEmployees - calls employee controller to get current employee list
 * 
 * Props
 * 	currentUser - current user of the system
 */
class AdminEmployees extends Component {
	constructor(props) {
		super(props);
		this.state = {
			employeeList: [],
			employeesLoaded: false,
		};
	}

	/**
	 * runs on page load and calls getEmployees to get current employees
	 */
	componentDidMount = () => {
		employeeController.getEmployees().then((employees) => {
			this.setState({ employeeList: employees.data, employeesLoaded: true });
		});
	};

	/**
	 * calls the controller to get the current employee list from the database
	 * @returns object with current list of employees
	 */
	getEmployees = async () => {
		let employees = await employeeController.getEmployees();
		return employees;
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
						<div className="row">
							<div className="employeeHeader p-4 pt-2 pb-2 text-center">
								<h1>List Of Employees</h1>
							</div>
						</div>
						<div className="row">
							<div className="col d-flex justify-content-center p-4">
								<Link to="/newEmployee">
									<button className="btn btn-lg PrimaryButton" type="button">
										Create New Employee
									</button>
								</Link>
							</div>
						</div>
						<div className="row">
							<div className="col p-0">
								<ul className="accordion">
									{this.state.employeesLoaded
										? this.state.employeeList.map((props) => (
												<EmployeeCard key={props.employeeId} {...props} />
										  ))
										: "Loading"}
								</ul>
							</div>
						</div>
					</div>
					<div className="col-2"></div>
				</div>
			</div>
		);
	}
}

export default AdminEmployees;
