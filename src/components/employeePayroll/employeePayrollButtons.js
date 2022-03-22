import React, { Component } from "react";

//
// props -
// handleSelectedForm: function that sets selected form state in employee payroll to match button
//

class EmployeePayrollButtons extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="d-flex justify-content-end">
				<button
					type="button"
					className="btn btn-sm SecondaryButton m-3"
					onClick={() => this.props.handleSelectedForm(7)}
				>
					Add Expense
				</button>
				<button
					type="button"
					className="btn btn-sm SecondaryButton m-3"
					onClick={() => this.props.handleSelectedForm(3)}
				>
					Add Daily Assistance Fee
				</button>
				<button
					type="button"
					className="btn btn-sm SecondaryButton m-3"
					onClick={() => this.props.handleSelectedForm(2)}
				>
					Add Tour Booking
				</button>
				<button
					type="button"
					className="btn btn-sm SecondaryButton m-3"
					onClick={() => this.props.handleSelectedForm(1)}
				>
					Add WorkDay Hours
				</button>
				<button
					type="button"
					className="btn btn-sm SecondaryButton m-3"
					onClick={() => this.props.handleSelectedForm(4)}
				>
					Add Time Off
				</button>
				<button type="button" className="btn btn-sm SecondaryButton m-3">
					Add Monthly Fee
				</button>
			</div>
		);
	}
}

export default EmployeePayrollButtons;
