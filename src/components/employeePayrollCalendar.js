import React, { Component } from "react";
import PayrollCalenderDay from "./payrollCalendarDay";

// props
// selectedYear - year in number format
// selectedMonth - month in js date index format
//

class EmployeePayrollCalender extends Component {
	constructor(props) {
		super(props);
		this.state = {
			daysInMonth: 0,
		};
	}

	componentDidMount = () => {
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
							/>
						);
					})}
				</div>
			</>
		);
	};

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
