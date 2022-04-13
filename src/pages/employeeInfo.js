import React, { Component } from "react";
import "../style/stylesheet.css";
import TopNav from "../components/navs/topNav";
<<<<<<< Updated upstream
import BottomAdminNav from "../components/navs/bottomAdminNav";
import TopNavWrapper from "../functionalComponents/topNavWrapper";
import employeeController from "../controllers/employeeController";
import EmployeeCard from "../components/adminEmployees/employeeCard";
=======
import { Link } from "react-router-dom";
import employeeController from "../controllers/employeeController";
>>>>>>> Stashed changes
import BottomEmpNav from "../components/navs/bottomEmpNav";

class EmployeeInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
<<<<<<< Updated upstream
			employeeObject: {}
=======
			employeeList: [],
			loaded: false,
>>>>>>> Stashed changes
		};
		this.handleDataLoading();
	}
<<<<<<< Updated upstream

	componentDidMount = () => {
		console.log(this.props.currentUser)
		this.loadEmployeeInfo();
	}

	loadEmployeeInfo = async () => {
		let employee = await employeeController.getEmployeeByID(this.props.currentUser.eID);
		console.log(employee)
		this.setState({ employeeObject: employee.data[0] }, () => console.log(this.state.employeeObject));
	}
=======
	handleDataLoading = async () => {
		// console.log("current user"+this.props.currentUser.eID);
		console.log(
			"session" + JSON.parse(sessionStorage.getItem("userSession")).eID
		);
		employeeController.getEmployeeByID(3).then((employees) => {
			this.setState({ employeeList: employees.data, loaded: true });
			console.log(employees.data);
		});
	};

	editInfo = async () => {
		// this.props.navigate("/editEmployeeInfo");
		this.props.history.push("/editEmployeeInfo");
	};
>>>>>>> Stashed changes

	render() {
		return (
			<form>
<<<<<<< Updated upstream
				<div className="container-fluid p-0 myInfoPage">
					<div className="row d-flex">
						<TopNavWrapper currentUser={this.props.currentUser} />
						<BottomEmpNav />
					</div>
					<div className="row">
					<div className="col-2"></div>
					<div className="col-8 min-vh-100 innerAdmin">
						<div className="row">
							<div className="employeeHeader p-4 pt-2 pb-2 text-center">
								<h1 className="py-3">My Information</h1>
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
=======
				{this.state.loaded ? (
					<div className="container-fluid p-0 myInfoPage">
						<div className="row d-flex">
							<TopNav currentUser={this.props.currentUser} />
							<BottomEmpNav />
						</div>
						<div className="row  d-flex">
							<div className="col-2"></div>
							<div className="col-7 min-vh-100 innerAdmin ">
								<div className="row">
									<div className="employeeHeader p-4 pt-2 pb-2 text-center">
										<h1>My Information</h1>
									</div>
								</div>
								<div className="row">
									<hr className="bar"></hr>
								</div>
								<div className="row newEmployeeRow">
									<div className="col-3 text-start">Name:</div>
									<div className="col-4">
										<input
											disabled={true}
											value={
												this.state.employeeList[0].firstName +
												" " +
												this.state.employeeList[0].lastName
											}
										></input>
									</div>
								</div>
								<div className="row newEmployeeRow">
									<div className="col-3  text-start">Address:</div>
									<div className="col-4">
										<input
											disabled={true}
											value={this.state.employeeList[0].address}
										></input>
									</div>
								</div>
								<div className="row newEmployeeRow">
									<div className="col-3  text-start">City:</div>
									<div className="col-4">
										<input
											disabled={true}
											value={this.state.employeeList[0].city}
										></input>
									</div>
								</div>
								<div className="row newEmployeeRow">
									<div className="col-3  text-start">Email:</div>
									<div className="col-4">
										<input
											disabled={true}
											value={this.state.employeeList[0].emailAddress}
										></input>
									</div>
								</div>
								<div className="row newEmployeeRow">
									<div className="col-3  text-start">Start Date:</div>
									<div className="col-4">
										<input
											disabled={true}
											value={this.state.employeeList[0].employeeStartDate}
										></input>
									</div>
								</div>
								<div className="row newEmployeeRow">
									<div className="col-3  text-start">Hourly Rate:</div>
									<div className="col-4">
										<input
											disabled={true}
											value={this.state.employeeList[0].hourlyWage}
										></input>
									</div>
								</div>
								<div className="row newEmployeeRow">
									<div className="col-3  text-start">Monthly Salary:</div>
									<div className="col-4">
										<input
											disabled={true}
											value={this.state.employeeList[0].monthlySalary}
										></input>
									</div>
								</div>
								<div className="row newEmployeeRow">
									<div className="col-3  text-start">Institution ID:</div>
									<div className="col-4">
										<input
											disabled={true}
											value={this.state.employeeList[0].institutionId}
										></input>
									</div>
								</div>
								<div className="row newEmployeeRow">
									<div className="col-3  text-start">Bank Account:</div>
									<div className="col-4">
										<input
											disabled={true}
											value={this.state.employeeList[0].bankAccountNumber}
										></input>
									</div>
								</div>
								<div className="row newEmployeeRow">
									<div className="col-3  text-start">Transit ID</div>
									<div className="col-4">
										<input
											disabled={true}
											value={this.state.employeeList[0].transitId}
										></input>
									</div>
								</div>
								<div className="row justify-content-center text-center">
									<div className="col-12">
										Standard form with all the information.
									</div>
								</div>

								<div className="row newEmployeeRow ">
									<div className="col-11" style={{ textAlign: "right" }}>
										<Link to="/editEmployeeInfo">
											<button
												type="button"
												className="employeeButton btn btn-warning m-2"
											>
												Edit Information
											</button>
										</Link>
									</div>
								</div>
>>>>>>> Stashed changes
							</div>
							<div className="col-2"></div>
						</div>
					</div>
<<<<<<< Updated upstream
					<div className="col-2"></div>
				</div>
				</div>
=======
				) : (
					"Loading Data..."
				)}
>>>>>>> Stashed changes
			</form>
		);
	}
}

export default EmployeeInfo;
