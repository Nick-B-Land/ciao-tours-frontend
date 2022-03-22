import React, { Component } from "react";
import employeeController from "../../controllers/employeeController";
import payrollController from "../../controllers/payrollController";
import payrollDataController from "../../controllers/payrollDataController";
import paystubController from "../../controllers/paystubController";
import DomesticHourlyPayroll from "./domesticHourlyPayroll";
import DomesticSalaryPayroll from "./domesticSalaryPayroll";
import ItalianPayroll from "./italianPayroll";

class ProccessPayroll extends Component {
	constructor(props) {
		super(props);
		this.state = {
			payrollIndex: 0,
			payrollsRemaining: this.props.payrollsToProcess.length,
			currentPayroll: this.props.payrollsToProcess[0],
			currentEmployee: {},
			currentPayrollData: [],
			dailyAssistanceFees: 0,
			dailyAssistanceCharges: 0,
			tourBookingHours: 0,
			tourBookingCharges: 0,
			expenseCharges: 0,
			workDayHours: 0,
			timeOffHours: 0,
			statHours: null,
			wagePaid: 0,
			incomeTax: null,
			cppDeductions: null,
			eiDeductions: null,
			grossPay: 0,
			netPay: null,
		};
	}

	componentDidMount = () => {
		this.loadEmployeeData();
		this.loadPayrollData();
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (prevState.currentEmployee !== this.state.currentEmployee) {
			console.log(this.state.currentEmployee);
			// this.loadEmployeeData();
			// this.loadPayrollData();
		} else if (prevState.currentPayrollData !== this.state.currentPayrollData) {
			//console.log(this.state.currentPayrollData);
			// this.loadEmployeeData();
			// this.loadPayrollData();
		} else if (prevState.currentPayroll !== this.state.currentPayroll) {
			console.log("reloading payroll data");
			console.log("");
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
		let payrollData = await payrollDataController.getPayrollDataByPayrollID(
			this.state.currentPayroll.payrollId
		);

		//this is bad, shouldnt have two set states together
		//no gurantee on what finishes first (i thinkm)
		this.setState({ currentPayrollData: payrollData.data }, () => {
			this.handlePayrollData();
		});
	};

	handlePayrollData = () => {
		console.log("handle payroll data called");
		let totalAdminHours = 0;
		let totalExpenses = 0;
		let totalWorkDayHours = 0;
		let totalTimeOff = 0;

		let workDays = this.state.currentPayrollData.filter(
			(e) => e.payrollEvent === 1
		);

		let timeOff = this.state.currentPayrollData.filter(
			(e) => e.payrollEvent === 4
		);

		let dailyAssistanceFees = this.state.currentPayrollData.filter(
			(e) => e.payrollEvent === 3
		);

		let tourBookingFees = this.state.currentPayrollData.filter(
			(e) => e.payrollEvent === 2
		);

		let expenseFees = this.state.currentPayrollData.filter(
			(e) => e.payrollEvent === 7
		);

		timeOff.forEach((e) => {
			totalTimeOff += e.timeOff;
		});

		workDays.forEach((e) => {
			totalWorkDayHours += e.noOfWorkingHours;
		});

		tourBookingFees.forEach((e) => {
			totalAdminHours += e.tourBookingNumOfHours;
		});

		expenseFees.forEach((e) => {
			totalExpenses += e.expenseAmount;
		});

		//console.log("Parent daily assistance: " + dailyAssistanceFees.length * 9);

		this.setState({
			dailyAssistanceFees: dailyAssistanceFees.length,
			tourBookingHours: totalAdminHours,
			expenseCharges: totalExpenses,
			workDayHours: totalWorkDayHours,
			timeOffHours: totalTimeOff,
		});
	};

	createPaystubByEmployeeType = () => {
		//hourly
		if (this.state.currentEmployee.employeeType === 0) {
			let paystubObj = {
				paystubId: "",
				employeeId: this.state.currentEmployee.employeeId,
				dateOfPaystub: this.state.currentPayroll.dateOfPayroll,
				firstName: this.state.currentEmployee.firstName,
				lastName: this.state.currentEmployee.lastName,
				address: this.state.currentEmployee.address,
				city: this.state.currentEmployee.city,
				emailAddress: this.state.currentEmployee.emailAddress,
				monthlySalary: this.state.currentEmployee.monthlySalary,
				hourlyWage: this.state.currentEmployee.hourlyWage,
				timeOffHours: this.state.timeOffHours,
				dailyAssistanceNumber: null,
				dailyAssistanceCharges: null,
				tourBookingHours: null,
				tourBookingCharges: null,
				expenseAmount: this.state.expenseCharges,
				workDayHours: this.state.workDayHours,
				workDayCharges: this.state.wagePaid,
				statHours: this.state.statHours,
				incomeTax: this.state.incomeTax,
				cppDeductions: this.state.cppDeductions,
				eiDeductions: this.state.eiDeductions,
				grossPay: this.state.grossPay,
				netPay: this.state.netPay,
			};
			return paystubObj;
		} //salary
		else if (this.state.currentEmployee.employeeType === 1) {
			let paystubObj = {
				paystubId: "",
				employeeId: this.state.currentEmployee.employeeId,
				dateOfPaystub: this.state.currentPayroll.dateOfPayroll,
				firstName: this.state.currentEmployee.firstName,
				lastName: this.state.currentEmployee.lastName,
				address: this.state.currentEmployee.address,
				city: this.state.currentEmployee.city,
				emailAddress: this.state.currentEmployee.emailAddress,
				monthlySalary: this.state.currentEmployee.monthlySalary,
				hourlyWage: this.state.currentEmployee.hourlyWage,
				timeOffHours: this.state.timeOffHours,
				dailyAssistanceNumber: null,
				dailyAssistanceCharges: null,
				tourBookingHours: null,
				tourBookingCharges: null,
				expenseAmount: this.state.expenseCharges,
				workDayHours: null,
				workDayCharges: null,
				statHours: this.state.statHours,
				incomeTax: this.state.incomeTax,
				cppDeductions: this.state.cppDeductions,
				eiDeductions: this.state.eiDeductions,
				grossPay: this.state.grossPay,
				netPay: this.state.netPay,
			};
			return paystubObj;
		} // italian
		else if (this.state.currentEmployee.employeeType === 2) {
			let paystubObj = {
				paystubId: "",
				employeeId: this.state.currentEmployee.employeeId,
				dateOfPaystub: this.state.currentPayroll.dateOfPayroll,
				firstName: this.state.currentEmployee.firstName,
				lastName: this.state.currentEmployee.lastName,
				address: this.state.currentEmployee.address,
				city: this.state.currentEmployee.city,
				emailAddress: this.state.currentEmployee.emailAddress,
				monthlySalary: this.state.currentEmployee.monthlySalary,
				hourlyWage: this.state.currentEmployee.hourlyWage,
				timeOffHours: this.state.timeOffHours,
				dailyAssistanceNumber: this.state.dailyAssistanceFees,
				dailyAssistanceCharges: this.state.dailyAssistanceCharges,
				tourBookingHours: this.state.tourBookingHours,
				tourBookingCharges: this.state.tourBookingCharges,
				expenseAmount: this.state.expenseCharges,
				workDayHours: null,
				workDayCharges: null,
				statHours: null,
				incomeTax: null,
				cppDeductions: null,
				eiDeductions: null,
				grossPay: this.state.grossPay,
				netPay: this.state.grossPay,
			};
			return paystubObj;
		}
	};

	setWorkDayHours = (wdHours) => {
		this.setState({ workDayHours: wdHours });
	};

	setTourBookingHours = (tbHours) => {
		this.setState({ tourBookingHours: tbHours });
	};

	setTourBookingCharges = (tbCharges) => {
		this.setState({ tourBookingCharges: tbCharges });
	};

	setDailyAssistanceFees = (daf) => {
		this.setState({ dailyAssistanceFees: daf });
	};

	setDailyAssistanceCharges = (daCharges) => {
		this.setState({ dailyAssistanceCharges: daCharges });
	};

	setExpenseCharges = (exp) => {
		this.setState({ expenseAmount: exp });
	};

	setWagePaid = (wageEarned) => {
		this.setState({ wagePaid: wageEarned });
	};

	setStatHours = (sHours) => {
		this.setState({ statHours: sHours });
	};

	setIncomeTax = (iTax) => {
		this.setState({ incomeTax: iTax });
	};

	setCPPDeductions = (cpp) => {
		this.setState({ cppDeductions: cpp });
	};

	setEIDeductions = (ei) => {
		this.setState({ eiDeductions: ei });
	};

	setGrossPay = (gross) => {
		this.setState({ grossPay: gross });
	};

	setNetPay = (net) => {
		this.setState({ netPay: net });
	};

	handlePaystub = async () => {
		//do paystub submission and error handling (update payroll is processed, create new paystub)

		let paystub = this.createPaystubByEmployeeType();

		let paystubResponse = await paystubController.createPaystub(paystub);

		console.log(paystubResponse);

		if (paystubResponse.status === 200) {
		}

		let newPayroll = {
			payrollId: this.state.currentPayroll.payrollId,
			employeeId: this.state.currentPayroll.employeeId,
			dateOfPayroll: this.state.currentPayroll.dateOfPayroll,
			isProcessed: 1,
			isFlagged: 0,
		};

		let payrollResponse = await payrollController.updatePayroll(
			newPayroll,
			this.state.currentPayroll.payrollId
		);

		console.log(payrollResponse);

		if (this.state.payrollIndex + 1 >= this.props.payrollsToProcess.length) {
			this.props.handleSceneChange(0);
		} else {
			this.setState(
				(prevState) => ({
					payrollsRemaining: prevState.payrollsRemaining - 1,
					currentPayroll:
						this.props.payrollsToProcess[prevState.payrollIndex + 1],
					payrollIndex: prevState.payrollIndex + 1,
				}),
				() => console.log(this.state.currentPayroll)
			);
		}
	};

	calculateDAFPerClient = (payrollData, clientName) => {
		let count = 0;

		payrollData.forEach((e) => {
			if (e.dailyAssistanceClient === clientName) count++;
		});

		return count;
	};

	calculateStartEndDates = (payrollData, clientName) => {
		let startDate, endDate;

		if (payrollData.length > 0) {
			//console.log(startDate + " " + endDate);

			payrollData.forEach((e) => {
				let tempDate = new Date(e.dailyAssistanceStartDate);

				//console.log("Temp date " + tempDate);

				if (e.dailyAssistanceClient === clientName) {
					if (!startDate || !endDate) {
						startDate = new Date(e.dailyAssistanceStartDate);
						endDate = new Date(e.dailyAssistanceStartDate);
					}

					if (tempDate < startDate) {
						startDate = tempDate;
						//console.log("Start date changed");
					}

					if (tempDate > endDate) {
						endDate = tempDate;
						//console.log("End date changed");
					}
				}
			});
		}

		return (
			<p>
				Start Date: {startDate.toLocaleDateString()} - End Date:{" "}
				{endDate.toLocaleDateString()}
			</p>
		);
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

		if (expenses.length > 0) {
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
		} else {
			return (
				<div className="row">
					<div className="col">
						<p>No expenses claimed</p>
					</div>
				</div>
			);
		}
	};

	renderDailyAssistanceFees = () => {
		let uniqueDailyAssistanceClients = [];
		let dailyAssistanceFees = this.state.currentPayrollData.filter(
			(e) => e.payrollEvent === 3
		);

		//more efficient way to do this for sure
		//get array of unique daily assistance clients
		for (let i = 0; i < dailyAssistanceFees.length; ++i) {
			let temp = dailyAssistanceFees[i];
			let matchFound = false;
			for (let j = 0; j < uniqueDailyAssistanceClients.length; ++j) {
				let uniqueTemp = uniqueDailyAssistanceClients[j];
				if (temp.dailyAssistanceClient === uniqueTemp.dailyAssistanceClient) {
					matchFound = true;
					break;
				}
			}
			if (!matchFound) uniqueDailyAssistanceClients.push(temp);
		}

		return uniqueDailyAssistanceClients.map((e) => (
			<div className="row" key={e.payrollDataId}>
				<div className="col">
					<p>Client Name: {e.dailyAssistanceClient}</p>
				</div>
				<div className="col">
					<p>
						{" "}
						Total Days:{" "}
						{this.calculateDAFPerClient(
							dailyAssistanceFees,
							e.dailyAssistanceClient
						)}{" "}
					</p>
				</div>
				<div className="col">
					{this.calculateStartEndDates(
						dailyAssistanceFees,
						e.dailyAssistanceClient
					)}
				</div>
			</div>
		));
	};

	renderWorkDays = () => {
		let workDays = this.state.currentPayrollData.filter(
			(e) => e.payrollEvent === 1
		);

		return workDays.map((e) => (
			<div className="row" key={e.payrollDataId}>
				<div className="col">
					<p>Date: {new Date(e.dateOfPayrollData).toLocaleDateString()}</p>
				</div>
				<div className="col">
					<p>Hours: {e.noOfWorkingHours}</p>
				</div>
			</div>
		));
	};

	renderTimeOff = () => {
		let timeOffDays = this.state.currentPayrollData.filter(
			(e) => e.payrollEvent === 4
		);

		if (timeOffDays.length > 0) {
			return timeOffDays.map((e) => (
				<div className="row" key={e.payrollDataId}>
					<div className="col">
						<div className="row">
							<div className="col">
								<p>
									Date: {new Date(e.dateOfPayrollData).toLocaleDateString()}
								</p>
							</div>
							<div className="col">
								<p>Hours Off: {e.timeOff}</p>
							</div>
						</div>
					</div>
				</div>
			));
		} else {
			return (
				<div className="row">
					<div className="col">
						<p>No Time Off</p>
					</div>
				</div>
			);
		}
	};

	renderPayrollForm = () => {
		if (this.state.currentEmployee.employeeType === 2) {
			// console.log("Rendering Italian Payroll -");
			// console.log(
			// 	"currentEmployee fname: " + this.state.currentEmployee.firstName
			// );
			// console.log("dailyAssistanceFees: " + this.state.dailyAssistanceFees);
			// console.log("expenseCharges: " + this.state.expenseCharges);
			// console.log("tourBookingHours: " + this.state.tourBookingHours);
			return (
				<ItalianPayroll
					renderTourAdminFees={this.renderTourAdminFees}
					renderDailyAssistanceFees={this.renderDailyAssistanceFees}
					renderExpenses={this.renderExpenses}
					currentEmployee={this.state.currentEmployee}
					dailyAssistanceFees={this.state.dailyAssistanceFees}
					expenseCharges={this.state.expenseCharges}
					tourBookingHours={this.state.tourBookingHours}
					setGrossPay={this.setGrossPay}
					setExpenseCharges={this.setExpenseCharges}
					setTourBookingHours={this.setTourBookingHours}
					setTourBookingCharges={this.setTourBookingCharges}
					setDailyAssistanceFees={this.setDailyAssistanceFees}
					setDailyAssistanceCharges={this.setDailyAssistanceCharges}
				/>
			);
		} else if (this.state.currentEmployee.employeeType === 1) {
			// console.log("Rendering Salary Payroll -");
			// console.log(
			// 	"currentEmployee Salary: " + this.state.currentEmployee.monthlySalary
			// );
			// console.log("timeOffHours: " + this.state.timeOffHours);
			// console.log("expenseCharges: " + this.state.expenseCharges);
			return (
				<DomesticSalaryPayroll
					renderExpenses={this.renderExpenses}
					renderTimeOff={this.renderTimeOff}
					currentEmployee={this.state.currentEmployee}
					timeOffHours={this.state.timeOffHours}
					expenseCharges={this.state.expenseCharges}
					setGrossPay={this.setGrossPay}
					setNetPay={this.setNetPay}
					setExpenseCharges={this.setExpenseCharges}
					setEIDeductions={this.setEIDeductions}
					setCPPDeductions={this.setCPPDeductions}
					setIncomeTax={this.setIncomeTax}
					setStatHours={this.setStatHours}
				/>
			);
		} else if (this.state.currentEmployee.employeeType === 0) {
			// console.log("Rendering Hourly Payroll -");
			// console.log(
			// 	"currentEmployee wage: " + this.state.currentEmployee.hourlyWage
			// );
			// console.log("workDayHours: " + this.state.workDayHours);
			// console.log("expenseCharges: " + this.state.expenseCharges);
			return (
				<DomesticHourlyPayroll
					renderWorkDays={this.renderWorkDays}
					renderExpenses={this.renderExpenses}
					currentEmployee={this.state.currentEmployee}
					workDayHours={this.state.workDayHours}
					expenseCharges={this.state.expenseCharges}
					setEIDeductions={this.setEIDeductions}
					setCPPDeductions={this.setCPPDeductions}
					setIncomeTax={this.setIncomeTax}
					setStatHours={this.setStatHours}
					setExpenseCharges={this.setExpenseCharges}
					setWorkDayHours={this.setWorkDayHours}
					setGrossPay={this.setGrossPay}
					setNetPay={this.setNetPay}
					setWagePaid={this.setWagePaid}
				/>
			);
		}
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
				{this.renderPayrollForm()}
				<div className="row">
					<div className="col d-flex justify-content-around">
						<button className="btn SecondaryButton my-5">Flag Payroll</button>
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
