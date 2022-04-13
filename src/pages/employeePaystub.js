import React, { Component, useEffect } from "react";
import "../style/stylesheet.css";
import BottomEmpNav from "../components/navs/bottomEmpNav";
import Paystub from "../components/paystub";
import paystubController from "../controllers/paystubController";
import TopNavWrapper from "../functionalComponents/topNavWrapper";

class EmployeePaystubs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedMonth: 0,
			selectedYear: 2020,
			paystubsToDisplay: [],
			employeeSearchValue: "",
		};
	}

	componentDidMount = () => {
		console.log(this.props.currentUser);
		this.setState({
			selectedMonth: new Date().getMonth(),
			selectedYear: new Date().getFullYear(),
		});
	}

	componentDidUpdate = (prevProps, prevState) => {
		if (this.state.selectedMonth !== prevState.selectedMonth) {
			this.loadPaystub();
		} else if (this.state.selectedYear !== prevState.selectedYear) {
			this.loadPaystub();
		}
	};

	loadPaystub = async () => {
		let paystub = await paystubController.getPaystubByEID(this.props.currentUser.eID);

		let filteredPeriods = paystub.data.filter(
					(e) =>
						new Date(e.dateOfPaystub).getFullYear() ===
							new Date(
								this.state.selectedYear,
								this.state.selectedMonth
							).getFullYear() &&
						new Date(e.dateOfPaystub).getMonth() ===
							new Date(this.state.selectedYear, this.state.selectedMonth).getMonth()
				);

				console.log(filteredPeriods);
				this.setState({ paystubsToDisplay: filteredPeriods });
	};

	handleMonthChange = (e) => {
		this.setState({ selectedMonth: e.target.value });
	};

	handleYearChange = (e) => {
		this.setState({ selectedYear: e.target.value });
	};

	handleEmployeeSearch = (e) => {
		this.setState({ employeeSearchValue: e.target.value });
	};

	calculateWorkDaysHours = () => {
		let workDaysHoursTotal = 0;
		this.state.paystubsToDisplay.forEach((e) => {
			workDaysHoursTotal += e.workDayHours;
		});
		return workDaysHoursTotal;
	};

	calculateWorkDaysYear = () => {
		let workDaysYear = 0;
		this.state.paystubsToDisplay.forEach((e) => {
			workDaysYear += e.workDayCharges;
		});
		return workDaysYear;
	};

	calculateTimeOffHours = () => {
		let timeOffHoursTotal = 0;
		this.state.paystubsToDisplay.forEach((e) => {
			timeOffHoursTotal += e.timeOffHours;
		});
		return timeOffHoursTotal;
	};

	calculateDailyAssistanceYear = () => {
		let dailyAssistanceYear = 0;
		this.state.paystubsToDisplay.forEach((e) => {
			dailyAssistanceYear += e.dailyAssistanceCharges;
		});
		return dailyAssistanceYear;
	};

	calculateTourBookingYear = () => {
		let tourBookingYear = 0;
		this.state.paystubsToDisplay.forEach((e) => {
			tourBookingYear += e.tourBookingCharges;
		});
		return tourBookingYear;
	};

	calculateStatHours = () => {
		let statHoursTotal = 0;
		this.state.paystubsToDisplay.forEach((e) => {
			statHoursTotal += e.statHours;
		});
		return statHoursTotal;
	};

	calculateExpenseYear = () => {
		let expenseYear = 0;
		this.state.paystubsToDisplay.forEach((e) => {
			expenseYear += e.expenseAmount;
		});
		return expenseYear;
	};

	calculateCppYear = () => {
		let cppYear = 0;
		this.state.paystubsToDisplay.forEach((e) => {
			cppYear += e.cppDeductions;
		});
		return cppYear;
	};

	calculateEiYear = () => {
		let eiYear = 0;
		this.state.paystubsToDisplay.forEach((e) => {
			eiYear += e.eiDeductions;
		});
		return eiYear;
	};

	calculateIncomeYear = () => {
		let incomeYear = 0;
		this.state.paystubsToDisplay.forEach((e) => {
			incomeYear += e.incomeTax;
		});
		return incomeYear;
	};

	calculateGrossYear = () => {
		let yearGross = 0;
		this.state.paystubsToDisplay.forEach((e) => {
			yearGross += e.grossPay;
		});
		return yearGross;
	};

	calculateDeductionsYear = () => {
		let yearDeductions = 0;
		this.state.paystubsToDisplay.forEach((e) => {
			yearDeductions += e.eiDeductions + e.cppDeductions + e.incomeTax;
		});
		return yearDeductions;
	};

	calculateNetTotal = () => {
		let yearNet = 0;
		this.state.paystubsToDisplay.forEach((e) => {
			yearNet += e.netPay;
		});
		return yearNet;
	};

	renderPaystubTotals = () => {
		console.log(this.state.paystubsToDisplay.length);
		return (
			<>
				<h5>WorkDaysHours: {this.calculateWorkDaysHours()}</h5>
				<h5>WorkDaysYear: {this.calculateWorkDaysYear()}</h5>
				<h5>TimeOffHours: {this.calculateTimeOffHours()}</h5>
				<h5>dailyAssistanceCharges: {this.calculateDailyAssistanceYear()}</h5>
				<h5>TourBookingYear: {this.calculateTourBookingYear()}</h5>
				<h5>StatHours: {this.calculateStatHours()}</h5>
				<h5>expenseYear: {this.calculateExpenseYear()}</h5>
				<h5>CppYear: {this.calculateCppYear()}</h5>
				<h5>EiYear: {this.calculateEiYear()}</h5>
				<h5>IncomeYear: {this.calculateIncomeYear()}</h5>
				<h5>GrossYear: {this.calculateGrossYear()}</h5>
				<h5>DeductionsYear: {this.calculateDeductionsYear()}</h5>
				<h5>NetTotal: {this.calculateNetTotal()}</h5>
			</>
		);
	}

	filterPaystubsBySearchValue = () => {
		let filteredPaystubs = [];

		this.state.paystubsToProcess.forEach((e) => {
			if (
				e.firstName
					.toUpperCase()
					.includes(this.state.employeeSearchValue.toUpperCase()) ||
				e.lastName
					.toUpperCase()
					.includes(this.state.employeeSearchValue.toUpperCase())
			)
				filteredPaystubs.push(e);
		});

		return filteredPaystubs;
	};

	renderMonthlyPaystubs = () => {
		if (this.state.employeeSearchValue) {
			if (this.filterPaystubsBySearchValue().length > 0) {
				return this.filterPaystubsBySearchValue().map((paystub) => (
					<Paystub key={paystub.paystubId} {...paystub} />
				));
			} else {
				return <h3>No Results</h3>;
			}
		} else {
			return this.state.paystubsToDisplay.map((paystub) => (
				<Paystub key={paystub.paystubId} {...paystub} />
			));
		}
	};

	render() {
		return (
			<div className="container-fluid p-0 employeePaystubsPage">
				<div className="row">
					<TopNavWrapper currentUser={this.props.currentUser} />
					<BottomEmpNav />
				</div>
				<div className="row m-0">
					<div className="col-2"></div>
					<div className="col-8 min-vh-100 innerAdmin">
						<div className="row">
							<div className="employeeHeader p-4 pt-2 pb-2 text-center">
								<h1>Paystubs</h1>
							</div>
							<div className="row py-4 align-items-center justify-content-center">
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
						</div>
						</div>

						<div className="row">
							<div className="col">{this.renderMonthlyPaystubs()}</div>
						</div>
						<div className="row">
							<div className="col">{this.renderPaystubTotals()}</div>
						</div>
					
					</div>
				</div>
			</div>
		);
	}
}

export default EmployeePaystubs;
