import React, { Component } from "react";
import { Link } from "react-router-dom";

class BottomAdminNav extends Component {
	render() {
		return (
			<div className="row border basicNavBar">
				<ul className="nav nav-pills nav-fill">
					<li className="nav-item">
						<Link to="/admin" className="basicNavBarItem">
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/adminEmployees" className="basicNavBarItem">
							Employees
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/adminReports" className="basicNavBarItem">
							Reports
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/adminPayroll" className="basicNavBarItem">
							Run Payroll
						</Link>
					</li>
				</ul>
			</div>
		);
	}
}

export default BottomAdminNav;
