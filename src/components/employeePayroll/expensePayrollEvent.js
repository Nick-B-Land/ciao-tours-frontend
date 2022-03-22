import React, { Component } from "react";

class ExpensePayrollEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="row">
				<div className="col">
					<p>Event Type: EXP</p>
				</div>
			</div>
		);
	}
}

export default ExpensePayrollEvent;
