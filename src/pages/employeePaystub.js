import React, { Component, useEffect } from "react";
import "../style/stylesheet.css";
import TopNav from "../components/navs/topNav";
import BottomEmpNav from "../components/navs/bottomEmpNav";
import Paystub from "../components/paystub";
import { paystubData } from "../components/data";
import paystubController from "../controllers/paystubController";

class EmployeePaystubs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			year: "",
			month: "00",
			paystubPeriods: [],
		};
	}

	updateYear = (e) => {
		this.setState({ year: e.target.value });
		console.log("year: " + this.state.year);
	};

	loadPaystub = (e) => {
		this.setState({ month: e.target.value });
		
		//make call to database to grab paystub associated with state year and month
		
		// try making a call using paystub id
		// put '-' if value is 0
		let paystubData = paystubController.getPaystubByEID(this.props.currentUser.eID);
		console.log(paystubData);
	};

	// get all paystubs leading to selected year and month
	// loadPaystubPeriods = async () => {
	// 	let paystubs = await paystubController.getPaystub();

	// 	let filteredPeriods = paystubs.data.filter(
	// 		(e) =>
	// 			new Date(e.dateOfPaystub).getFullYear() ===
	// 				new Date(
	// 					this.state.selectedYear,
	// 					this.state.selectedMonth
	// 				).getFullYear() &&
	// 			new Date(e.dateOfPaystub).getMonth() ===
	// 				new Date(this.state.selectedYear, this.state.selectedMonth).getMonth()
	// 	);

	// 	this.setState({ paystubPeriods: filteredPeriods });
	// };

	// yearly total example
	calculateWorkDaysYear = () => {
		let workdaysYear = 0;
		
		this.state.paystubsPeriod.forEach((e) => {
			workdaysYear +=e.workDayCharges;
		});
		return workdaysYear;
	};

	// daily assistance total
	calculateDailyAssistanceYear = () => {
		let dailyAssistanceYear = 0;
		// get all paystubs leading to selected year and month
		this.state.paystubsPeriod.forEach((e) => {
			dailyAssistanceYear +=e.dailyAssistanceCharges;
		});
		return dailyAssistanceYear;
	};

	// tour booking total
	calculateTourBookingYear = () => {
		let tourBookingYear = 0;
		// get all paystubs leading to selected year and month
		this.state.paystubsPeriod.forEach((e) => {
			tourBookingYear +=e.tourBookingCharges;
		});
		return tourBookingYear;
	};

	// expense total
	calculateExpenseYear = () => {
		let expenseYear = 0;
		// get all paystubs leading to selected year and month
		this.state.paystubsPeriod.forEach((e) => {
			expenseYear +=e.expenseAmount;
		});
		return expenseYear;
	};

	// cpp total
	calculateCppYear = () => {
		let cppYear = 0;
		// get all paystubs leading to selected year and month
		this.state.paystubsPeriod.forEach((e) => {
			cppYear +=e.cppDeductions;
		});
		return cppYear;
	};

	// ei total
	calculateEiYear = () => {
		let eiYear = 0;
		// get all paystubs leading to selected year and month
		this.state.paystubsPeriod.forEach((e) => {
			eiYear +=e.eiDeductions;
		});
		return eiYear;
	};

	// income tax total
	calculateIncomeYear = () => {
		let incomeYear = 0;
		// get all paystubs leading to selected year and month
		this.state.paystubsPeriod.forEach((e) => {
			incomeYear +=e.incomeTax;
		});
		return incomeYear;
	};

	// gross pay total
	calculateGrossYear = () => {
		let yearGross = 0;
		// get all paystubs leading to selected year and month
		this.state.paystubsPeriod.forEach((e) => {
			yearGross +=e.grossPay;
		});
		return yearGross;
	};

	// deductions total
	calculateDeductionsYear = () => {
		let yearDeductions = 0;
		// get all paystubs leading to selected year and month
		this.state.paystubsPeriod.forEach((e) => {
			yearDeductions +=e.eiDeductions + e.cppDeductions + e.incomeTax;
		});
		return yearDeductions;
	};

	// net pay total
	calculateNetTotal = () => {
		let yearNet = 0;
		// get all paystubs leading to selected year and month
		this.state.paystubsPeriod.forEach((e) => {
			yearNet +=e.netPay;
		});
		return yearNet;
	};

	render() {
		const options = [
			{
				label: "2020",
				value: "2020",
			},
			{
				label: "2021",
				value: "2021",
			},
			{
				label: "2022",
				value: "2022",
			},
			{
				label: "2023",
				value: "2023",
			},
			{
				label: "2024",
				value: "2024",
			},
			{
				label: "2025",
				value: "2025",
			},
		];
		return (
			<div className="container-fluid p-0 employeePaystubsPage">
				<div className="row">
					<TopNav />
					<BottomEmpNav />
				</div>
				<div className="row m-0">
					<div className="col-2"></div>
					<div className="col-8 min-vh-100 innerAdmin">
						<div className="row">
							<div className="employeeHeader p-4 pt-2 pb-2 text-center">
								<h1>Paystubs</h1>
							</div>
							<div className="d-flex justify-content-end">
								<select>
									{options.map((option) => (
										<option value={option.value} onClick={this.updateYear}>
											{option.label}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className="row">
							{paystubData.map(
								({
									period,
									fName,
									lName,
									employer,
									empId,
									date,
									regRate,
									regHours,
									regEarnings,
									regYearHours,
									regYearEarnings,
									sickRate,
									sickHours,
									sickEarnings,
									sickYearHours,
									sickYearEarnings,
									holRate,
									holHours,
									holEarnings,
									holYearHours,
									holYearEarnings,
									cpp,
									cppYear,
									ei,
									eiYear,
									tax,
									taxYear,
									csb,
									csbYear,
									curGross,
									curDeductions,
									curNet,
									payMethod,
									yearGross,
									yearDeductions,
									yearNet,
									refNum,
								}) => (
									<Paystub
										period={period}
										fName={fName}
										lName={lName}
										employer={employer}
										empId={empId}
										date={date}
										regRate={regRate}
										regHours={regHours}
										regEarnings={regEarnings}
										regYearHours={regYearHours}
										regYearEarnings={regYearEarnings}
										sickRate={sickRate}
										sickHours={sickHours}
										sickEarnings={sickEarnings}
										sickYearHours={sickYearHours}
										sickYearEarnings={sickYearEarnings}
										holRate={holRate}
										holHours={holHours}
										holEarnings={holEarnings}
										holYearHours={holYearHours}
										holYearEarnings={holYearEarnings}
										cpp={cpp}
										cppYear={cppYear}
										ei={ei}
										eiYear={eiYear}
										tax={tax}
										taxYear={taxYear}
										csb={csb}
										csbYear={csbYear}
										curGross={curGross}
										curDeductions={curDeductions}
										curNet={curNet}
										payMethod={payMethod}
										yearGross={yearGross}
										yearDeductions={yearDeductions}
										yearNet={yearNet}
										refNum={refNum}
									/>
								)
							)}
						</div>

						<div className="row">
							<div className="d-flex justify-content-center p-0">
								<button
									className="w-100 p-3 border empPaystubButton"
									type="button"
									value="01"
									onClick={this.loadPaystub}
								>
									January
								</button>
							</div>
						</div>
						<div className="row">
							<div className="d-flex justify-content-center p-0">
								<button
									className="w-100 p-3 border empPaystubButton"
									type="button"
									value="02"
									onClick={this.loadPaystub}
								>
									February
								</button>
							</div>
						</div>
						<div className="row">
							<div className="d-flex justify-content-center p-0">
								<button
									className="w-100 p-3 border empPaystubButton"
									type="button"
									value="03"
									onClick={this.loadPaystub}
								>
									March
								</button>
							</div>
						</div>
						<div className="row">
							<div className="d-flex justify-content-center p-0">
								<button
									className="w-100 p-3 border empPaystubButton"
									type="button"
									value="04"
									onClick={this.loadPaystub}
								>
									April
								</button>
							</div>
						</div>
						<div className="row">
							<div className="d-flex justify-content-center p-0">
								<button
									className="w-100 p-3 border empPaystubButton"
									type="button"
									value="05"
									onClick={this.loadPaystub}
								>
									May
								</button>
							</div>
						</div>
						<div className="row">
							<div className="d-flex justify-content-center p-0">
								<button
									className="w-100 p-3 border empPaystubButton"
									type="button"
									value="06"
									onClick={this.loadPaystub}
								>
									June
								</button>
							</div>
						</div>
						<div className="row">
							<div className="d-flex justify-content-center p-0">
								<button
									className="w-100 p-3 border empPaystubButton"
									type="button"
									value="07"
									onClick={this.loadPaystub}
								>
									July
								</button>
							</div>
						</div>
						<div className="row">
							<div className="d-flex justify-content-center p-0">
								<button
									className="w-100 p-3 border empPaystubButton"
									type="button"
									value="08"
									onClick={this.loadPaystub}
								>
									August
								</button>
							</div>
						</div>
						<div className="row">
							<div className="d-flex justify-content-center p-0">
								<button
									className="w-100 p-3 border empPaystubButton"
									type="button"
									value="09"
									onClick={this.loadPaystub}
								>
									September
								</button>
							</div>
						</div>
						<div className="row">
							<div className="d-flex justify-content-center p-0">
								<button
									className="w-100 p-3 border empPaystubButton"
									type="button"
									value="10"
									onClick={this.loadPaystub}
								>
									October
								</button>
							</div>
						</div>
						<div className="row">
							<div className="d-flex justify-content-center p-0">
								<button
									className="w-100 p-3 border empPaystubButton"
									type="button"
									value="11"
									onClick={this.loadPaystub}
								>
									November
								</button>
							</div>
						</div>
						<div className="row">
							<div className="d-flex justify-content-center p-0">
								<button
									className="w-100 p-3 border empPaystubButton"
									type="button"
									value="12"
									onClick={this.loadPaystub}
								>
									December
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default EmployeePaystubs;
