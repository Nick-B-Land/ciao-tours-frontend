import React, { Component } from "react";

class DomesticSalaryPayroll extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timeOffHours: this.props.timeOffHours,
			expenseCharges: this.props.expenseCharges,
			statHoursWorked: 0,
			incomeTaxDeducted: 0,
			cppDeducted: 0,
			eiDeducted: 0,
			grossPay: 0,
			netPay: 0,
		};
	}

	componentDidMount = () => {
		this.setGrossPay();
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (prevProps.timeOffHours !== this.props.timeOffHours) {
			this.setState({ timeOffHours: this.props.timeOffHours });
			this.setState({ expenseCharges: this.props.expenseCharges }, () =>
				this.setGrossPay()
			);
		} else if (prevProps.expenseCharges !== this.props.expenseCharges) {
			this.setState({ timeOffHours: this.props.timeOffHours });
			this.setState({ expenseCharges: this.props.expenseCharges }, () =>
				this.setGrossPay()
			);
		}
	};

	/**
	 * sets the gross pay for the payroll object
	 */
	setGrossPay = () => {
		let gross = this.props.currentEmployee.monthlySalary;

		if (this.state.expenseCharges) gross += Number(this.state.expenseCharges);

		this.props.setIncomeTax(gross * 0.15);
		this.props.setCPPDeductions(gross * 0.0525);
		this.props.setEIDeductions(gross * 0.019);

		this.props.setGrossPay(gross);
		this.setState(
			{
				grossPay: gross,
				incomeTaxDeducted: gross * 0.15,
				cppDeducted: gross * 0.0525,
				eiDeducted: gross * 0.019,
			},
			this.setNetPay
		);
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
	 * control state for stat hours worked
	 * @param {*} e 
	 */
	handleStatHoursWorked = (e) => {
		this.props.setStatHours(e.target.value);
		this.setState({ statHoursWorked: e.target.value }, this.setGrossPay);
	};

	/**
	 * controls state for expenses
	 * @param {*} e 
	 */
	handleExpenseCharges = (e) => {
		this.props.setExpenseCharges(e.target.value);
		this.setState({ expenseCharges: e.target.value }, this.setGrossPay);
	};

	/**
	 * controls state for income taxes
	 * @param {*} e 
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
						<h3>Salary</h3>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<i>Monthly Salary: ${this.props.currentEmployee.monthlySalary} </i>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<h3>Time Off</h3>
					</div>
				</div>
				{this.props.renderTimeOff()}
				<div className="row">
					<div className="col">
						<i>Total Time Off: {this.state.timeOffHours} hours</i>
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
						<p>Salary: </p>
						{" $ "}
						<input
							type="text"
							value={this.props.currentEmployee.monthlySalary}
							readOnly
						/>
					</div>
					<div className="col">
						<p>Stat Hours Worked: </p>
						{" $ "}
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
							readOnly={true}
						/>
					</div>
					<div className="col">
						<p>Net Pay: </p>
						{" $ "}
						<input
							type="text"
							value={this.state.netPay.toFixed(2)}
							readOnly={true}
						/>
					</div>
				</div>
			</>
		);
	}
}

export default DomesticSalaryPayroll;
