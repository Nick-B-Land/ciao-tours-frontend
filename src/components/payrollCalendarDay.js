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
		return (
			<div className="col">
				<div className="row">
					<div className="col">
						<h3>Date: {this.state.calenderDay.getDate()}</h3>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<p>Events go here</p>
					</div>
				</div>
			</div>
		);
	}
}

export default PayrollCalenderDay;
