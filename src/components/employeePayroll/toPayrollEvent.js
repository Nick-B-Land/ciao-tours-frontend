import React, { Component } from "react";

class TimeOffPayrollEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="row">
				<div className="col">
					<p>Event Type: TO</p>
				</div>
			</div>
		);
	}
}

export default TimeOffPayrollEvent;
