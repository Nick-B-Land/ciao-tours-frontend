import React, { Component } from "react";
import "../style/employeeCalendarCSS.css";
import BottomEmpNav from "../components/navs/bottomEmpNav";
import payrollController from "../controllers/payrollController";
import payrollDataController from "../controllers/payrollDataController";
import TopNavWrapper from "../functionalComponents/topNavWrapper";
import EmployeePayrollButtons from "../components/employeePayroll/employeePayrollButtons";
import EmployeePayrollCalender from "../components/employeePayroll/employeePayrollCalendar";
import EmployeePayrollForm from "../components/employeePayroll/employeePayrollForm";

/*
Locally-Defined Functions/Variables
	handleSelectedEvents - controls state of selected Events from a day
		called in: payrollCalendarDay(handleDayClick)
	loadPayrollData - loads PayrollData objects for the selected month and year's payroll
	addDailyAssistanceFee - creates a new PayrollData object of type Daily Assistance Fee
	  and recalls loadPayrollData to update the calendar
	  	called in: dailyAssistanceForm(handleDailyAssistanceSubmit)
	addTourBooking - creates new PayrollData object of type Tour Booking and recalls loadPayrollData
	  to update the calendar
	  	called in: tourBookingForm(handleTourBookingSubmit)
	addWorkDay - creates new PayrollData object of type Work Day and recalls loadPayrollData
	  to update the calendar
	  	called in: workDayForm(handleWorkDaySubmit)
	addTimeOff - creates new PayrollData object of type Time off and recalls loadPayrollData
	  to update the calendar
	  	called in: timeOffForm(handleTimeOffSubmit)
	addExpense - creates new PayrollData object of type Expense and recalls loadPayrollData
	  to update the calendar
	  	called in: expenseForm(handleExpenseSubmit)
	handlePayrollObject - handles loading and creating payroll objects for the selected month
	handleSelectedDay - controls state of the selected day on the calendar
		called in: all of the specific form components(under createFormattedDate), payrollCalendarDay(
		   handleDayClick)
	handleSelectedForm - controls state of the selected form in the calendar page
		called in: all of the specific form components(under submit and cancel functions), 
		   employeePayrollButtons
	handleMonthChange - controls state of the selected month
	handleYearChange - controls state of the selected year

Props
	CurrentUser - the employee that is currently on the system
*/

class EmployeePayroll extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedMonth: 0,
			selectedYear: 2020,
			selectedPayrollID: 0,
			selectedDay: "",
			selectedEvents: [],
			payrollData: [],
			selectedForm: 0,
			reloadEvents: false,
		};
	}

	// handles the state of Events from a day, runs every time a day is clicked in the calendar
	handleSelectedEvents = (events) => {
		this.setState({ selectedEvents: events });
	};

	handleReloadEvents = () => {
		this.setState({ reloadEvents: !this.state.reloadEvents }, () =>
			console.log("HANDLE RELOAD EVENTS FIRED: " + this.state.selectedEvents)
		);
	};

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
		} else if (this.state.selectedEvents !== prevState.selectedEvents) {
			console.log(this.state.selectedEvents);
		} else if (this.state.reloadEvents !== prevState.reloadEvents) {
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

	//adds a daily assistance fee type payroll data object
	addDailyAssistanceFee = async (clientName, date) => {
		let dataDay = new Date(date);
		const DAILY_ASSISTANCE_FEE_PER_DAY_IN_EUROS = 9;

		console.log("DATE FROM ADAF: " + date);

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

	// adds a tour booking type payroll data object
	addTourBooking = async (bookingInfoDesc, numHours, clientName, date) => {
		let dataDay = new Date(date);

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

	// adds a work day type payroll data object
	addWorkDay = async (numHours, date) => {
		let dataDay = new Date(date);

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

	// adds time off type Payroll Data object
	addTimeOff = async (numHours, date) => {
		let dataDay = new Date(date);

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

	//adds an expense type payroll data object
	addExpense = async (expenseDesc, expenseAmount, date) => {
		let dataDay = new Date(date);

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
				isProcessed: 0,
				isFlagged: 0,
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
					isProcessed: 0,
					isFlagged: 0,
				};

				let createResponse = await payrollController.createPayroll(newPayroll);
				console.log(createResponse);
				this.setState({ selectedPayrollID: createResponse.data.payrollId });
			}
		}
	};

	// handles the state of the selected day
	handleSelectedDay = (day) => {
		this.setState({ selectedDay: day });
	};

	// handles the state of the selected form
	handleSelectedForm = (formType) => {
		if (this.state.selectedForm === formType) {
			this.setState({ selectedForm: 0 });
		} else {
			this.setState({ selectedForm: formType });
		}
	};

	// handles the state of the selected month
	handleMonthChange = (e) => {
		this.setState({ selectedMonth: e.target.value });
	};

	// handles the state of the selected year
	handleYearChange = (e) => {
		this.setState({ selectedYear: e.target.value });
	};

	render() {
		return (
			<div className="container-fluid p-0 employeeCalendarPage">
				<div className="row d-flex">
					<TopNavWrapper currentUser={this.props.currentUser} />
					<BottomEmpNav />
				</div>
				<div className="row py-4 align-items-center">
					<div className="col-auto d-inline-flex">
						<select
							className="form-select h-50"
							onChange={this.handleYearChange}
							value={this.state.selectedYear}
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
					<div className="col">
						<EmployeePayrollButtons
							handleSelectedForm={this.handleSelectedForm}
							handleSelectedEvents={this.handleSelectedEvents}
						/>
					</div>
				</div>
				<div className="row justify-content-between flex-nowrap">
					<div className="col-8 ms-4 me-3 innerAdmin">
						<EmployeePayrollCalender
							selectedMonth={this.state.selectedMonth}
							selectedYear={this.state.selectedYear}
							selectedPayrollID={this.state.selectedPayrollID}
							selectedDay={this.state.selectedDay}
							payrollData={this.state.payrollData}
							selectedEvents={this.state.selectedEvents}
							handleSelectedEvents={this.handleSelectedEvents}
							handleSelectedDay={this.handleSelectedDay}
							reloadEvents={this.state.reloadEvents}
							handleReloadEvents={this.handleReloadEvents}
						/>
					</div>
					<div className="col-3 ms-3 me-4 innerAdmin">
						<div className="row">
							<div className="col mw-100">
								<EmployeePayrollForm
									selectedForm={this.state.selectedForm}
									selectedDay={this.state.selectedDay}
									selectedEvents={this.state.selectedEvents}
									handleSelectedEvents={this.handleSelectedEvents}
									handleSelectedDay={this.handleSelectedDay}
									handleSelectedForm={this.handleSelectedForm}
									addTourBooking={this.addTourBooking}
									addDailyAssistanceFee={this.addDailyAssistanceFee}
									addWorkDay={this.addWorkDay}
									addTimeOff={this.addTimeOff}
									addExpense={this.addExpense}
									handleReloadEvents={this.handleReloadEvents}
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
