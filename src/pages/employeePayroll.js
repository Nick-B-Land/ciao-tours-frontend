import React, { Component } from "react";
import BottomEmpNav from "../components/bottomEmpNav";
import EmployeePayrollButtons from "../components/employeePayrollButtons";
import EmployeePayrollCalender from "../components/employeePayrollCalendar";
import EmployeePayrollForm from "../components/employeePayrollForm";
import payrollController from "../controllers/payrollController";
import payrollDataController from "../controllers/payrollDataController";
import TopNavWrapper from "../functionalComponents/topNavWrapper";

class EmployeePayroll extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedMonth: 0,
			selectedYear: 2020,
			selectedPayrollID: 0,
			selectedDay: "",
			payrollData: [],
			selectedForm: 0,
		};
	}

	componentDidMount = () => {
		console.log(this.props.currentUser);
		this.setState({
			selectedMonth: new Date().getMonth(),
			selectedYear: new Date().getFullYear(),
		});
	};

	componentDidUpdate(prevProps, prevState) {
		console.log("componentDidUpdate Fired");
		if (this.state.selectedMonth !== prevState.selectedMonth) {
			this.handlePayrollObject();
			this.loadPayrollData();
		} else if (this.state.selectedYear !== prevState.selectedYear) {
			this.handlePayrollObject();
			this.loadPayrollData();
		} else if (this.state.selectedPayrollID !== prevState.selectedPayrollID) {
			this.loadPayrollData();
		}
	}

	//loads payrollData objects for the selected months payroll
	loadPayrollData = async () => {
		let payrollDataResponse =
			await payrollDataController.getPayrollDataByPayrollID(
				this.state.selectedPayrollID
			);

		this.setState({ payrollData: payrollDataResponse.data });

		console.log(this.state.payrollData);
	};

	//function for adding a daily assistance fee type payroll data object
	//will need similar functions for all payroll data events
	//passed to the button components
	addDailyAssistanceFee = async (clientName) => {
		let dataDay = new Date(this.state.selectedDay);
		const DAILY_ASSISTANCE_FEE_PER_DAY_IN_EUROS = 9;

		let newPayrollData = {
			payrollDataId: "",
			payrollId: this.state.selectedPayrollID,
			payrollEvent: 3,
			dateOfPayrollData: dataDay.toISOString(),
			noOfWorkingHours: null,
			timeOff: null,
			officeUsage: null,
			otherUseage: null,
			usageCost: null,
			dailyAssistanceClient: clientName,
			dailyAssistanceStartDate: dataDay.toISOString(),
			dailyAssistanceEndDate: dataDay.toISOString(),
			dailyAssistanceFee: DAILY_ASSISTANCE_FEE_PER_DAY_IN_EUROS,
			tourBookingAdminDescription: null,
			tourBookingNumOfHours: null,
			tourBookingClient: null,
			tourBookingAdminFee: null,
			dayOfExpense: null,
			expenseDescription: null,
			expenseAmount: null,
			expenseDate: null,
		};

		let response = await payrollDataController.createPayrollData(
			newPayrollData
		);

		console.log(response);

		this.loadPayrollData();
	};

	addTourBooking = async (bookingInfoDesc, numHours, clientName) => {
		let dataDay = new Date(this.state.selectedDay);

		const BOOKING_RATE_PER_HOUR = 13;

		let newPayrollData = {
			payrollDataId: "",
			payrollId: this.state.selectedPayrollID,
			payrollEvent: 2,
			dateOfPayrollData: dataDay.toISOString(),
			noOfWorkingHours: null,
			timeOff: null,
			officeUsage: null,
			otherUseage: null,
			usageCost: null,
			dailyAssistanceClient: clientName,
			dailyAssistanceStartDate: null,
			dailyAssistanceEndDate: null,
			dailyAssistanceFee: null,
			tourBookingAdminDescription: bookingInfoDesc,
			tourBookingNumOfHours: numHours,
			tourBookingClient: clientName,
			tourBookingAdminFee: BOOKING_RATE_PER_HOUR,
			dayOfExpense: null,
			expenseDescription: null,
			expenseAmount: null,
			expenseDate: null,
		};

		let response = await payrollDataController.createPayrollData(
			newPayrollData
		);

		console.log(response);

		this.loadPayrollData();
	};

	addWorkDay = async (numHours) => {
		let dataDay = new Date(this.state.selectedDay);

		let newPayrollData = {
			payrollDataId: "",
			payrollId: this.state.selectedPayrollID,
			payrollEvent: 1,
			dateOfPayrollData: dataDay.toISOString(),
			noOfWorkingHours: numHours,
			timeOff: null,
			officeUsage: null,
			otherUseage: null,
			usageCost: null,
			dailyAssistanceClient: null,
			dailyAssistanceStartDate: null,
			dailyAssistanceEndDate: null,
			dailyAssistanceFee: null,
			tourBookingAdminDescription: null,
			tourBookingNumOfHours: null,
			tourBookingClient: null,
			tourBookingAdminFee: null,
			dayOfExpense: null,
			expenseDescription: null,
			expenseAmount: null,
			expenseDate: null,
		};

		let response = await payrollDataController.createPayrollData(
			newPayrollData
		);

		console.log(response);

		this.loadPayrollData();
	};

	addTimeOff = async (numHours) => {
		let dataDay = new Date(this.state.selectedDay);

		let newPayrollData = {
			payrollDataId: "",
			payrollId: this.state.selectedPayrollID,
			payrollEvent: 4,
			dateOfPayrollData: dataDay.toISOString(),
			noOfWorkingHours: null,
			timeOff: numHours,
			officeUsage: null,
			otherUseage: null,
			usageCost: null,
			dailyAssistanceClient: null,
			dailyAssistanceStartDate: null,
			dailyAssistanceEndDate: null,
			dailyAssistanceFee: null,
			tourBookingAdminDescription: null,
			tourBookingNumOfHours: null,
			tourBookingClient: null,
			tourBookingAdminFee: null,
			dayOfExpense: null,
			expenseDescription: null,
			expenseAmount: null,
			expenseDate: null,
		};

		let response = await payrollDataController.createPayrollData(
			newPayrollData
		);

		console.log(response);

		this.loadPayrollData();
	};

	addExpense = async (expenseDesc, expenseAmount) => {
		let dataDay = new Date(this.state.selectedDay);

		let newPayrollData = {
			payrollDataId: "",
			payrollId: this.state.selectedPayrollID,
			payrollEvent: 7,
			dateOfPayrollData: dataDay.toISOString(),
			noOfWorkingHours: null,
			timeOff: null,
			officeUsage: null,
			otherUseage: null,
			usageCost: null,
			dailyAssistanceClient: null,
			dailyAssistanceStartDate: null,
			dailyAssistanceEndDate: null,
			dailyAssistanceFee: null,
			tourBookingAdminDescription: null,
			tourBookingNumOfHours: null,
			tourBookingClient: null,
			tourBookingAdminFee: null,
			dayOfExpense: null,
			expenseDescription: expenseDesc,
			expenseAmount: expenseAmount,
			expenseDate: dataDay.toISOString(),
		};

		let response = await payrollDataController.createPayrollData(
			newPayrollData
		);

		console.log(response);

		this.loadPayrollData();
	};

	//function for handling loading and creating payroll objects for the selected month
	//might need to rethink the approach for this eventually but works for now
	//will definitely need some optimizing though
	handlePayrollObject = async () => {
		let response = await payrollController.getPayrollByEID(
			this.props.currentUser.eID
		);

		console.log(response);
		//if no payrolls found belonging to employee, create one for current month
		if (response.data.length === 0) {
			console.log("no payroll");

			let newPayroll = {
				payrollId: "",
				employeeId: this.props.currentUser.eID,
				dateOfPayroll: new Date().toISOString(),
			};

			let createResponse = await payrollController.createPayroll(newPayroll);
			console.log(createResponse);
		} else {
			//employee does have payroll, search to see if payroll exists for selected month
			let payrolls = response.data;
			let foundMatch = false;

			console.log("searching payroll");

			for (let i = 0; i < payrolls.length; ++i) {
				let date = new Date(payrolls[i].dateOfPayroll);
				console.log(
					"Payroll Month: " +
						date.getMonth() +
						"| State Month: " +
						this.state.selectedMonth
				);
				console.log(
					"Payroll Year: " +
						date.getFullYear() +
						"| State Year: " +
						this.state.selectedYear
				);

				//using strict equality was causing this check to fail on updates even when there was a match
				//something to do with types? Will need more investigation later, for now loose equality will work
				if (
					date.getMonth() == this.state.selectedMonth &&
					date.getFullYear() == this.state.selectedYear
				) {
					//payroll exists for selected month, update payroll id in state
					console.log("found match");
					foundMatch = true;
					this.setState({ selectedPayrollID: payrolls[i].payrollId });
					break;
				}
			}

			//no payroll found for selected month, create new one and update state
			if (foundMatch === false) {
				console.log("creating new payroll");
				let newPayroll = {
					payrollId: "",
					employeeId: this.props.currentUser.eID,
					dateOfPayroll: new Date(
						this.state.selectedYear,
						this.state.selectedMonth
					).toISOString(),
				};

				let createResponse = await payrollController.createPayroll(newPayroll);
				console.log(createResponse);
				this.setState({ selectedPayrollID: createResponse.data.payrollId });
			}
		}
	};

	handleSelectedDay = (day) => {
		this.setState({ selectedDay: day });
	};

	handleSelectedForm = (formType) => {
		if (this.state.selectedForm === formType) {
			this.setState({ selectedForm: 0 });
		} else {
			this.setState({ selectedForm: formType });
		}
	};

	handleMonthChange = (e) => {
		this.setState({ selectedMonth: e.target.value });
	};

	handleYearChange = (e) => {
		this.setState({ selectedYear: e.target.value });
	};

	render() {
		return (
			<div className="container-fluid p-0 employeeHomePage">
				<div className="row d-flex">
					<TopNavWrapper currentUser={this.props.currentUser} />
					<BottomEmpNav />
				</div>
				<div className="row py-4">
					<div className="col-6 d-flex justify-content-center">
						<select
							className="form-select w-50"
							onChange={this.handleYearChange}
							value={this.state.selectedYear}
						>
							<option value={2015}>2015</option>
							<option value={2020}>2020</option>
							<option value={2021}>2021</option>
							<option value={2022}>2022</option>
							<option value={2023}>2023</option>
							<option value={2024}>2024</option>
						</select>
					</div>
					<div className="col-6 d-flex justify-content-center">
						<select
							className="form-select w-50"
							onChange={this.handleMonthChange}
							value={this.state.selectedMonth}
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
				<div className="row flex-nowrap">
					<div className="col-8 ms-5 innerAdmin">
						<EmployeePayrollCalender
							selectedMonth={this.state.selectedMonth}
							selectedYear={this.state.selectedYear}
							selectedPayrollID={this.state.selectedPayrollID}
							selectedDay={this.state.selectedDay}
							payrollData={this.state.payrollData}
							handleSelectedDay={this.handleSelectedDay}
						/>
					</div>
					<div className="col-4">
						<div className="row">
							<div className="col">
								<EmployeePayrollButtons
									handleSelectedForm={this.handleSelectedForm}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<EmployeePayrollForm
									selectedForm={this.state.selectedForm}
									addTourBooking={this.addTourBooking}
									addDailyAssistanceFee={this.addDailyAssistanceFee}
									addWorkDay={this.addWorkDay}
									addTimeOff={this.addTimeOff}
									addExpense={this.addExpense}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default EmployeePayroll;
