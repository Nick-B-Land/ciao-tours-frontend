import React, { Component } from "react";
import CalendarEvent from "./calendarEvent";
import "../style/employeeCalendarCSS.css";
//
// props
// year - year in number format
// month - month in js date index format
// day - day in int format
// selectedDay - day selected from user input in js date format
// payrollData - array of payroll data object for currently selected payroll
// handleSelectedDay - function to set selected calendar day in employeePayroll
//

class PayrollCalenderDay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			calenderDay: new Date(),
			events: [],
		};
	}

	componentDidMount = () => {
		//console.log(this.props.payrollData);
		this.setState({
			calenderDay: new Date(this.props.year, this.props.month, this.props.day),
		});
		this.filterPayrollData();
	};

	componentDidUpdate(prevProps) {
		// console.log(
		// 	"calendar day selecteday prop day: " +
		// 		new Date(this.props.selectedDay).getDate() +
		// 		" state day: " +
		// 		this.state.calenderDay.getDate()
		// );

		// console.log(
		// 	"update in calendar day, prev selectedday: " +
		// 		prevProps.selectedDay +
		// 		" current selectedday: " +
		// 		this.props.selectedDay
		// );
		// console.log(
		// 	"calendar day equality test: " + this.state.calenderDay.getDate() ===
		// 		this.props.selectedDay
		// );
		if (this.props.payrollData !== prevProps.payrollData) {
			this.filterPayrollData();
		}
	}

	handleDayClick = () => {
		// console.log(
		// 	"day is clicked in payrollCalender, calendar day: " +
		// 		this.state.calenderDay
		// );

		// console.log(
		// 	"calendar day props- year: " +
		// 		this.props.year +
		// 		" month: " +
		// 		this.props.month +
		// 		" day: " +
		// 		this.props.day
		// )
		this.props.handleSelectedEvents(this.state.events);

		let day = new Date(this.props.year, this.props.month, this.props.day);
		this.props.handleSelectedDay(day);
	};

	//this should be replaced by some sort of visual status of selection
	// renderSelectedStatus = () => {
	// 	return (
	// 		<div className="w-100 h-75 selectedcolor"></div>
	// 	);
	// };

	//filters all payroll events to only events that match the components date
	filterPayrollData = () => {
		let payrollEvents = [];

		if(this.props.payrollData){
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

	//helper function
	displayEventType = (eventId) => {
		if (eventId === 1) {
			return "Work Day";
		} else if (eventId === 2) {
			return "Tour Booking";
		} else if (eventId === 3) {
			return "Daily Assistance Fee";
		} else if (eventId === 4) {
			return "Time Off";
		} else if (eventId === 5) {
			return "Office Usage";
		} else if (eventId === 6) {
			return "Other Usage";
		} else if (eventId === 7) {
			return "Expense";
		}
	};

	//this is a very sloppy way of just ensuring the prototype works
	//should map out components specific to each event
	renderPayrollEvents = () => {
		var type;
		return this.state.events.map((e) => {
			if (e.payrollEvent === 1) {
				type="Hours";
			} else if (e.payrollEvent === 2) {
				type="Tour Booking";
			} else if (e.payrollEvent === 3) {
				type="Assistance Fee";
			} else if (e.payrollEvent === 4) {
				type="Time off";
			} else if (e.payrollEvent === 7) {
				type="Expense";
			} else {
				type="";
			};
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
							class={this.state.calenderDay.getDate() === new Date(this.props.selectedDay).getDate() ? "selecteddate" : null}
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
