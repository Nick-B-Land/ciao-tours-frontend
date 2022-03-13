import React, { Component } from "react";

//
// props
// addDailyAssistanceFee - function that uses front end controller to add a payroll data object in employeePayroll
//

class DailyAssistanceForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			clientName: "",
		};
	}

	handleClientNameInput = (e) => {
		this.setState({ clientName: e.target.value });
	};

	handleDailyAssistanceSubmit = () => {
		this.props.addDailyAssistanceFee(this.state.clientName);
	};

	render() {
		return (
			<>
				<div className="row">
					<div className="col mt-2">
						<h3>Add Daily Assistance Fee</h3>
					</div>
				</div>
				<div className="row">
					<div className="col-5 d-flex flex-row-reverse">Client:</div>
					<div className="col">
						<input
							type="text"
							value={this.state.clientName}
							onChange={this.handleClientNameInput}
						/>
					</div>
				</div>
				<div className="row">
					<button
						type="button"
						className="btn PrimaryButton"
						onClick={this.handleDailyAssistanceSubmit}
					>
						Add Fee
					</button>
				</div>
			</>
		);
	}
}

export default DailyAssistanceForm;
