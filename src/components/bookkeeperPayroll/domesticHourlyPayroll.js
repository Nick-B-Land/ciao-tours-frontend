import React, { Component } from "react";

/**
 * DomesticHourlyPayroll
 * Purpose: holds all of the functions for filing a domestic hourly payroll
 */
class DomesticHourlyPayroll extends Component {
	constructor(props) {
		super(props);
		this.state = {
			workDayHours: this.props.workDayHours,
			expenseCharges: this.props.expenseCharges,
			statHoursWorked: 0,
			wagePaid: 0,
			incomeTaxDeducted: 0,
			cppDeducted: 0,
			eiDeducted: 0,
			grossPay: 0,
			netPay: 0,
		};
	}

	componentDidMount = () => {
		this.setWagePaid();
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (prevProps.workDayHours !== this.props.workDayHours) {
			this.setState({ workDayHours: this.props.workDayHours }, () => {
				this.setWagePaid();
			});
			this.setState({ expenseCharges: this.props.expenseCharges }, () =>
				this.setGrossPay()
			);
		} else if (prevProps.expenseCharges !== this.props.expenseCharges) {
			this.setState({ workDayHours: this.props.workDayHours }, () => {
				this.setWagePaid();
			});
			this.setState({ expenseCharges: this.props.expenseCharges }, () =>
				this.setGrossPay()
			);
		}
	};

	/**
	 * controlling the state for the wages paid by company
	 */
	setWagePaid = () => {
		let wage = this.props.workDayHours * this.props.currentEmployee.hourlyWage;
		this.props.setWagePaid(wage);
		this.props.setIncomeTax(wage * 0.15);
		this.props.setCPPDeductions(wage * 0.0525);
		this.props.setEIDeductions(wage * 0.019);
		this.setState(
			{
				wagePaid: wage,
				incomeTaxDeducted: wage * 0.15,
				cppDeducted: wage * 0.0525,
				eiDeducted: wage * 0.019,
			},
			() => {
				this.setGrossPay();
			}
		);
	};

	/**
	 * sets the gross pay for the payroll object
	 */
	setGrossPay = () => {
		let wagePaid =
			this.state.workDayHours * this.props.currentEmployee.hourlyWage;
		let gross = wagePaid;
		if (this.state.expenseCharges) gross += Number(this.state.expenseCharges);

		if (this.state.statHoursWorked > 0) {
			let statRate = this.props.currentEmployee.hourlyWage * 1.5;

			gross =
				(this.state.workDayHours - this.state.statHoursWorked) *
				this.props.currentEmployee.hourlyWage;

			gross += this.state.statHoursWorked * statRate;
		}

		this.props.setGrossPay(gross);
		this.setState({ grossPay: gross }, this.setNetPay);
	};

	/**
	 * sets the net pay for the payroll object
	 */
	setNetPay = () => {
		let deductions =
			Number(this.state.cppDeducted) +
			Number(this.state.eiDeducted) +
			Number(this.state.incomeTaxDeducted);

		let net = this.state.grossPay - deductions;

		this.props.setNetPay(net);
		this.setState({ netPay: net });
	};

	/**
	 * controls state for work day hours
	 * @param {*} e 
	 */
	handleWorkDayHours = (e) => {
		this.props.setWorkDayHours(e.target.value);
		this.setState({ workDayHours: e.target.value }, this.setGrossPay);
	};

	/**
	 * control state expense for payroll
	 * @param {*} e 
	 */
	handleExpenseCharges = (e) => {
		this.props.setExpenseCharges(e.target.value);
		this.setState({ expenseCharges: e.target.value }, this.setGrossPay);
	};

	/**
	 * control state for stat hours worked
	 * @param {*} e 
	 */
	handleStatHoursWorked = (e) => {
		this.props.setStatHours(e.target.value);
		this.setState({ statHoursWorked: e.target.value }, this.setGrossPay);
	};

	/**
	 * controls state for income tax deductions
	 * @param {} e 
	 */
	handleIncomeTaxDeducted = (e) => {
		this.props.setIncomeTax(e.target.value);
		this.setState({ incomeTaxDeducted: e.target.value }, this.setNetPay);
	};

	/**
	 * controls state for cpp deductions
	 * @param {*} e 
	 */
	handleCppDeducted = (e) => {
		this.props.setCPPDeductions(e.target.value);
		this.setState({ cppDeducted: e.target.value }, this.setNetPay);
	};

	/**
	 * controls state for ei deductions
	 * @param {*} e 
	 */
	handleEiDeducted = (e) => {
		this.props.setEIDeductions(e.target.value);
		this.setState({ eiDeducted: e.target.value }, this.setNetPay);
	};

	render() {
		return (
			<>
				<div className="row">
					<div className="col">
						<h3>Hours Worked</h3>
					</div>
				</div>
				{this.props.renderWorkDays()}
				<div className="row">
					<div className="col">
						<i>Total Hours: {this.props.workDayHours}</i>
					</div>
					<div className="col">
						<i>Wage: ${this.props.currentEmployee.hourlyWage.toFixed(2)}/hr</i>
					</div>
					<div className="col">
						<i>Total Paid: ${this.state.wagePaid.toFixed(2)} </i>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<h3>Expenses</h3>
					</div>
				</div>
				{this.props.renderExpenses()}
				<div className="row">
					<div className="col">
						<i>Total Expenses: ${this.state.expenseCharges.toFixed(2)}</i>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<h3>Paystub</h3>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<p>Hours Worked: </p>
						<input
							type="text"
							value={this.state.workDayHours}
							onChange={this.handleWorkDayHours}
						/>
					</div>
					<div className="col">
						<p>Stat Hours Worked: </p>
						<input
							type="text"
							value={this.state.statHoursWorked}
							onChange={this.handleStatHoursWorked}
						/>
					</div>
					<div className="col">
						<p>Expenses Claimed: </p>
						{" $ "}
						<input
							type="text"
							value={this.state.expenseCharges.toFixed(2)}
							onChange={this.handleExpenseCharges}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<p>Income Tax: </p>
						{" $ "}
						<input
							type="text"
							value={this.state.incomeTaxDeducted.toFixed(2)}
							onChange={this.handleIncomeTaxDeducted}
						/>
					</div>
					<div className="col">
						<p>CPP Deductions: </p>
						{" $ "}
						<input
							type="text"
							value={this.state.cppDeducted.toFixed(2)}
							onChange={this.handleCppDeducted}
						/>
					</div>
					<div className="col">
						<p>EI Deductions: </p>
						{" $ "}
						<input
							type="text"
							value={this.state.eiDeducted.toFixed(2)}
							onChange={this.handleEiDeducted}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<p>Gross Pay: </p>
						{" $ "}
						<input
							type="text"
							value={this.state.grossPay.toFixed(2)}
							readOnly
						/>
					</div>
					<div className="col">
						<p>Net Pay: </p>
						{" $ "}
						<input type="text" value={this.state.netPay.toFixed(2)} readOnly />
					</div>
				</div>
			</>
		);
	}
}

export default DomesticHourlyPayroll;
