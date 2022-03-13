import React, { Component } from "react";

//
// props
// addDailyAssistanceFee - function that uses front end controller to add a payroll data object in employeePayroll
//

class TourBookingForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookingDesc: "",
			numHours: "",
			clientName: "",
		};
	}

	handleClientNameInput = (e) => {
		this.setState({ clientName: e.target.value });
	};

	handleBookingDescInput = (e) => {
		this.setState({ bookingDesc: e.target.value });
	};

	handleNumHoursInput = (e) => {
		this.setState({ numHours: e.target.value });
	};

	handleTourBookingSubmit = () => {
		this.props.addTourBooking(
			this.state.bookingDesc,
			this.state.numHours,
			this.state.clientName
		);
	};

	render() {
		return (
			<>
				<div className="row">
					<div className="col mt-2">
						<h3>Add Tour Booking</h3>
					</div>
				</div>
				<div className="row">
					<div className="col-5 d-flex flex-row-reverse">Description:</div>
					<div className="col">
						<input
							type="text"
							value={this.state.bookingDesc}
							onChange={this.handleBookingDescInput}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-5 d-flex flex-row-reverse">Number of Hours:</div>
					<div className="col">
						<input
							type="text"
							value={this.state.numHours}
							onChange={this.handleNumHoursInput}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-5 d-flex flex-row-reverse">Client:</div>
					<div className="col">
						<input
							type="text"
							value={this.state.clientName}
							onChange={this.handleClientNameInput}
						/>
					</div>
				</div>
				<div className="row">
					<button
						type="button"
						className="btn PrimaryButton"
						onClick={this.handleTourBookingSubmit}
					>
						Add Booking
					</button>
				</div>
			</>
		);
	}
}

export default TourBookingForm;
