import React, { Component } from "react";
import "../style/stylesheet.css";
import { CurrentUser } from "../model/currentUser";
import payrollController from "../controllers/payrollController";
import payrollDataController from "../controllers/payrollDataController";
import BottomEmpNav from "../components/navs/bottomEmpNav";
import { Link } from "react-router-dom";
import TopNavWrapper from "../functionalComponents/topNavWrapper";

/**
 * EmployeeHome
 * Purpose: employee landing page for employees when they log in; ideally would show their current monthly additions, access to their 
 * 	latest paystub, and easy way to contact the bookkeeper regarding any questions
 * 
 * Locally-Defined Functions and Variables
 * Variables
 * 	current - loads current local date and time when page loads
 * 	month - loads current month when page loads
 * 	day - loads current day when page loads
 * 	year - loads current year when page loads
 * 	selectedPayrollID - holds ID of the payroll for the current month and year
 * 	payrollData - loads list of current payroll objects
 * 
 * Functions
 * 	componentDidMount - runs on page load and uses state var 'current' to fill in month, day and year
 * 	componentDidUpdate - runs findPayrollObject if month or year changes, and loadPayrollObject when selectedPayrollID is updated
 * 	findPayrollObject - uses payroll controller to search for payrolls matching empolyee id, then looks through them for current month
 * 		and year
 * 	loadPayrollObject - uses payroll controller to load the payroll with the payrollID determined in 'findPayrollObject'
 * 	calculateTourBookings - counts number of tour bookings in that month
 * 	calculateAssistanceFees - counts number of assistance fees added that month
 * 	calculateHours - counts work days added that month
 * 	calculateExpenses - counts expenses added that month
 * 	calculateDaysOff - counts days off added that month
 * 
 * Props 
 * 	currentUser - current user of the system
 */
class EmployeeHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: new Date(),
			month: -1,
			day: -1,
			year: -1,
			selectedPayrollID: 0,
			payrollData: [],
			tours: 0,
			assisFee: 0,
			hours: 0,
			expenses: 0,
			daysOff: 0
		};
	}

	componentDidMount() {
		this.setState({
			month: this.state.current.getMonth(),
			day: this.state.current.getDate(),
			year: this.state.current.getFullYear(),
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.month !== prevState.month) {
			this.findPayrollObject();
		} else if (this.state.year !== prevState.year) {
			this.findPayrollObject();
		} else if (this.state.selectedPayrollID !== prevState.selectedPayrollID) {
			this.loadPayrollObject();
		} else if(this.state.payrollData !== prevState.payrollData){
			console.log(this.state.payrollData);
			this.calculateTourBookings();
			this.calculateAssistanceFees();
			this.calculateDaysOff();
			this.calculateExpenses();
			this.calculateHours();
		}
	}

	/**
	 * finds the ID associated to the user and current month
	 */
	findPayrollObject = async () => {
		let foundMatch = false;
		let response = await payrollController.getPayrollByEID(
			this.props.currentUser.eID
		);

		if (response.data.length > 0) {
			let payrolls = response.data;
			for (let i = 0; i < payrolls.length; ++i) {
				let date = new Date(payrolls[i].dateOfPayroll);
				if (
					date.getMonth() == this.state.month &&
					date.getFullYear() == this.state.year
				) {
					//payroll exists for selected month, update payroll id in state
					console.log("found match, payroll id: " + payrolls[i].payrollId);
					foundMatch = true;
					this.setState({ selectedPayrollID: payrolls[i].payrollId });
					break;
				}
			}
		}
	};

	/**
	 * loads current month and user's paystub
	 */
	loadPayrollObject = async () => {
		let response = await payrollDataController.getPayrollDataByPayrollID(this.state.selectedPayrollID);
		console.log(response);
		this.setState({ payrollData: response.data });
		console.log(this.state.payrollData);
	};

	/**
	 * calculates the total number of tours added for current month
	 */
	calculateTourBookings() {
		let filteredTourBookings = this.state.payrollData.filter(
			(e) => e.tourBookingClient !== null
		);
		let tourBookings = filteredTourBookings.length;
		this.setState({tours: tourBookings});
	}

	/**
	 * calculates the total number of assistance fees added for current month
	 */
	calculateAssistanceFees() {
		let filteredAssistanceFees = this.state.payrollData.filter(
			(e) => e.dailyAssistanceClient !== null
		);
		let fees = filteredAssistanceFees.length;
		this.setState({assisFee: fees});
	}

	/**
	 * calculates the total number of workdays added for current month
	 */
	calculateHours() {
		let filteredHours = this.state.payrollData.filter(
			(e) => e.noOfWorkingHours !== 0
		);
		let currhours = filteredHours.length;
		this.setState({hours: currhours});
	}

	/**
	 * calculates the total number of expenses added for current month
	 */
	calculateExpenses() {
		let filteredExpenses = this.state.payrollData.filter(
			(e) => e.expenseAmount !== 0
		);
		let currexpenses = filteredExpenses.length;
		this.setState({expenses: currexpenses});
	}

	/**
	 * calculates the total number of days off added for current month
	 */
	calculateDaysOff() {
		let filteredDaysOff = this.state.payrollData.filter(
			(e) => e.tourBookingClient !== null
		);
		let days = filteredDaysOff.length;
		this.setState({daysOff: days});
	}

	render() {
		var monthName = [
			"JAN",
			"FEB",
			"MAR",
			"APR",
			"MAY",
			"JUN",
			"JUL",
			"AUG",
			"SEP",
			"OCT",
			"NOV",
			"DEC",
		];
		var fullMonths = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		return (
			<div className="container-fluid p-0 adminHomePage text-responsive">
				<div className="row d-flex">
					<TopNavWrapper currentUser={this.props.currentUser} />
					<BottomEmpNav />
				</div>
				<div className="row">
					<div className="col-2"></div>
					<div className="col-8 innerAdmin min-vh-100">
						<div className="row">
							<div className="employeeHeader p-4 pt-2 pb-2 text-center">
								<h1 className="mb-2">Welcome, {CurrentUser.username}</h1>
							</div>
						</div>
						<div className="row">
							<div className="col-10 mt-3">
								<div className="row mb-3 ms-2 align-items-center">
									<Link to="/employeePaystubs" className="basicLinks p-0">
										<div className="col p-3 SecondaryButton border rounded-3 ">
											<h2 className="text-center basicLinks">
												View{" "}
												{this.state.month - 1 === -1
													? fullMonths[11]
													: fullMonths[this.state.month - 1]}
												's Paystub
											</h2>
										</div>
									</Link>
								</div>
								<div className="row mb-3 ms-2 align-items-center">
									<div className="col p-3 bg-white border rounded-3">
										<div className="row">
											<div className="col">
												<h2 className="text-center">
												Current Payroll for {fullMonths[this.state.month]}
												</h2>
											</div>
										</div>
										<div className="row">
											<div className="col">
												Number of Tour Bookings added: {this.state.tours}
											</div>
										</div>
										<div className="row">
											<div className="col">
												Number of Assistance Fees added: {this.state.assisFee}
											</div>
										</div>
										<div className="row">
											<div className="col">
												Number of Work Days added: {this.state.hours}
											</div>
										</div>
										<div className="row">
											<div className="col">
												Number of Days Off added: {this.state.daysOff}
											</div>
										</div>
										<div className="row">
											<div className="col">
												Number of Expenses added: {this.state.expenses}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-2 mt-3">
								<div className="row me-2 mb-3">
									<div className="col">
										<div className="p-1 bg-white border rounded-3 text-center">
											<h6>Today's Date</h6>
											<p className="h2 m-0">{monthName[this.state.month]}</p>
											<p className="display-1 m-0">{this.state.day}</p>
											<p className="h2 m-0">{this.state.year}</p>
										</div>
									</div>
								</div>
								<div className="row me-2">
									<div className="col">
										<div className="bg-white border rounded-3 p-1">
											<p>
												If you have any concerns please contact the bookeeper:
											</p>
											<b className="max-width-50">at: ex@mail.ca</b>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default EmployeeHome;
