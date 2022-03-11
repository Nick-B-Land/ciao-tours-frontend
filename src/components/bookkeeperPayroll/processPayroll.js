import React, { Component } from "react";
import employeeController from "../../controllers/employeeController";
import payrollDataController from "../../controllers/payrollDataController";

class ProccessPayroll extends Component {
	constructor(props) {
		super(props);
		this.state = {
			payrollIndex: 0,
			payrollsRemaining: this.props.payrollsToProcess.length,
			currentPayroll: this.props.payrollsToProcess[0],
			currentEmployee: {},
			currentPayrollData: [],
			dailyAssistanceCharges: 0,
			tourAdminCharges: 0,
			tourBookingHours: 0,
			expenseCharges: 0,
			totalGrossPay: 0,
		};
	}

	componentDidMount = () => {
		this.loadEmployeeData();
		this.loadPayrollData();
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (prevState.currentEmployee !== this.state.currentEmployee) {
			console.log(this.state.currentEmployee);
		} else if (prevState.currentPayrollData !== this.state.currentPayrollData) {
			console.log(this.state.currentPayrollData);
		} else if (prevState.currentPayroll !== this.state.currentPayroll) {
			console.log("reloading payroll data");
			this.loadEmployeeData();
			this.loadPayrollData();
		}
	};

	loadEmployeeData = async () => {
		let employee = await employeeController.getEmployeeByID(
			this.state.currentPayroll.employeeId
		);

		this.setState({ currentEmployee: employee.data[0] });
	};

	loadPayrollData = async () => {
		let totalAdminHours = 0;
		let totalExpenses = 0;

		let payrollData = await payrollDataController.getPayrollDataByPayrollID(
			this.state.currentPayroll.payrollId
		);

		this.setState({ currentPayrollData: payrollData.data });

		let dailyAssitanceFees = this.state.currentPayrollData.filter(
			(e) => e.payrollEvent === 3
		);

		let tourBookingFees = this.state.currentPayrollData.filter(
			(e) => e.payrollEvent === 2
		);

		let expenseFees = this.state.currentPayrollData.filter(
			(e) => e.payrollEvent === 7
		);

		tourBookingFees.forEach((e) => {
			totalAdminHours += e.tourBookingNumOfHours;
		});

		expenseFees.forEach((e) => {
			totalExpenses += e.expenseAmount;
		});

		this.setState({
			dailyAssistanceCharges: dailyAssitanceFees.length * 9,
			tourAdminCharges: totalAdminHours * 13,
			tourBookingHours: totalAdminHours,
			expenseCharges: totalExpenses,
		});
	};

	handlePaystub = async () => {
		//do paystub submission and error handling (update payroll is processed, create new paystub)

		console.log("handlePaystub fired");

		await this.setState({ payrollIndex: this.state.payrollIndex + 1 });

		console.log(
			this.state.payrollIndex + " " + this.props.payrollsToProcess.length
		);
		if (this.state.payrollIndex >= this.props.payrollsToProcess.length) {
			console.log("index bigger than remaining");
			this.props.handleSceneChange(0);
		} else {
			console.log("updating current payroll");
			this.setState({
				payrollsRemaining: this.state.payrollsRemaining - 1,
				currentPayroll: this.props.payrollsToProcess[this.state.payrollIndex],
			});
		}
	};

	calculateDAFPerClient = (payrollData, clientName) => {
		let count = 0;

		payrollData.forEach((e) => {
			if (e.dailyAssistanceClient === clientName) count++;
		});

		return count;
	};

	renderTourAdminFees = () => {
		let tourBookings = this.state.currentPayrollData.filter(
			(e) => e.payrollEvent === 2
		);

		return tourBookings.map((e) => (
			<div className="row" key={e.payrollDataId}>
				<div className="col">
					<div className="row">
						<div className="col">
							<p>Booking Description: {e.tourBookingAdminDescription}</p>
						</div>
					</div>
					<div className="row">
						<div className="col">
							<p>Client Name: {e.tourBookingClient}</p>
						</div>
						<div className="col">
							<p>Hours: {e.tourBookingNumOfHours}</p>
						</div>
					</div>
				</div>
			</div>
		));
	};

