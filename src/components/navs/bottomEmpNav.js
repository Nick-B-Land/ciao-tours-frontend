import React, { Component } from "react";
import { Link } from "react-router-dom";

/**
 * This class holds the employee navigation bar on the top of the screen
 */
class BottomEmpNav extends Component {
	render() {
		return (
			<div className="row border basicNavBar">
				<ul className="nav nav-pills  nav-fill">
					<li className="nav-item">
						<Link className="nav-link" to="/employee">
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/employeePayroll">
							Payroll Calendar
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/employeePaystubs">
							Paystubs
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/employee">My Information</Link>
					</li>
				</ul>
			</div>
		);
	}
}

export default BottomEmpNav;
