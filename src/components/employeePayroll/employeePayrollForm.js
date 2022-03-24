import React, { Component } from "react";
import DailyAssistanceForm from "../employeePayroll/dailyAssistanceForm";
import CalendarDayReport from "./calendarDayReport";
import ExpenseForm from "./expenseForm";
import TimeOffForm from "./timeOffForm";
import TourBookingForm from "./tourBookingForm";
import WorkDayForm from "./workDayForm";

class EmployeePayrollForm extends Component {
	handleRender = () => {
		if (this.props.selectedForm === 1) {
			return (
				<WorkDayForm
					addWorkDay={this.props.addWorkDay}
					selectedDay={this.props.selectedDay}
					handleSelectedDay={this.props.handleSelectedDay}
					handleSelectedForm={this.props.handleSelectedForm}
				/>
			);
		} else if (this.props.selectedForm === 2) {
			return (
				<TourBookingForm
					addTourBooking={this.props.addTourBooking}
					selectedDay={this.props.selectedDay}
					handleSelectedDay={this.props.handleSelectedDay}
					handleSelectedForm={this.props.handleSelectedForm}
				/>
			);
		} else if (this.props.selectedForm === 3) {
			return (
				<DailyAssistanceForm
					addDailyAssistanceFee={this.props.addDailyAssistanceFee}
					selectedDay={this.props.selectedDay}
					handleSelectedDay={this.props.handleSelectedDay}
					handleSelectedForm={this.props.handleSelectedForm}
				/>
			);
		} else if (this.props.selectedForm === 4) {
			return (
				<TimeOffForm
					addTimeOff={this.props.addTimeOff}
					selectedDay={this.props.selectedDay}
					handleSelectedDay={this.props.handleSelectedDay}
					handleSelectedForm={this.props.handleSelectedForm}
				/>
			);
		} else if (this.props.selectedForm === 7) {
			return (
				<ExpenseForm
					addExpense={this.props.addExpense}
					selectedDay={this.props.selectedDay}
					handleSelectedDay={this.props.handleSelectedDay}
					handleSelectedForm={this.props.handleSelectedForm}
				/>
			);
		} else if (this.props.selectedEvents.length !== 0) {
			return (
				<CalendarDayReport
					selectedEvents={this.props.selectedEvents}
					handleReloadEvents={this.props.handleReloadEvents}
				/>
			);
		} else if (this.props.selectedForm === 0) {
			return null;
		}
	};

	render() {
		return <>{this.handleRender()}</>;
	}
}

export default EmployeePayrollForm;
