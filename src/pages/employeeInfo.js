import React, { Component } from "react";
import "../style/stylesheet.css";
import TopNav from "../components/navs/topNav";
import BottomAdminNav from "../components/navs/bottomAdminNav";
import TopNavWrapper from "../functionalComponents/topNavWrapper";
import employeeController from "../controllers/employeeController";
import EmployeeCard from "../components/adminEmployees/employeeCard";
import BottomEmpNav from "../components/navs/bottomEmpNav";

class EmployeeInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			employeeObject: {},
		};
	}

	componentDidMount = () => {
		console.log(this.props.currentUser);
		this.loadEmployeeInfo();
	};

	loadEmployeeInfo = async () => {
		let employee = await employeeController.getEmployeeByID(
			this.props.currentUser.eID
		);
		console.log(employee);
		this.setState({ employeeObject: employee.data[0] }, () =>
			console.log(this.state.employeeObject)
		);
	};

	render() {
		return (
			<form>
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
										{this.state.employeeObject ? (
											<EmployeeCard
												key={this.state.employeeObject.employeeId}
												{...this.state.employeeObject}
											/>
										) : null}
									</ul>
								</div>
								<div className="col-2"></div>
							</div>
						</div>
						<div className="col-2"></div>
					</div>
				</div>
			</form>
		);
	}
}

export default EmployeeInfo;
