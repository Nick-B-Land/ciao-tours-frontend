import React, { Component } from "react";
import "../style/stylesheet.css";
import TopNav from "../components/navs/topNav";
import BottomAdminNav from "../components/navs/bottomAdminNav";
import paystubController from "../controllers/paystubController";
import Paystub from "../components/paystub";
import TopNavWrapper from "../functionalComponents/topNavWrapper";

class AdminReports extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedMonth: 0,
			selectedYear: 2020,
			paystubsToProcess: [],
			employeeSearchValue: "",
		};
	}

	componentDidMount = () => {
		console.log(this.props.currentUser);
		this.setState({
			selectedMonth: new Date().getMonth(),
			selectedYear: new Date().getFullYear(),
		});
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (this.state.selectedMonth !== prevState.selectedMonth) {
			this.loadPaystubsToProcess();
		} else if (this.state.selectedYear !== prevState.selectedYear) {
			this.loadPaystubsToProcess();
		}
	};

	/**
	 * loads the paystubs to process for reporting period
	 */
	loadPaystubsToProcess = async () => {
		let paystubs = await paystubController.getPaystub();

		let filteredToSelectedPeriod = paystubs.data.filter(
			(e) =>
				new Date(e.dateOfPaystub).getFullYear() ===
					new Date(
						this.state.selectedYear,
						this.state.selectedMonth
					).getFullYear() &&
				new Date(e.dateOfPaystub).getMonth() ===
					new Date(this.state.selectedYear, this.state.selectedMonth).getMonth()
		);

		console.log(filteredToSelectedPeriod);
		this.setState({ paystubsToProcess: filteredToSelectedPeriod });
	};

	/**
	 * handles the state for selected month
	 * @param {*} e 
	 */
	handleMonthChange = (e) => {
		this.setState({ selectedMonth: e.target.value });
	};

	/**
	 * handles the state for selected year
	 * @param {*} e 
	 */
	handleYearChange = (e) => {
		this.setState({ selectedYear: e.target.value });
	};

	/**
	 * handles state for employee search
	 * @param {*} e 
	 */
	handleEmployeeSearch = (e) => {
		this.setState({ employeeSearchValue: e.target.value });
	};

	/**
	 * calculates the total pay by period
	 * @returns 
	 */
	calculateTotalGrossPaidByPeriod = () => {
		let gross = 0;

		this.state.paystubsToProcess.forEach((e) => {
			gross += e.grossPay;
		});

		return gross.toFixed(2);
	};

	/**
	 * calculates the net pay by period
	 * @returns 
	 */
	calculateTotalNetPaidByPeriod = () => {
		let net = 0;

		this.state.paystubsToProcess.forEach((e) => {
			net += e.netPay;
		});

		return net.toFixed(2);
	};

	renderPayrollTotals = () => {
		console.log(this.state.paystubsToProcess.length);
		return (
			<>
				<h5>Number of Payrolls: {this.state.paystubsToProcess.length}</h5>
				<h5>Total Gross Pay: {this.calculateTotalGrossPaidByPeriod()}</h5>
				<h5>Total Net Pay: {this.calculateTotalNetPaidByPeriod()}</h5>
			</>
		);
	};

	/**
	 * filter the paystubs by the employee name
	 * @returns 
	 */
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
			return this.state.paystubsToProcess.map((paystub) => (
				<Paystub key={paystub.paystubId} {...paystub} />
			));
		}
	};

	render() {
		return (
			<div className="container-fluid p-0 adminEmployeesPage">
				<div className="row d-flex">
					<TopNavWrapper currentUser={this.props.currentUser} />
					<BottomAdminNav />
				</div>
				<div className="row">
					<div className="col-2"></div>
					<div className="col-8 min-vh-100 innerAdmin">
						<div className="row">
							<div className="employeeHeader p-4 pt-2 pb-2 text-center">
								<h1>Payroll Reports</h1>
							</div>
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
						<div className="row">
							<div className="col">
								<h3>Payroll Totals</h3>
							</div>
						</div>
						<div className="row">
							<div className="col">{this.renderPayrollTotals()}</div>
						</div>
						<div className="row">
							<div className="col">
								<h3>Monthly Paystubs</h3>
							</div>
						</div>
						<div className="row">
							<div className="col d-flex justify-content-center">
								<h5>Search for Employee</h5>
							</div>
						</div>
						<div className="row">
							<div className="col d-flex justify-content-center">
								<input
									type="text"
									value={this.state.employeeSearchValue}
									onChange={this.handleEmployeeSearch}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col">{this.renderMonthlyPaystubs()}</div>
						</div>
					</div>
					<div className="col-2"></div>
				</div>
			</div>
		);
	}
}

export default AdminReports;