	renderExpenses = () => {
		let expenses = this.state.currentPayrollData.filter(
			(e) => e.payrollEvent === 7
		);

		return expenses.map((e) => (
			<div className="row" key={e.payrollDataId}>
				<div className="col">
					<div className="row">
						<div className="col">
							<p>Expense Description: {e.expenseDescription}</p>
						</div>
					</div>
					<div className="row">
						<div className="col">
							<p>
								Expense Date: {new Date(e.expenseDate).toLocaleDateString()}
							</p>
						</div>
						<div className="col">
							<p>Expense Amount: {e.expenseAmount}</p>
						</div>
					</div>
				</div>
			</div>
		));
	};

	renderDailyAssistanceFees = () => {
		let dailyAssitanceFees = this.state.currentPayrollData.filter(
			(e) => e.payrollEvent === 3
		);

		return dailyAssitanceFees.map((e) => (
			<div className="row" key={e.payrollDataId}>
				<div className="col">
					<p>Client Name: {e.dailyAssistanceClient}</p>
				</div>
				<div className="col">
					<p>
						{" "}
						Total Days:{" "}
						{this.calculateDAFPerClient(
							dailyAssitanceFees,
							e.dailyAssistanceClient
						)}{" "}
					</p>
				</div>
			</div>
		));
	};

	handleDAFInput = (e) => {
		this.setState({ dailyAssistanceCharges: e.target.value });
	};

	handleExpenseInput = (e) => {
		this.setState({ expenseCharges: e.target.value });
	};

	handleBookingHoursInput = (e) => {
		this.setState({ tourBookingHours: e.target.value });
	};

	handleBookingFeesInput = (e) => {
		this.setState({ tourAdminCharges: e.target.value });
	};

	handleGrossInput = (e) => {
		this.setState({ totalGrossPay: e.target.value });
	};

	render() {
		return (
			<>
				<div className="row">
					<div className="employeeHeader p-4 pt-2 pb-2 text-center">
						<h1>Process Payroll</h1>
					</div>
				</div>
				<div className="row">
					<div className="col d-flex justify-content-center">
						<h3>{this.state.payrollsRemaining} payrolls remaining</h3>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<h3>
							Current Payroll:
							{" " +
								this.state.currentEmployee.firstName +
								" " +
								this.state.currentEmployee.lastName}
						</h3>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<h3>Tour Administration Fees</h3>
					</div>
				</div>
				{this.renderTourAdminFees()}
				<div className="row">
					<div className="col">
						<i>Total Hours: {this.state.tourAdminCharges / 13}</i>
					</div>
					<div className="col">
						<i>Administration Total: ${this.state.tourAdminCharges} </i>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<h3>Daily Assistance Fees</h3>
					</div>
				</div>
				{this.renderDailyAssistanceFees()}
				<div className="row">
					<div className="col">
						<i>Total Days: {this.state.dailyAssistanceCharges / 9}</i>
					</div>
					<div className="col">
						<i>Daily Assistance Total: ${this.state.dailyAssistanceCharges} </i>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<h3>Expenses</h3>
					</div>
				</div>
				{this.renderExpenses()}
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
						<p>Daily Assistance Fees: </p>
						{" $ "}
						<input
							type="text"
							value={this.state.dailyAssistanceCharges}
							onChange={this.handleDAFInput}
						/>
					</div>
					<div className="col">
						<p>Expense Fees: </p>
						{" $ "}
						<input
							type="text"
							value={this.state.expenseCharges}
							onChange={this.handleExpenseInput}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<p>Booking Hours: </p>
						{" $ "}
						<input
							type="text"
							value={this.state.tourAdminCharges / 13}
							onChange={this.handleBookingHoursInput}
						/>
					</div>
					<div className="col">
						<p>Booking Fees: </p>
						{" $ "}
						<input
							type="text"
							value={this.state.tourAdminCharges}
							onChange={this.handleBookingFeesInput}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<p>Gross Pay: </p>
						{" $ "}
						<input
							type="text"
							value={
								this.state.expenseCharges +
								this.state.dailyAssistanceCharges +
								this.state.tourAdminCharges
							}
							onChange={this.handleGrossInput}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col d-flex justify-content-center">
						<button
							className="btn PrimaryButton my-5"
							onClick={this.handlePaystub}
						>
							Submit Paystub
						</button>
					</div>
				</div>
			</>
		);
	}
}

export default ProccessPayroll;
