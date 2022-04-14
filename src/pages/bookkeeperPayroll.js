import React, { Component } from "react";
import PayrollOverview from "../components/bookkeeperPayroll/payrollOverview";
import ProccessPayroll from "../components/bookkeeperPayroll/processPayroll";
import BottomAdminNav from "../components/navs/bottomAdminNav";
import payrollController from "../controllers/payrollController";
import TopNavWrapper from "../functionalComponents/topNavWrapper";

class BookkeeperPayroll extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedMonth: 0,
			selectedYear: 2020,
			payrollsToProcess: [],
			scene: 0,
			noPayrollError: false,
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
			this.loadPayrollsToProcess();
		} else if (this.state.selectedYear !== prevState.selectedYear) {
			this.loadPayrollsToProcess();
		}
	};

	/**
	 * controls the state of number of errors
	 */
	setNoPayrollError = () => {
		this.setState({ noPayrollError: true }, () =>
			setInterval(() => this.setState({ noPayrollError: false }), 4000)
		);
	};

	/**
	 * loads all of the payrolls needing to be processed
	 */
	loadPayrollsToProcess = async () => {
		let payrolls = await payrollController.getPayrollByIsProcessed(0);

		let filteredToSelectedPeriod = payrolls.data.filter(
			(e) =>
				new Date(e.dateOfPayroll).getFullYear() ===
					new Date(
						this.state.selectedYear,
						this.state.selectedMonth
					).getFullYear() &&
				new Date(e.dateOfPayroll).getMonth() ===
					new Date(this.state.selectedYear, this.state.selectedMonth).getMonth()
		);

		console.log(filteredToSelectedPeriod);
		this.setState({ payrollsToProcess: filteredToSelectedPeriod });
	};

	/**
	 * handle state for month 
	 * @param {*} e 
	 */
	handleMonthChange = (e) => {
		this.setState({ selectedMonth: e.target.value });
	};

	/**
	 * handle state for year
	 * @param {*} e 
	 */
	handleYearChange = (e) => {
		this.setState({ selectedYear: e.target.value });
	};

	/**
	 * handle state for scene (what its rendering at a time)
	 * @param {*} e 
	 */
	handleSceneChange = (e) => {
		this.setState({ scene: e });
	};

	renderScene = () => {
		if (this.state.scene === 0) {
			return (
				<PayrollOverview
					handleYearChange={this.handleYearChange}
					handleMonthChange={this.handleMonthChange}
					selectedYear={this.state.selectedYear}
					selectedMonth={this.state.selectedMonth}
					payrollsToProcess={this.state.payrollsToProcess}
					handleSceneChange={this.handleSceneChange}
					setNoPayrollError={this.setNoPayrollError}
					noPayrollError={this.state.noPayrollError}
				/>
			);
		} else if (this.state.scene === 1) {
			return (
				<ProccessPayroll
					payrollsToProcess={this.state.payrollsToProcess}
					handleSceneChange={this.handleSceneChange}
					loadPayrollsToProcess={this.loadPayrollsToProcess}
				/>
			);
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
						{this.renderScene()}
					</div>
					<div className="col-2"></div>
				</div>
			</div>
		);
	}
}

export default BookkeeperPayroll;
