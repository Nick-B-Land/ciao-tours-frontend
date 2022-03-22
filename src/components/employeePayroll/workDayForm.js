import React, { Component } from "react";

//
// props
// addDailyAssistanceFee - function that uses front end controller to add a payroll data object in employeePayroll
//

class WorkDayForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			numHours: "",
		};
	}

	handleNumHoursInput = (e) => {
		this.setState({ numHours: e.target.value });
	};

	handleWorkDaySubmit = () => {
		this.props.addWorkDay(this.state.numHours);
	};

	render() {
		return (
			<>
				<div className="row">
					<div className="col mt-2">
						<h3>Add Work Day</h3>
					</div>
				</div>
				<div className="row">
					<div className="col-5 d-flex flex-row-reverse">Number of Hours:</div>
					<div className="col">
						<input
							type="text"
							value={this.state.numHours}
							onChange={this.handleNumHoursInput}
						/>
					</div>
				</div>
				<div className="row">
					<button
						type="button"
						className="btn PrimaryButton"
						onClick={this.handleWorkDaySubmit}
					>
						Add WorkDay
					</button>
				</div>
			</>
		);
	}
}

export default WorkDayForm;
