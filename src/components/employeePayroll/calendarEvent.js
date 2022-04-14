import React, { Component } from "react";
import "../../style/employeeCalendarCSS.css";

/**
 * component for a single event written to the calendar
*/
class CalendarEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="row calendarItem p-0 m-0">
				<div className="col p-0">
					<p className={"ps-1 p-0 m-0 " + this.props.bg}>{this.props.type}</p>
				</div>
			</div>
		);
	}
}

export default CalendarEvent;
