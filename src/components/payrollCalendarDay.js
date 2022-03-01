import React, { Component } from "react";

class PayrollCalenderDay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			calenderDay: new Date(),
		};
	}

	componentDidMount = () => {
		this.setState({
			calenderDay: new Date(this.props.year, this.props.month, this.props.day),
		});
	};

	render() {
		console.log("calender day rendered");
		return (
			<div className="col">
				<h3>Date: {this.state.calenderDay.getDate()}</h3>
			</div>
		);
	}
}

export default PayrollCalenderDay;
