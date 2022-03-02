import React, { Component } from "react";
import BottomEmpNav from "../components/bottomEmpNav";
import EmployeePayrollCalender from "../components/employeePayrollCalendar";
import payrollController from "../controllers/payrollController";
import TopNavWrapper from "../functionalComponents/topNavWrapper";

class EmployeePayroll extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedMonth: 0,
			selectedYear: 2020,
			selectedPayrollID: 0,
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
		} else if (this.state.selectedYear !== prevState.selectedYear) {
			this.handlePayrollObject();
		}
	}

	handlePayrollObject = async () => {
		let response = await payrollController.getPayrollByEID(
			this.props.currentUser.employeeID
		);

		console.log(response);
		if (response.data.length === 0) {
			console.log("no payroll");

			let newPayroll = {
				payrollId: "",
				employeeId: this.props.currentUser.employeeID,
				dateOfPayroll: new Date().toISOString(),
			};

			let createResponse = await payrollController.createPayroll(newPayroll);
			console.log(createResponse);
		} else {
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
					console.log("found match");
					foundMatch = true;
					this.setState({ selectedPayrollID: payrolls[i].payrollId });
					break;
				}
			}

			if (foundMatch === false) {
				console.log("creating new payroll");
				let newPayroll = {
					payrollId: "",
					employeeId: this.props.currentUser.employeeID,
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
		console.log(this.state.selectedPayrollID);
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
				<div className="row">
					<div className="col-8 ms-5 innerAdmin">
						<EmployeePayrollCalender
							selectedMonth={this.state.selectedMonth}
							selectedYear={this.state.selectedYear}
							selectedPayrollID={this.state.selectedPayrollID}
						/>
					</div>
					<div className="col-4"></div>
				</div>
			</div>
		);
	}
}

export default EmployeePayroll;
