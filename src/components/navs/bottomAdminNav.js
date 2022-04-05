import React, { Component } from "react";
import { Link } from "react-router-dom";

class BottomAdminNav extends Component {
	render() {
		return (
			<div className="row border basicNavBar">
				<ul className="nav nav-pills nav-fill">
					<li className="nav-item">
						<Link to="/admin">Home</Link>
					</li>
					<li className="nav-item">
						<Link to="/adminEmployees">Employees</Link>
					</li>
					<li className="nav-item">
						<Link to="/adminReports">Reports</Link>
					</li>
					<li className="nav-item">
						<Link to="/adminPayroll">Run Payroll</Link>
					</li>
					<li className="nav-item">
						<Link to="/admin">My Information</Link>
					</li>
				</ul>
			</div>
		);
	}
}

export default BottomAdminNav;
