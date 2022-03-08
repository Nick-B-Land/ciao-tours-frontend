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
			<>
				<div className="row">
					<div className="col d-flex justify-content-center">
						<button
							type="button"
							className="btn btn-lg PrimaryButton"
							onClick={() => this.props.handleSelectedForm(7)}
						>
							Add Expense
						</button>
					</div>
				</div>
				<div className="row flex-nowrap">
					<div className="col d-flex flex-column justify-content-center">
						<div className="row">
							<div className="col">
								<button
									type="button"
									className="btn btn-lg PrimaryButton m-3"
									onClick={() => this.props.handleSelectedForm(3)}
								>
									Add Daily Assistance Fee
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col d-flex justify-content-center">
						<button
							type="button"
							className="btn btn-lg PrimaryButton m-3"
							onClick={() => this.props.handleSelectedForm(2)}
						>
							Add Tour Booking
						</button>
					</div>
				</div>
				<div className="row">
					<div className="col d-flex justify-content-center">
						<button
							type="button"
							className="btn btn-lg PrimaryButton m-3"
							onClick={() => this.props.handleSelectedForm(1)}
						>
							Add WorkDay Hours
						</button>
					</div>
				</div>
				<div className="row">
					<div className="col d-flex justify-content-center">
						<button
							type="button"
							className="btn btn-lg PrimaryButton m-3"
							onClick={() => this.props.handleSelectedForm(4)}
						>
							Add Time Off
						</button>
					</div>
				</div>
				<div className="row">
					<div className="col d-flex justify-content-center">
						<button type="button" className="btn btn-lg PrimaryButton m-3">
							Add Monthly Fee
						</button>
					</div>
				</div>
			</>
		);
	}
}

export default EmployeePayrollButtons;
