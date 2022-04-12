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
			formattedDate: "",
			dateError: false,
			dateErrorText: "",
			descError: false,
			descErrorText: "",
			hoursError: false,
			hoursErrorText: "",
			clientError: false,
			clientErrorText: ""
		};
	}

	createFormattedDate = () => {
		console.log("Date before formatting", this.state.date);
		this.props.handleSelectedDay(this.state.date);
		let newString = this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1 < 10 ? "0" + (this.state.date.getMonth() + 1) : (this.state.date.getMonth() + 1)) +
			"-" + (this.state.date.getDate() < 10 ? "0" + this.state.date.getDate() : this.state.date.getDate());
		this.setState({ formattedDate: newString }, () => console.log("Date after changing: ", this.state.formattedDate));
	}

	formatDateFromSelectedDay = () => {
		console.log("Date before formatting", this.state.date);
		let newString = this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1 < 10 ? "0" + (this.state.date.getMonth() + 1) : (this.state.date.getMonth() + 1)) +
			"-" + (this.state.date.getDate() < 10 ? "0" + this.state.date.getDate() : this.state.date.getDate());
		this.setState({ formattedDate: newString }, () => console.log("Date after changing: ", this.state.formattedDate));
	}

	componentDidMount = () => {
		this.createFormattedDate();
		console.log("DATE (cdm): " + this.state.formattedDate);
	}

	componentDidUpdate = (preprops, prestate) => {
		if (preprops.selectedDay !== this.props.selectedDay) {
			this.setState({ date: new Date(this.props.selectedDay) }, () => this.formatDateFromSelectedDay());
		}
	}

	handleDate = (e) => {
		if (e.target.value === "" || e.target.value === undefined) {
			this.setState({ dateError: true, dateErrorText: "Date can't be empty." })
		} else {
			this.setState({ dateError: false, dateErrorText: "" })
		}
		this.setState({ date: new Date(e.target.value + "T12:00:00") }, () => this.createFormattedDate());
	}

	handleClientNameInput = (e) => {
		if (e.target.value === "" || e.target.value === null) {
			this.setState({ clientError: true, clientErrorText: "Name Can't be empty." })
		} else {
			this.setState({ clientError: false, clientErrorText: "" })
		}
		this.setState({ clientName: e.target.value });
	};

	handleBookingDescInput = (e) => {
		if (e.target.value === "" || e.target.value === null) {
			this.setState({ descError: true, descErrorText: "Desc can't be empty." })
		} else {
			this.setState({ descError: false, descErrorText: "" })
		}
		this.setState({ bookingDesc: e.target.value });
	};

	handleNumHoursInput = (e) => {
		if (e.target.value === "" || parseInt(e.target.value) < 0) {
			this.setState({ hoursError: true, hoursErrorText: "Hours can't be empty and should be +ve." })
		} else if (isNaN(+e.target.value)) {
			this.setState({ hoursError: true, hoursErrorText: "Hours should be in numbers" })
		} else {
			this.setState({ hoursError: false, hoursErrorText: "" })
		}
		this.setState({ numHours: e.target.value });
	};

	handleTourBookingSubmit = () => {
		if(this.state.dateError ===true || this.state.descError ===true || this.state.hoursError === true || this.state.clientError===true||
			this.state.bookingDesc===""||this.state.numHours===""||this.state.clientName===""||this.state.date===""|| this.state.date===undefined )
			{
			this.setState({ error: true, errorMessage: "Please Complete the form." });
			setInterval(() => this.setState({ error: false, errorMessage: "" }), 4000);
			
		}else{
			this.props.addTourBooking(
				this.state.bookingDesc,
				this.state.numHours,
				this.state.clientName,
				this.state.date
			);
			this.props.handleSelectedForm(0);
	
		}
	};

	handleCancel = () => {
		this.props.handleSelectedForm(0);
	}

	render() {
		const{error,errorMessage,descError,descErrorText,clientError,clientErrorText,hoursError,hoursErrorText,dateError,dateErrorText} = this.state;
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
						<div className="row errorText">
							{dateError && <div className="error "> {dateErrorText} </div>}
						</div>

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
						<div className="row errorText">
							{descError && <div className="error "> {descErrorText} </div>}
						</div>

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
						<div className="row errorText">
							{hoursError && <div className="error "> {hoursErrorText} </div>}
						</div>

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
						<div className="row errorText">
							{clientError&& <div className="error "> {clientErrorText} </div>}
						</div>

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
				{error &&
					<div className="row">
						<div className="col-2"></div>
						<div className=" col-8  alert alert-danger d-flex align-items-center" role="alert">
							<div>
								{errorMessage}
							</div>
						</div>
						<div className="col-2"></div>
					</div>
				}
			</>
		);
	}
}

export default TourBookingForm;
