import React, { Component } from "react";
import DailyAssistanceForm from "../employeePayroll/dailyAssistanceForm";
import CalendarDayReport from "./calendarDayReport";
import ExpenseForm from "./expenseForm";
import TimeOffForm from "./timeOffForm";
import TourBookingForm from "./tourBookingForm";
import WorkDayForm from "./workDayForm";
import MonthlyFeeForm from "./monthlyFeeForm";

/**
 * EmployeePayrollForm
 * Purpose: handles which form component to load into the space based on the button that was clicked
Props
	selectedDay - currently selected day
	
	addWorkDay - adds a work day to the database
	addTourBooking - adds tour booking to database
	addDailyAssistanceFee - adds assistance fee to the database
	addTimeOff - adds time off to the database
	addExpense - adds expense to the database

	handleReloadEvents - controls the state of reloading events after deletion
	handleSelectedDay - controls the state of the currently selected day
	handleSelectedForm - controls the state of the currently selected form
*/

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
		} else if (this.props.selectedForm === 5) {
			return (
				<MonthlyFeeForm
					addMonthlyFees={this.props.addMonthlyFees}
					handleSelectedForm={this.props.handleSelectedForm}
					payrollID={this.props.payrollID}
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
