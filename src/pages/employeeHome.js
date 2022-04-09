import React, { Component } from "react";
import "../style/stylesheet.css";
import { CurrentUser } from "../model/currentUser";
import EmployeePayrollGenerator from "../components/empHomePage/EmployeePayrollGenerator";
import PaystubEmployeeGenerator from "../components/empHomePage/PaystubEmployeeGenerator";
import payrollController from "../controllers/payrollController";
import payrollDataController from "../controllers/payrollDataController";
import paystubController from "../controllers/paystubController";
import BottomEmpNav from "../components/navs/bottomEmpNav";
import TopNav from "../components/navs/topNav";
import { Link } from "react-router-dom";

class EmployeeHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pdl: null,
			ps: null,
			current: new Date(),
			month: -1,
			day: -1,
			year: -1,
			selectedPayrollID: 0,
			payrollData: []
		};
	}

	componentDidMount() {
		this.setState({month: this.state.current.getMonth(), day: this.state.current.getDate(), year: this.state.current.getFullYear()});
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.month !== prevState.month) {
			this.findPayrollObject();
		} else if (this.state.year !== prevState.year) {
			this.findPayrollObject();
		} else if (this.state.selectedPayrollID !== prevState.selectedPayrollID){
			this.loadPayrollObject();
		}
	}

	findPayrollObject = async () => {
		let foundMatch = false;
		let response = await payrollController.getPayrollByEID(
			this.props.currentUser.eID
		);

		if(response.data.length > 0){
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
	}

	loadPayrollObject = async () => {
		let response = await payrollController.getPayrollDataByPayrollID(
			this.state.selectedPayrollID
		);
		this.setState({ payrollData: response.data });
	}

	calculateTourBookings() {
		let filteredTourBookings = this.state.payrollData.filter(
			(e) => e.tourBookingClient !== null
		);
		let tourBookings = filteredTourBookings.length;
		return tourBookings;
	}

	calculateAssistanceFees() {
		let filteredAssistanceFees = this.state.payrollData.filter(
			(e) => e.dailyAssistanceClient !== null
		);
		let fees = filteredAssistanceFees.length;
		return fees;
	}

	calculateHours() {
		let filteredHours = this.state.payrollData.filter(
			(e) => e.noOfWorkingHours !== null
		);
		let hours = filteredHours.length;
		return hours;
	}

	calculateExpenses() {
		let filteredExpenses = this.state.payrollData.filter(
			(e) => e.tourBookingClient !== null
		);
		let expenses = filteredExpenses.length;
		return expenses;
	}

	calculateDaysOff() {
		let filteredDaysOff = this.state.payrollData.filter(
			(e) => e.tourBookingClient !== null
		);
		let days = filteredDaysOff.length;
		return days;
	}

	// componentDidMount() {
	// 	let list1 = null;
	// 	let list2 = null;
	// 	let list3 = null;
	// 	let empId = null;
	// 	let latestDate = null;
	// 	let counter1 = 0;
	// 	let counter2 = 0;
	// 	let counter3 = 0;

	// 	payrollController.getPayroll().then((pd) => {
	// 		list1 = pd.data;

	// 		for (let i = 0; i < pd.data.length; i++) {
	// 			let item = list1[i];
	// 			let list2 = Object.values(item);
	// 			if (latestDate == null || latestDate < Date.parse(list2[2])) {
	// 				latestDate = Date.parse(list2[2]);
	// 				counter1 = i;
	// 			}
	// 			if (i == pd.data.length - 1) {
	// 				console.log(Object.values(list1[counter1]));
	// 				console.log(Object.keys(list1[counter1]));
	// 			}
	// 		}
	// 		list1 = Object.values(pd.data)[counter1];
	// 		list1 = Object.values(list1);
	// 		empId = list1[1];
	// 		payrollDataController.getPayrollDataByPayrollID(list1[1]).then((pdi) => {
	// 			let latestDate = null;
	// 			let pdList = pdi.data;

	// 			for (let i = 0; i < pdi.data.length; i++) {
	// 				let currData = Object.values(pdList[i]);
	// 				let currIndex = Object.values(currData);
	// 				if (latestDate == null || latestDate < currIndex[3]) {
	// 					latestDate = currIndex[3];
	// 					counter2 = i;
	// 					list2 = currIndex;
	// 				}
	// 				if (i == pdi.data.length - 1) {
	// 					console.log(Object.values(pdList[counter2]));
	// 					console.log(Object.keys(pdList[counter2]));
	// 				}
	// 			}

	// 			paystubController.getPaystubByEID(empId).then((ps) => {
	// 				latestDate = null;
	// 				let psList = ps.data;

	// 				for (let i = 0; i < ps.data.length; i++) {
	// 					let currData = Object.values(psList[i]);
	// 					let currIndex = Object.values(currData);
	// 					if (latestDate == null || latestDate < currIndex[2]) {
	// 						latestDate = currIndex[2];
	// 						list3 = currData;
	// 						counter3 = i;
	// 					}
	// 					if (i == ps.data.length - 1) {
	// 						console.log(Object.values(psList[counter3]));
	// 						console.log(Object.keys(psList[counter3]));
	// 					}
	// 				}

	// 				this.setState({
	// 					pdl: list2,
	// 					ps: list3,
	// 				});
	// 				for (let i = 0; i < list2.length; i++) {
	// 					console.log(list2[i]);
	// 				}
	// 				for (let i = 0; i < list3.length; i++) {
	// 					console.log(list3[i]);
	// 				}
	// 			});
	// 		});
	// 	});
	// }

	getLatestPayroll() {
		let listV = payrollDataController.getAllPayrollData();
		if (listV != null) {
			console.log(listV.length);
		}
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
			"DEC"
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
			"December"
		];
		return (
			<div className="container-fluid p-0 adminHomePage text-responsive">
				<div className="row d-flex">
					<TopNav />
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
										<h2 className="text-center basicLinks">View {this.state.month-1 === -1 ? fullMonths[11] : fullMonths[this.state.month-1]}'s Paystub</h2>
									</div>
								</Link>
								</div>
								<div className="row mb-3 ms-2 align-items-center">
									<div className="col p-3 bg-white border rounded-3">
										<h2 className="text-center">Current Payroll for {fullMonths[this.state.month]}</h2>

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
												If you have any concerns please contact the
												bookeeper:
											</p>
											<b className="max-width-50">at:example@example.ca</b>
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
