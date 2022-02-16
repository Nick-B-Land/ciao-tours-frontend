import React, { Component } from "react";
import "../style/stylesheet.css";
import BottomAdminNav from "../components/bottomAdminNav";
import TopAdminNav from "../components/topAdminNav";
import Accordion from "../components/accordion";
import { accordionData } from "../components/data";
import loginController from "../controllers/loginController";
import employeeController from "../controllers/employeeController";

class AdminEmployees extends Component {
	constructor(props) {
		super(props);
		this.state = {
			employeeList: [],
			employeesLoaded: false,
		};
	}

	componentDidMount = () => {
		// this.setState({ employeeList: this.getEmployees() });

		employeeController.getEmployees().then((employees) => {
			this.setState({ employeeList: employees.data, employeesLoaded: true });
			console.log(this.state.employeeList);
		});

		document.cookie = "name = nick;";
		console.log(document.cookie);
	};

	getEmployees = async () => {
		let employees = await employeeController.getEmployees();
		return employees;
	};

	render() {
		return (
			<div className="container-fluid p-0 adminEmployeesPage">
				<div className="row d-flex">
					<TopAdminNav />
					<BottomAdminNav />
				</div>
				<div className="row">
					<div className="col-2"></div>
					<div className="col-8 min-vh-100 innerAdmin">
						<div className="row">
							<div className="employeeHeader p-4 pt-2 pb-2">
								<h1>List Of Employees</h1>
							</div>
						</div>

						<div className="row">
							<div className="col p-0">
								<div>
									<ul className="accordion">
										{accordionData.map(
											({
												empName,
												email,
												type,
												location,
												hourlyRate,
												preferredCurrency,
											}) => (
												<Accordion
													empName={empName}
													email={email}
													type={type}
													location={location}
													hourlyRate={hourlyRate}
													preferredCurrency={preferredCurrency}
												/>
											)
										)}
									</ul>
								</div>
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
