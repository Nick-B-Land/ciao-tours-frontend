import React, { Component } from "react";
import payrollDataController from "../../controllers/payrollDataController";

class MonthlyFeeForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			officeUsage: "",
			phoneUsage: "",
			monthlyFee: [],
		};
	}

	componentDidMount = async () => {
		let payrolldata = await payrollDataController.getPayrollDataByPayrollID(
			this.props.payrollID
		);
		let monthlyFee = payrolldata.data.filter((e) => e.payrollEvent === 5);

		console.log(monthlyFee);
		if (monthlyFee.length > 0) {
			this.setState({
				officeUsage: monthlyFee[0].officeUsage,
				phoneUsage: monthlyFee[0].otherUsage,
				monthlyFee: monthlyFee,
			});
		}
	};

	/**
	 * removes an event from payroll
	 * @param {*} payrollDataId 
	 */
	deletePayrollDataEvent = async (payrollDataId) => {
		let response = await payrollDataController.deletePayrollDataEvent(
			payrollDataId
		);
	};

	/**
	 * controls state for office usage value
	 * @param {} e 
	 */
	handleOfficeUsage = (e) => {
		this.setState({ officeUsage: e.target.value });
	};

	/**
	 * controls state for phone usage value
	 * @param {*} e 
	 */
	handlePhoneUsage = (e) => {
		this.setState({ phoneUsage: e.target.value });
	};

	/**
	 * handles the submit of the new values, saves to database
	 */
	handleUsageSubmit = () => {
		if (this.state.monthlyFee.length > 0) {
			this.deletePayrollDataEvent(this.state.monthlyFee[0].payrollDataId);
			this.props.addMonthlyFees(this.state.officeUsage, this.state.phoneUsage);
		} else {
			this.props.addMonthlyFees(this.state.officeUsage, this.state.phoneUsage);
		}

		this.props.handleSelectedForm(0);
	};

	/**
	 * cancels form by clearing the screen
	 */
	handleCancel = () => {
		this.props.handleSelectedForm(0);
	};

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
							Add Fees
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
