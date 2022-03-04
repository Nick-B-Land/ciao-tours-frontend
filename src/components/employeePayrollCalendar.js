import React, { Component } from "react";
import PayrollCalenderDay from "./payrollCalendarDay";

//
// props
// selectedYear - year in number format
// selectedMonth - month in js date index format
// selectedDay - day selected from user input in js date format
// payrollData - array of payroll data object for currently selected payroll
// handleSelectedDay - function to set selected calendar day in employeePayroll
//

class EmployeePayrollCalender extends Component {
	constructor(props) {
		super(props);
		this.state = {
			daysInMonth: 0,
		};
	}

	componentDidMount = () => {
		// console.log(
		// 	"calendar props - year: " +
		// 		this.props.selectedYear +
		// 		" month: " +
		// 		this.props.selectedMonth
		// );
		this.setState({
			daysInMonth: this.getDaysInMonth(
				new Date(this.props.selectedYear, this.props.selectedMonth)
			),
		});
	};

	componentDidUpdate(prevProps) {
		if (this.props.selectedMonth !== prevProps.selectedMonth) {
			this.setState({
				daysInMonth: this.getDaysInMonth(
					new Date(this.props.selectedYear, this.props.selectedMonth)
				),
			});
		} else if (this.props.selectedYear !== prevProps.selectedYear) {
			this.setState({
				daysInMonth: this.getDaysInMonth(
					new Date(this.props.selectedYear, this.props.selectedMonth)
				),
			});
		}
	}

	getDaysInMonth = (anyDateInMonth) => {
		return new Date(
			anyDateInMonth.getFullYear(),
			anyDateInMonth.getMonth() + 1,
			0
		).getDate();
	};

	//this and renderFiveWeeks should be optimized into one function
	//lots of redundant code here, just did it cheap and easy for prototyping
	renderFourWeeks = () => {
		let numDays = 1;

		return (
			<>
				<div className="row">
					{[...Array(7)].map((e) => {
						return (
							<PayrollCalenderDay
								key={numDays}
								year={this.props.selectedYear}
								month={this.props.selectedMonth}
								day={numDays++}
								selectedDay={this.props.selectedDay}
								payrollData={this.props.payrollData}
								handleSelectedDay={this.props.handleSelectedDay}
							/>
						);
					})}
				</div>
				<div className="row">
					{[...Array(7)].map((e) => {
						return (
							<PayrollCalenderDay
								key={numDays}
								year={this.props.selectedYear}
								month={this.props.selectedMonth}
								day={numDays++}
								selectedDay={this.props.selectedDay}
								payrollData={this.props.payrollData}
								handleSelectedDay={this.props.handleSelectedDay}
							/>
						);
					})}
				</div>
				<div className="row">
					{[...Array(7)].map((e) => {
						return (
							<PayrollCalenderDay
								key={numDays}
								year={this.props.selectedYear}
								month={this.props.selectedMonth}
								day={numDays++}
								selectedDay={this.props.selectedDay}
								payrollData={this.props.payrollData}
								handleSelectedDay={this.props.handleSelectedDay}
							/>
						);
					})}
				</div>
				<div className="row">
					{[...Array(7)].map((e) => {
						return (
							<PayrollCalenderDay
								key={numDays}
								year={this.props.selectedYear}
								month={this.props.selectedMonth}
								day={numDays++}
								selectedDay={this.props.selectedDay}
								payrollData={this.props.payrollData}
								handleSelectedDay={this.props.handleSelectedDay}
							/>
						);
					})}
				</div>
			</>
		);
	};

	//see comment on renderFourWeeks
	renderFiveWeeks = () => {
		let numDays = 1;
		let extraDays = this.state.daysInMonth - 28;

		return (
			<>
				<div className="row">
					{[...Array(7)].map(() => {
						return (
							<PayrollCalenderDay
								key={numDays}
								year={this.props.selectedYear}
								month={this.props.selectedMonth}
								day={numDays++}
								selectedDay={this.props.selectedDay}
								payrollData={this.props.payrollData}
								handleSelectedDay={this.props.handleSelectedDay}
							/>
						);
					})}
				</div>
				<div className="row">
					{[...Array(7)].map((e) => {
						return (
							<PayrollCalenderDay
								key={numDays}
								year={this.props.selectedYear}
								month={this.props.selectedMonth}
								day={numDays++}
								selectedDay={this.props.selectedDay}
								payrollData={this.props.payrollData}
								handleSelectedDay={this.props.handleSelectedDay}
							/>
						);
					})}
				</div>
				<div className="row">
					{[...Array(7)].map((e) => {
						return (
							<PayrollCalenderDay
								key={numDays}
								year={this.props.selectedYear}
								month={this.props.selectedMonth}
								day={numDays++}
								selectedDay={this.props.selectedDay}
								payrollData={this.props.payrollData}
								handleSelectedDay={this.props.handleSelectedDay}
							/>
						);
					})}
				</div>
				<div className="row">
					{[...Array(7)].map((e) => {
						return (
							<PayrollCalenderDay
								key={numDays}
								year={this.props.selectedYear}
								month={this.props.selectedMonth}
								day={numDays++}
								selectedDay={this.props.selectedDay}
								payrollData={this.props.payrollData}
								handleSelectedDay={this.props.handleSelectedDay}
							/>
						);
					})}
				</div>
				<div className="row">
					{[...Array(extraDays)].map((e) => {
						return (
							<PayrollCalenderDay
								key={numDays}
								year={this.props.selectedYear}
								month={this.props.selectedMonth}
								day={numDays++}
								selectedDay={this.props.selectedDay}
								payrollData={this.props.payrollData}
								handleSelectedDay={this.props.handleSelectedDay}
							/>
						);
					})}
					{[...Array(7 - extraDays)].map((e) => {
						return <div key={extraDays--} className="col"></div>;
					})}
				</div>
			</>
		);
	};

	//this is probably uneeded once the render week functions are optimized
	renderCalender = () => {
		if (this.state.daysInMonth % 7 === 0) {
			return this.renderFourWeeks();
		} else {
			return this.renderFiveWeeks();
		}
	};

	render() {
		return (
			<div className="row">
				<div className="col">{this.renderCalender()}</div>
			</div>
		);
	}
}

export default EmployeePayrollCalender;
