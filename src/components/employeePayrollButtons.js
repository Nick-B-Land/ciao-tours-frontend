import React, { Component } from "react";
import DailyAssistanceForm from "./dailyAssistanceForm";

class EmployeePayrollButtons extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toggleDailyAssistance: false,
		};
	}

	handleDailyAssistanceToggle = () => {
		console.log("toggle fired");
		this.setState({ toggleDailyAssistance: !this.state.toggleDailyAssistance });
	};

	render() {
		return (
			<>
				<div className="row">
					<div className="col d-flex justify-content-center">
						<button type="button" className="btn btn-lg PrimaryButton">
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
									onClick={this.handleDailyAssistanceToggle}
								>
									Add Daily Assistance Fee
								</button>
							</div>
						</div>
						{this.state.toggleDailyAssistance ? (
							<DailyAssistanceForm
								addDailyAssistanceFee={this.props.addDailyAssistanceFee}
							/>
						) : null}
					</div>
				</div>
				<div className="row">
					<div className="col d-flex justify-content-center">
						<button type="button" className="btn btn-lg PrimaryButton m-3">
							Add Tour Booking
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
