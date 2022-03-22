import React, { Component } from "react";

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
		// console.log("Hourly Payroll Props - CDU");
		// console.log(
		// 	"currentEmployee wage: " + this.props.currentEmployee.hourlyWage
		// );
		// console.log("workDayHours prop: " + this.props.workDayHours);
		// console.log("expenseCharges prop: " + this.props.expenseCharges);
		// console.log("workDayHours state: " + this.state.workDayHours);
		// console.log("expenseCharges state: " + this.state.expenseCharges);
		// console.log("wagePaid state: " + this.state.wagePaid);

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

	setWagePaid = () => {
		let wage = this.props.workDayHours * this.props.currentEmployee.hourlyWage;
		this.props.setWagePaid(wage);
		this.setState({ wagePaid: wage }, () => {
			this.setGrossPay();
		});
	};

	setGrossPay = () => {
		console.log("Set gross pay called");
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

	setNetPay = () => {
		let deductions =
			Number(this.state.cppDeducted) +
			Number(this.state.eiDeducted) +
			Number(this.state.incomeTaxDeducted);

		let net = this.state.grossPay - deductions;

		this.props.setNetPay(net);
		this.setState({ netPay: net });
	};

	handleWorkDayHours = (e) => {
		this.props.setWorkDayHours(e.target.value);
		this.setState({ workDayHours: e.target.value }, this.setGrossPay);
	};

	handleExpenseCharges = (e) => {
		this.props.setExpenseCharges(e.target.value);
		this.setState({ expenseCharges: e.target.value }, this.setGrossPay);
	};

	handleStatHoursWorked = (e) => {
		this.props.setStatHours(e.target.value);
		this.setState({ statHoursWorked: e.target.value }, this.setGrossPay);
	};

	handleIncomeTaxDeducted = (e) => {
		this.props.setIncomeTax(e.target.value);
		this.setState({ incomeTaxDeducted: e.target.value }, this.setNetPay);
	};

	handleCppDeducted = (e) => {
		this.props.setCPPDeductions(e.target.value);
		this.setState({ cppDeducted: e.target.value }, this.setNetPay);
	};

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
						<i>Wage: ${this.props.currentEmployee.hourlyWage}/hr</i>
					</div>
					<div className="col">
						<i>Total Paid: ${this.state.wagePaid} </i>
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
						<i>Total Expenses: ${this.state.expenseCharges}</i>
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
						{" $ "}
						<input
							type="text"
							value={this.state.workDayHours}
							onChange={this.handleWorkDayHours}
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
							value={this.state.expenseCharges}
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
							value={this.state.incomeTaxDeducted}
							onChange={this.handleIncomeTaxDeducted}
						/>
					</div>
					<div className="col">
						<p>CPP Deductions: </p>
						{" $ "}
						<input
							type="text"
							value={this.state.cppDeducted}
							onChange={this.handleCppDeducted}
						/>
					</div>
					<div className="col">
						<p>EI Deductions: </p>
						{" $ "}
						<input
							type="text"
							value={this.state.eiDeducted}
							onChange={this.handleEiDeducted}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<p>Gross Pay: </p>
						{" $ "}
						<input type="text" value={this.state.grossPay} readOnly />
					</div>
					<div className="col">
						<p>Net Pay: </p>
						{" $ "}
						<input type="text" value={this.state.netPay} readOnly />
					</div>
				</div>
			</>
		);
	}
}

export default DomesticHourlyPayroll;
