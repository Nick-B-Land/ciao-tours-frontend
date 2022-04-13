import React, { Component } from "react";
import "../style/stylesheet.css";
import BottomAdminNav from "../components/navs/bottomAdminNav";
import TopNav from "../components/navs/topNav";
import employeeController from "../controllers/employeeController";
import { Link } from "react-router-dom";
import EmployeeCard from "../components/adminEmployees/employeeCard";
import TopNavWrapper from "../functionalComponents/topNavWrapper";

class AdminEmployees extends Component {
	constructor(props) {
		super(props);
		this.state = {
			employeeList: [],
			employeesLoaded: false,
		};
	}

	componentDidMount = () => {
		employeeController.getEmployees().then((employees) => {
			this.setState({ employeeList: employees.data, employeesLoaded: true });
			console.log(this.state.employeeList);
		});
	};

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
												<EmployeeCard
												key={props.employeeId}
													{...props}
												/>
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
