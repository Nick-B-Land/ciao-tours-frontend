import React, { Component } from "react";
import employeeController from "../../controllers/employeeController";
import "../../style/employeeCalendarCSS.css";

/**
 * EmployeePayrollButtons
 * Purpose: loads the buttons to employeePayroll page based on the type of user that is logged in
 * 
 * Props
	handleSelectedForm - changes the state of the currently selected form
 */

class EmployeePayrollButtons extends Component {
	constructor(props) {
		super(props);
		this.state = {
			employeeType: 0,
		};
	}

	componentDidMount = async () => {
		let empResponse = await employeeController.getEmployeeByID(
			this.props.employeeId
		);
		console.log(empResponse);
		this.setState({ employeeType: empResponse.data[0].employeeType });
	};

	/**
	 * loads the correct buttons for hourly employee
	 * @returns div with correct buttons
	 */
	renderHourlyButtons = () => {
		return (
			<div className="d-flex justify-content-end">
				<button
					type="button"
					className="btn btn-sm m-3 payrollButton shadow"
					onClick={() => this.props.handleSelectedForm(7)}
				>
					Add Expense
				</button>
				<button
					type="button"
					className="btn btn-sm m-3 payrollButton shadow"
					onClick={() => this.props.handleSelectedForm(1)}
				>
					Add WorkDay Hours
				</button>
			</div>
		);
	};

	/**
	 * loads buttons needed for salary employees
	 * @returns div with correct buttons
	 */
	renderSalaryButtons = () => {
		return (
			<div className="d-flex justify-content-end">
				<button
					type="button"
					className="btn btn-sm m-3 payrollButton shadow"
					onClick={() => this.props.handleSelectedForm(7)}
				>
					Add Expense
				</button>
				<button
					type="button"
					className="btn btn-sm m-3 payrollButton shadow"
					onClick={() => this.props.handleSelectedForm(4)}
				>
					Add Time Off
				</button>
			</div>
		);
	};

	/**
	 * loads buttons for italian employees
	 * @returns div with correct buttons
	 */
	renderItalianButtons = () => {
		return (
			<div className="d-flex justify-content-end">
				<button
					type="button"
					className="btn btn-sm m-3 payrollButton shadow"
					onClick={() => this.props.handleSelectedForm(7)}
				>
					Add Expense
				</button>
				<button
					type="button"
					className="btn btn-sm m-3 payrollButton shadow"
					onClick={() => this.props.handleSelectedForm(3)}
				>
					Add Daily Assistance Fee
				</button>
				<button
					type="button"
					className="btn btn-sm m-3 payrollButton shadow"
					onClick={() => this.props.handleSelectedForm(2)}
				>
					Add Tour Booking
				</button>
				<button type="button" className="btn btn-sm m-3 payrollButton shadow" onClick={() => this.props.handleSelectedForm(5)}>
					Add Monthly Fee
				</button>
			</div>
		);
	};

	/**
	 * decides which set of buttons to return based on employee type
	 * @returns the div with correct buttons
	 */
	renderEmployeeTypeButtons = () => {
		if (this.state.employeeType === 1) {
			return this.renderHourlyButtons();
		} else if (this.state.employeeType === 2) {
			return this.renderSalaryButtons();
		} else if (this.state.employeeType === 3) {
			return this.renderItalianButtons();
		} else return "Loading...";
	};

	render() {
		return this.renderEmployeeTypeButtons();
	}
}

export default EmployeePayrollButtons;
