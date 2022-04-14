import React, { Component } from "react";
import payrollDataController from "../../controllers/payrollDataController";
import "../../style/employeeCalendarCSS.css";
import "../../style/stylesheet.css";

/** 
Locally-defined functions and variables
Functions
	deletePayrollDataEvent - deletes a selected payroll data event from the database and calendar 
	
Props
	selectedEvents - an array of the current day's events
	
	handleReloadEvents - calls on the update of calendar
		located: employeePayroll
*/

class CalendarDayReport extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	/**
	 * deletes an event from the payrolldata table in database
	 * @param {*} payrollDataId the id of the one to delete
	 */
	deletePayrollDataEvent = async (payrollDataId) => {
		let response = await payrollDataController.deletePayrollDataEvent(
			payrollDataId
		);

		this.props.handleReloadEvents();
	};

	render() {
		return (
			<>
				<div className="row">
					<div className="col mt-2">
						<h3>Day at a Glance</h3>
					</div>
				</div>
				<div className="row">
					<div className="col mt-2">
						{this.props.selectedEvents.length !== 0
							? this.props.selectedEvents.map((e) => {
									if (e.payrollEvent === 1) {
										return (
											<>
												<div className="">
													<b>Workday hours added:</b> {e.noOfWorkingHours}
												</div>
												<div>
													<input
														type="button"
														className="button btn-sm PrimaryButton"
														id={e.payrollDataId}
														value="Remove"
														onClick={() =>
															this.deletePayrollDataEvent(e.payrollDataId)
														}
													/>
												</div>
											</>
										);
									} else if (e.payrollEvent === 2) {
										return (
											<>
												<div>
													<b>Tour Booking</b>
												</div>
												<div className="ps-3">
													Description: {e.tourBookingAdminDescription}
												</div>
												<div className="ps-3">
													Hours: {e.tourBookingNumOfHours}
												</div>
												<div className="ps-3">
													Client: {e.tourBookingClient}
												</div>
												<div>
													<input
														type="button"
														className="button btn-sm PrimaryButton"
														id={e.payrollDataId}
														value="Remove"
														onClick={() =>
															this.deletePayrollDataEvent(e.payrollDataId)
														}
													/>
												</div>
											</>
										);
									} else if (e.payrollEvent === 3) {
										return (
											<>
												<div>
													<b>Daily Assistance Fee</b>
												</div>
												<div className="ps-3">
													Client: {e.dailyAssistanceClient}
												</div>
												<div>
													<input
														type="button"
														className="button btn-sm PrimaryButton"
														id={e.payrollDataId}
														value="Remove"
														onClick={() =>
															this.deletePayrollDataEvent(e.payrollDataId)
														}
													/>
												</div>
											</>
										);
									} else if (e.payrollEvent === 4) {
										return (
											<>
												<div>
													<b>Time Off:</b> {e.timeOff} hours
												</div>
												<div>
													<input
														type="button"
														className="button btn-sm PrimaryButton"
														id={e.payrollDataId}
														value="Remove"
														onClick={() =>
															this.deletePayrollDataEvent(e.payrollDataId)
														}
													/>
												</div>
											</>
										);
									} else if (e.payrollEvent === 7) {
										return (
											<>
												<div>
													<b>Expense</b>
												</div>
												<div className="ps-3">
													Description: {e.expenseDescription}
												</div>
												<div className="ps-3">Amount: {e.expenseAmount}</div>
												<div>
													<input
														type="button"
														className="button btn-sm PrimaryButton"
														id={e.payrollDataId}
														value="Remove"
														onClick={() =>
															this.deletePayrollDataEvent(e.payrollDataId)
														}
													/>
												</div>
											</>
										);
									} else {
										return null;
									}
							  })
							: "No Events"}
					</div>
				</div>
			</>
		);
	}
}
export default CalendarDayReport;
