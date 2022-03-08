import React, { Component } from "react";

class WorkDayPayrollEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="row">
				<div className="col">
					<p>Event Type: WD</p>
				</div>
			</div>
		);
	}
}

export default WorkDayPayrollEvent;
