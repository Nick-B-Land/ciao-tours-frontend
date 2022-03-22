import React, { Component } from "react";
import DailyAssistanceForm from "./dailyAssistanceForm";
import ExpenseForm from "./expenseForm";
import TimeOffForm from "./timeOffForm";
import TourBookingForm from "./tourBookingForm";
import WorkDayForm from "./workDayForm";

class EmployeePayrollForm extends Component {
	handleRender = () => {
		if (this.props.selectedForm === 0) return null;
		else if (this.props.selectedForm === 1) {
			return <WorkDayForm addWorkDay={this.props.addWorkDay} />;
		} else if (this.props.selectedForm === 2) {
			return <TourBookingForm addTourBooking={this.props.addTourBooking} />;
		} else if (this.props.selectedForm === 3) {
			return (
				<DailyAssistanceForm
					addDailyAssistanceFee={this.props.addDailyAssistanceFee}
				/>
			);
		} else if (this.props.selectedForm === 4) {
			return <TimeOffForm addTimeOff={this.props.addTimeOff} />;
		} else if (this.props.selectedForm === 7) {
			return <ExpenseForm addExpense={this.props.addExpense} />;
		}
	};

	render() {
		return <>{this.handleRender()}</>;
	}
}

export default EmployeePayrollForm;
