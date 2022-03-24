import React, { Component } from "react";
import "../../style/employeeCalendarCSS.css";

class CalendarEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="row calendarItem p-0 m-0">
				<div className="col p-0">
					<p className="p-0 m-0">{this.props.type}</p>
				</div>
			</div>
		);
	}
}

export default CalendarEvent;
