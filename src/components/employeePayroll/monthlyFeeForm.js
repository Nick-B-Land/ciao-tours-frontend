import React, { Component } from "react";
import payrollDataController from "../../controllers/payrollDataController";


class MonthlyFeeForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			officeUsage: "",
			phoneUsage: ""
		}
	}

	componentDidMount = async () => {
		let payrolldata = await payrollDataController.getPayrollDataByPayrollID(this.props.payrollID);
		let monthlyFee = payrolldata.filter(e => e.payrollEvent === 5);
		this.setState({officeUsage: monthlyFee[0].officeUsage, phoneUsage: monthlyFee[0].otherUsage});
	}

	handleOfficeUsage(e) {
		this.setState({officeUsage: e.target.value});
	}

	handlePhoneUsage(e) {
		this.setState({phoneUsage: e.target.value});
	}

	handleUsageSubmit() {
		this.props.addMonthlyFees(this.state.officeUsage, this.state.phoneUsage);
		this.props.handleSelectedForm(0);
	}

	handleCancel = () => {
		this.props.handleSelectedForm(0);
	}

    render() {
		return (
			<>
				<div className="row">
					<div className="col mt-2">
						<h3>Add Monthly Fees</h3>
					</div>
				</div>
				<div className="row">
					<div className="col">Office Usage</div>
				</div>
				<div className="row">
					<div className="col">
						<input
							type="text"
							value={this.state.officeUsage}
							onChange={this.handleOfficeUsage}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">Phone Usage</div>
				</div>
				<div className="row">
					<div className="col">
						<input
							type="text"
							value={this.state.phoneUsage}
							onChange={this.handlePhoneUsage}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<button
							type="button"
							className="btn PrimaryButton mt-3 ms-0"
							onClick={this.handleUsageSubmit}
						>
							Add WorkDay
						</button>
						<button
							type="button"
							className="btn PrimaryButton mt-3 ms-3"
							onClick={this.handleCancel}
						>
							Cancel
						</button>
					</div>
					
				</div>
			</>
		);
	}
}
export default MonthlyFeeForm;