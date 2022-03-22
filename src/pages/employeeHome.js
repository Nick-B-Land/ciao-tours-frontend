import React, { Component } from "react";
import BottomEmpNav from "../components/navs/bottomEmpNav";
import TopNavWrapper from "../functionalComponents/topNavWrapper";

class EmployeeHome extends Component {
	render() {
		return (
			<div className="container-fluid p-0 employeeHomePage">
				<div className="row d-flex">
					<TopNavWrapper currentUser={this.props.currentUser} />
					<BottomEmpNav />
				</div>
				<div className="row">
					<div className="col-2"></div>
					<div className="col-8 innerAdmin">
						<div className="row">
							<div className="col min-vh-100">
								<h1>Welcome, {this.props.currentUser.username}</h1>
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

export default EmployeeHome;
