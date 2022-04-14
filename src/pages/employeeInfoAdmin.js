import React, { Component, useState } from "react";
import "../style/stylesheet.css";
import BottomAdminNav from "../components/navs/bottomAdminNav";
import TopNavWrapper from "../functionalComponents/topNavWrapper";
import employeeController from "../controllers/employeeController";
import EmployeeCard from "../components/adminEmployees/employeeCard";

/**
 * EmployeeInfoAdmin
 * Purpose: the administrator page for viewing their own personal information 
 * 
 * Locally-Defined Functions and Variables
 * Variables
 * 	employeeObject - current logged in users employee information, grabbed from controller
 * 
 * Functions
 * 	componentDidMount - loads the employee information
 * 	loadEmployeeInfo - uses id to load the current users personal information
 */
class EmployeeInfoAdmin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			employeeObject: {}
		};
	}

	/**
	 * runs on page load, calls loadEmployeeInfo
	 */
	componentDidMount = () => {
		console.log(this.props.currentUser)
		this.loadEmployeeInfo();
	}

	/**
	 * loads employee personal information for the current system user by calling controller
	 */
	loadEmployeeInfo = async () => {
		let employee = await employeeController.getEmployeeByID(this.props.currentUser.eID);
		console.log(employee)
		this.setState({ employeeObject: employee.data[0] }, () => console.log(this.state.employeeObject));
	}

	render() {
		return (
			<form>
				<div className="container-fluid p-0 myInfoPage">
					<div className="row d-flex">
						<TopNavWrapper currentUser={this.props.currentUser} />
						<BottomAdminNav />
					</div>
					<div className="row">
					<div className="col-2"></div>
					<div className="col-8 min-vh-100 innerAdmin">
						<div className="row">
							<div className="employeeHeader p-4 pt-2 pb-2 text-center">
								<h1 className="mb-2">My Information</h1>
							</div>
						</div>
						<div className="row">
							<div className="col p-0">
								<ul className="p-0">
									{this.state.employeeObject 
									? <EmployeeCard 
										key={this.state.employeeObject.employeeId}
										{...this.state.employeeObject}/>
									: null }
								</ul>
							</div>
						</div>
					</div>
					<div className="col-2"></div>
				</div>
				</div>
			</form>
		);
	}
}

export default EmployeeInfoAdmin;
