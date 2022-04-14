import React, { Component, useEffect } from "react";
import "../style/stylesheet.css";
import BottomEmpNav from "../components/navs/bottomEmpNav";
import Paystub from "../components/paystub";
import paystubController from "../controllers/paystubController";
import TopNavWrapper from "../functionalComponents/topNavWrapper";

/**
 * EmployeePaystubs
 * Purpose: employee page to see paystubs from any of their working months
 *
 * Locally-Defined Functions and Variables
 * Variables
 * 	year - current year
 * 	month - current month
 * 	paystubPeriods - list of
 */
class EmployeePaystubs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedMonth: 0,
			selectedYear: 2020,
			selectedPaystub: {},
		};
	}

	componentDidMount = () => {
		console.log(this.props.currentUser);
		this.setState({
			selectedMonth: new Date().getMonth(),
			selectedYear: new Date().getFullYear(),
		});

		this.loadEmployeePaystubs();
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (this.state.selectedMonth !== prevState.selectedMonth) {
			this.loadEmployeePaystubs();
		} else if (this.state.selectedYear !== prevState.selectedYear) {
			this.loadEmployeePaystubs();
		}
	};

	/**
	 * handles state for month
	 * @param {*} e 
	 */
	handleMonthChange = (e) => {
		this.setState({ selectedMonth: e.target.value });
	};

	/**
	 * handles state for year
	 * @param {*} e 
	 */
	handleYearChange = (e) => {
		this.setState({ selectedYear: e.target.value });
	};

	/**
	 * loads paystubs for a given employee
	 */
	loadEmployeePaystubs = async () => {
		let response = await paystubController.getPaystubByEID(
			this.props.currentUser.eID
		);

		let filteredToSelectedPeriod = response.data.filter(
			(e) =>
				new Date(e.dateOfPaystub).getFullYear() ===
					new Date(
						this.state.selectedYear,
						this.state.selectedMonth
					).getFullYear() &&
				new Date(e.dateOfPaystub).getMonth() ===
					new Date(this.state.selectedYear, this.state.selectedMonth).getMonth()
		);

		if (filteredToSelectedPeriod.length > 0) {
			this.setState({ selectedPaystub: filteredToSelectedPeriod[0] }, () =>
				console.log(this.state.selectedPaystub)
			);
		} else {
			this.setState({ selectedPaystub: {} });
		}
	};

	/**
	 * renders the selected paystub for the chosen month/year
	 * @returns 
	 */
	renderSelectedPaystub = () => {
		if (this.state.selectedPaystub.paystubId) {
			return <Paystub {...this.state.selectedPaystub} />;
		} else {
			return <h3 className="text-center">No Paystub for this month!</h3>;
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
							<div className="col">
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
						</div>
						<div className="row">
							<div className="col">{this.renderSelectedPaystub()}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default EmployeePaystubs;
