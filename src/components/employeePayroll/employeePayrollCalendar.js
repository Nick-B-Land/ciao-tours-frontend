import React, { Component } from "react";
import PayrollCalenderDay from "../employeePayroll/payrollCalendarDay";

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

	//see comment on renderFourWeeks
	renderCalender = () => {
		let numDays = 1;
		let extraDays = this.state.daysInMonth - 28;

		//gets the weekday of the first as 0-6
		let firstOfMonth = new Date(
			this.props.selectedYear,
			this.props.selectedMonth,
			1
		);
		let firstWeekday = firstOfMonth.getDay();

		//gets the weekday of the last as 0-6
		let lastOfMonth = new Date(
			this.props.selectedYear,
			this.props.selectedMonth,
			this.state.daysInMonth
		);
		let lastWeekday = lastOfMonth.getDay();

		return (
			<>
				<div className="row">
					<div className="col d-flex justify-content-center">Sunday</div>
					<div className="col d-flex justify-content-center">Monday</div>
					<div className="col d-flex justify-content-center">Tuesday</div>
					<div className="col d-flex justify-content-center">Wednesday</div>
					<div className="col d-flex justify-content-center">Thursday</div>
					<div className="col d-flex justify-content-center">Friday</div>
					<div className="col d-flex justify-content-center">Saturday</div>
				</div>
				<div className="row">
					{[...Array(firstWeekday)].map((e) => {
						return <div key={extraDays--} className="col"></div>;
					})}
					{[...Array(7 - firstWeekday)].map((e) => {
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
				{this.state.daysInMonth - numDays + 1 >= 7 ? (
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
				) : this.state.daysInMonth - numDays - 1 > 0 ? (
					<div className="row">
						{[...Array(lastWeekday + 1)].map((e) => {
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
						{[...Array(6 - lastWeekday)].map((e) => {
							return <div key={extraDays--} className="col"></div>;
						})}
					</div>
				) : null}
				{this.state.daysInMonth - numDays + 1 > 0 ? (
					<div className="row">
						{[...Array(lastWeekday + 1)].map((e) => {
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
						{[...Array(6 - lastWeekday)].map((e) => {
							return <div key={extraDays--} className="col"></div>;
						})}
					</div>
				) : null}
			</>
		);
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
