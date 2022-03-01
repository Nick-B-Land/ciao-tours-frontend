import React, { Component } from "react";
import BottomEmpNav from "../components/bottomEmpNav";
import EmployeePayrollCalender from "../components/employeePayrollCalendar";
import TopNavWrapper from "../functionalComponents/topNavWrapper";

class EmployeePayroll extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedMonth: 0,
			selectedYear: 2020,
		};
	}

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
					<TopNavWrapper />
					<BottomEmpNav />
				</div>
				<div className="row py-4">
					<div className="col-6 d-flex justify-content-center">
						<select
							className="form-select w-50"
							onChange={this.handleYearChange}
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
					<div className="col-2"></div>
					<div className="col-8 innerAdmin">
						<EmployeePayrollCalender
							selectedMonth={this.state.selectedMonth}
							selectedYear={this.state.selectedYear}
						/>
					</div>
					<div className="col-2"></div>
				</div>
			</div>
		);
	}
}

export default EmployeePayroll;
