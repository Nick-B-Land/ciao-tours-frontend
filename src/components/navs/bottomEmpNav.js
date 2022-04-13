import React, { Component } from "react";
import { Link } from "react-router-dom";

class BottomEmpNav extends Component {
	render() {
		return (
			<div className="row border basicNavBar">
				<ul className="nav nav-pills  nav-fill">
					<li className="nav-item">
						<Link className="nav-link basicNavBarItem" to="/employee">
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link basicNavBarItem" to="/employeePayroll">
							Payroll Calendar
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link basicNavBarItem" to="/employeePaystubs">
							Paystubs
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/employeeInfo" className="nav-link basicNavBarItem">
							My Information
						</Link>
					</li>
				</ul>
			</div>
		);
	}
}

export default BottomEmpNav;
