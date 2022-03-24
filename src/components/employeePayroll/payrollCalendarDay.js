import React, { Component } from "react";
import CalendarEvent from "./calendarEvent";
import "../style/employeeCalendarCSS.css";
/*
Local Functions
	handleDayClick - updates the selected day and events for that day, runs when a day is clicked on
	  in the calendar
	filterPayrollData - filters payroll events to events that are on the clicked day, runs in componentDidMount
	  and componentDidUpdate
	renderPayrollEvents - maps out all of the events for a given day and loads them into the calendar as components,
	  runs in the render method under the calendar date

Props
	year - currently selected year
	month - currently selected month
	day - currently selected day
	payrollData - an array of payroll data objects for currently selected payroll

	handleSelectedEvents - handles the state of selectedEvents for a specific day
		located: empoloyeePayroll
	handleSelectedDay - handles the state of the selectedDay for the clicked on day
		located: employeePayroll
*/

class PayrollCalenderDay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			calenderDay: new Date(),
			events: [],
		};
	}

	componentDidMount = () => {
		this.setState({
			calenderDay: new Date(this.props.year, this.props.month, this.props.day),
		});
		this.filterPayrollData();
	};

	componentDidUpdate(prevProps) {
		if (this.props.payrollData !== prevProps.payrollData) {
			this.filterPayrollData();
		}
	}

	// updates the day that was clicked and the days events
	handleDayClick = () => {
		this.props.handleSelectedEvents(this.state.events);

		let day = new Date(this.props.year, this.props.month, this.props.day);
		this.props.handleSelectedDay(day);
	};

	//filters all payroll events to only events that match the components date
	filterPayrollData = () => {
		let payrollEvents = [];

		if (this.props.payrollData) {
			this.props.payrollData.forEach((e) => {
				if (
					this.state.calenderDay.getDate() ===
					new Date(e.dateOfPayrollData).getDate()
				) {
					payrollEvents.push(e);
				}
			});
		}
		this.setState({ events: payrollEvents });
	};

	// maps out the events for the calendar day and loads them into the calendar as components
	renderPayrollEvents = () => {
		var type;
		return this.state.events.map((e) => {
			if (e.payrollEvent === 1) {
				type = "Hours";
			} else if (e.payrollEvent === 2) {
				type = "Tour Booking";
			} else if (e.payrollEvent === 3) {
				type = "Assistance Fee";
			} else if (e.payrollEvent === 4) {
				type = "Time off";
			} else if (e.payrollEvent === 7) {
				type = "Expense";
			} else {
				type = "";
			}
			return <CalendarEvent key={e.payrollDataId} data={e} type={type} />;
		});
	};

	render() {
		return (
			<div className="col calenderDay" onClick={this.handleDayClick}>
				{/* {this.state.calenderDay.getDate() ===
				new Date(this.props.selectedDay).getDate()
					? this.renderSelectedStatus()
					: null} */}
				<div className="row">
					<div className="col">
						<h3
							className="d-flex justify-content-start"
							class={
								this.state.calenderDay.getDate() ===
								new Date(this.props.selectedDay).getDate()
									? "selecteddate"
									: null
							}
						>
							{this.state.calenderDay.getDate()}
						</h3>
					</div>
				</div>
				<div className="row calendarSize overflow-auto">
					{this.state.events.length !== 0 ? (
						this.renderPayrollEvents()
					) : (
						<div className="row">
							<div className="col">
								<p>No Events</p>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default PayrollCalenderDay;
