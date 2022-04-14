import React, { Component } from "react";

/*
locally-defined functions/variables
	createFormattedDate - changes the selected day on the calendar and converts the date object into string format for input tag to read
	formatDateFromSelectedDay - converts the date object into string format for input tag to read
	handleDate - updates the date state object and calls to recreate formatted date
	handleClientNameInput - controls state of client name from form input
	handleBookingDescInput - controls state of desc from form input
	handleNumHoursInput - controls state of hours from form input 
	handleTourBookingSubmit - controls the form submit by calling to add tour booking to database
	handleCancel - cancels the form by setting the chosen form to 0 (none selected)

props
	selectedDay - currently selected day

	handleSelectedDay - controls state of currently selected day
		located: employeePayroll
	addTourBooking - adds tour booking to the database
		located: employeePayroll
	handleSelectedForm - controls state of currently selected form
		located: employeePayroll
*/

class TourBookingForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookingDesc: "",
			numHours: "",
			clientName: "",
			date: new Date(this.props.selectedDay),
			formattedDate: ""
		};
	}

	/**
	 * changes the selected day on the calendar and converts the date object into string format for input tag to read
	 */
	createFormattedDate = () => {
		console.log("Date before formatting", this.state.date);
		this.props.handleSelectedDay(this.state.date);
		let newString = this.state.date.getFullYear() + "-" + (this.state.date.getMonth()+1 < 10 ? "0" + (this.state.date.getMonth()+1) : (this.state.date.getMonth()+1)) + 
			"-" + (this.state.date.getDate() < 10 ? "0" + this.state.date.getDate() : this.state.date.getDate());
		this.setState({ formattedDate : newString }, () => console.log("Date after changing: ", this.state.formattedDate));
	}

	/**
	 * converts the date object into string format for input tag to read
	 */
	formatDateFromSelectedDay = () => {
		console.log("Date before formatting", this.state.date);
		let newString = this.state.date.getFullYear() + "-" + (this.state.date.getMonth()+1 < 10 ? "0" + (this.state.date.getMonth()+1) : (this.state.date.getMonth()+1)) + 
			"-" + (this.state.date.getDate() < 10 ? "0" + this.state.date.getDate() : this.state.date.getDate());
		this.setState({ formattedDate : newString }, () => console.log("Date after changing: ", this.state.formattedDate));
	}

	componentDidMount = () => {
		this.createFormattedDate();
		console.log("DATE (cdm): " + this.state.formattedDate);
	}

	componentDidUpdate = (preprops, prestate) => {
		if (preprops.selectedDay !== this.props.selectedDay){
			this.setState({ date : new Date(this.props.selectedDay) }, () => this.formatDateFromSelectedDay());
		}
	}

	/**
	 * handles the state of selected date 
	 * @param {*} e 
	 */
	handleDate = (e) => {
		this.setState({ date : new Date(e.target.value + "T12:00:00") }, () => this.createFormattedDate());
	}

	/**
	 * handles state for client
	 * @param {*} e 
	 */
	handleClientNameInput = (e) => {
		this.setState({ clientName: e.target.value });
	};

	/**
	 * handles state of booking description
	 * @param {*} e 
	 */
	handleBookingDescInput = (e) => {
		this.setState({ bookingDesc: e.target.value });
	};

	/**
	 * handles state of hours entered
	 * @param {} e 
	 */
	handleNumHoursInput = (e) => {
		this.setState({ numHours: e.target.value });
	};

	/**
	 * handles the form submit
	 */
	handleTourBookingSubmit = () => {
		this.props.addTourBooking(
			this.state.bookingDesc,
			this.state.numHours,
			this.state.clientName,
			this.state.date
		);
		this.props.handleSelectedForm(0);
	};

	/**
	 * handles the cancel of form by clearing form from screen
	 */
	handleCancel = () => {
		this.props.handleSelectedForm(0);
	}

	render() {
		return (
			<>
				<div className="row">
					<div className="col mt-2">
						<h3>Add Tour Booking</h3>
					</div>
				</div>
				<div className="row">
					<div className="col">Date</div>
				</div>
				<div className="row">
					<div className="col">
						<input
							className="mw-100"
							type="date"
							value={this.state.formattedDate}
							onChange={this.handleDate}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">Description</div>
				</div>
				<div className="row">
					<div className="col">
						<input
							type="text"
							value={this.state.bookingDesc}
							onChange={this.handleBookingDescInput}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">Number of Hours</div>
				</div>
				<div className="row">
					<div className="col">
						<input
							type="text"
							value={this.state.numHours}
							onChange={this.handleNumHoursInput}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">Client</div>
				</div>
				<div className="row">
					<div className="col">
						<input
							type="text"
							value={this.state.clientName}
							onChange={this.handleClientNameInput}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<button
							type="button"
							className="btn PrimaryButton mt-3 m-0"
							onClick={this.handleTourBookingSubmit}
						>
							Add Booking
						</button>
						<button
							type="button"
							className="btn SecondaryButton mt-3 ms-3"
							onClick={this.handleCancel}
						>
							Cancel
						</button>
					</div>
				</div>
			</>
		);
	}
}

export default TourBookingForm;
