import React, { Component } from "react";

class PayrollOverview extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	/**
	 * gets the number of flagged payrolls
	 * @returns num of flagged payrolls
	 */
	getFlaggedPayrollNum = () => {
		let flaggedPayrolls = 0;

		this.props.payrollsToProcess.forEach((e) => {
			if (e.isFlagged === 1) {
				flaggedPayrolls++;
			}
		});

		return flaggedPayrolls;
	};

	/**
	 * controls start of payroll
	 */
	handleStartPayroll = () => {
		if (this.props.payrollsToProcess.length > 0) {
			this.props.handleSceneChange(1);
		} else {
			this.props.setNoPayrollError();
		}
	};

	renderPayrollStatus = () => {
		if (
			this.getFlaggedPayrollNum() > 0 &&
			this.props.payrollsToProcess.length === this.getFlaggedPayrollNum()
		) {
			return (
				<h3>
					{this.getFlaggedPayrollNum()} flagged payrolls awaiting processing
				</h3>
			);
		} else if (
			this.getFlaggedPayrollNum() > 0 &&
			this.props.payrollsToProcess.length > this.getFlaggedPayrollNum()
		) {
			return (
				<h3>
					{this.getFlaggedPayrollNum()} flagged payrolls and{" "}
					{this.props.payrollsToProcess.length - this.getFlaggedPayrollNum()}{" "}
					payrolls awaiting processing
				</h3>
			);
		} else {
			return (
				<h3>
					{this.props.payrollsToProcess.length} payrolls awaiting processing
				</h3>
			);
		}
	};

	render() {
		return (
			<>
				<div className="row">
					<div className="employeeHeader p-4 pt-2 pb-2 text-center">
						<h1>Payroll Overview</h1>
					</div>
				</div>
				<div className="row py-4 align-items-center justify-content-center">
					<div className="col-auto d-inline-flex">
						<select
							className="form-select h-50"
							onChange={this.props.handleYearChange}
							value={this.props.selectedYear}
						>
							<option value={2020}>2020</option>
							<option value={2021}>2021</option>
							<option value={2022}>2022</option>
							<option value={2023}>2023</option>
							<option value={2024}>2024</option>
						</select>
					</div>
					<div className="col-auto d-flex">
						<select
							className="form-select h-50"
							onChange={this.props.handleMonthChange}
							value={this.props.selectedMonth}
						>
							<option value={0}>January</option>
							<option value={1}>Febuary</option>
							<option value={2}>March</option>
							<option value={3}>April</option>
							<option value={4}>May</option>
							<option value={5}>June</option>
							<option value={6}>July</option>
							<option value={7}>August</option>
							<option value={8}>September</option>
							<option value={9}>October</option>
							<option value={10}>November</option>
							<option value={11}>December</option>
						</select>
					</div>
				</div>
				<div className="row my-3">
					<div className="col d-flex justify-content-center">
						{this.renderPayrollStatus()}
					</div>
				</div>
				<div className="row">
					<div className="col d-flex justify-content-center">
						<button
							className="btn btn-lg PrimaryButton"
							onClick={this.handleStartPayroll}
						>
							Start Payroll
						</button>
					</div>
				</div>
				{this.props.noPayrollError && (
					<div className="row my-5">
						<div className="col-2"></div>
						<div
							className=" col-8  alert alert-danger d-flex align-items-center"
							role="alert"
						>
							<div>
								<h3>There are no payrolls to process!</h3>
							</div>
						</div>
						<div className="col-2"></div>
					</div>
				)}
			</>
		);
	}
}

export default PayrollOverview;
