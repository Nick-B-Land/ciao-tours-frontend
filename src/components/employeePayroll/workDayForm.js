import React, { Component } from "react";

/*
locally-defined functions/variables
	createFormattedDate - changes the selected day on the calendar and converts the date object into string format for input tag to read
	formatDateFromSelectedDay - converts the date object into string format for input tag to read
	handleDate - updates the date state object and calls to recreate formatted date
	handleNumHoursInput - controls state of number of hours entered in form field
	handleWorkDaySubmit - controls the form submit by calling to add work day to database
	handleCancel - cancels the form by setting the chosen form to 0 (none selected)

props
	selectedDay - currenly selected day

	handleSelectedDay - controls state of currently selected day
		located: employeePayroll
	addWorkDay - adds work day to the database
		located: employeePayroll
	handleSelectedForm - controls state of currently selected form
		located: employeePayroll
*/

class WorkDayForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
			numHours: "",
			date: new Date(this.props.selectedDay),
			formattedDate: "",
			hourError: false,
			dateError:false,
			hourErrorText:"",
			dateErrorText:"",
			error:false,
			errorMessage:""
		};
	}

	createFormattedDate = () => {
		this.props.handleSelectedDay(this.state.date);
		let newString = this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1 < 10 ? "0" + (this.state.date.getMonth() + 1) : (this.state.date.getMonth() + 1)) +
			"-" + (this.state.date.getDate() < 10 ? "0" + this.state.date.getDate() : this.state.date.getDate());
		this.setState({ formattedDate: newString }, () => console.log("Date after changing: ", this.state.formattedDate));
	}

	formatDateFromSelectedDay = () => {
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
		} else{
			this.setState({ dateError: false, dateErrorText: "" })
		}
		this.setState({ date: new Date(e.target.value + "T12:00:00") }, () => this.createFormattedDate());
		
	}

	handleNumHoursInput = (e) => {
		if (e.target.value === "" || parseInt(e.target.value) <0) {
			this.setState({ hourError: true, hourErrorText: "Hours can't be empty and should be +ve." })
		} else if (isNaN(+e.target.value)) {
			this.setState({ hourError: true, hourErrorText: "Hours should be in numbers" })
		} else{
			this.setState({ hourError: false, hourErrorText: "" })
		}
		this.setState({ numHours: e.target.value });
		
	};

	handleWorkDaySubmit = () => {
		if (this.state.hourError=== true ||
			this.state.dateError=== true ||
			this.state.numHours==="" ||
			this.state.date ===""|| this.state.date===undefined
		) {
			this.setState({ error: true, errorMessage: "Please check the all inputs." });
			setInterval(() => this.setState({ error: false, errorMessage: "" }), 4000);
		} else {

		}
		this.props.addWorkDay(this.state.numHours, this.state.date);
	};

	handleCancel = () => {
		this.props.handleSelectedForm(0);
	}

	render() {
		const {dateError,dateErrorText,hourError,hourErrorText,error,errorMessage} = this.state;
		return (
			<>
				<div className="row">
					<div className="col mt-2">
						<h3>Add Work Day</h3>
					</div>
				</div>
				<div className="row">
					<div className="col">Date</div>
				</div>
				<div className="row">
					<div className="col">
						<input
							type="date"
							value={this.state.formattedDate}
							onChange={this.handleDate}
						/>
							<div className="row errorText">
									{dateError && <div className="error"> {dateErrorText} </div>}
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
									{hourError && <div className="error"> {hourErrorText} </div>}
								</div>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<button
							type="button"
							className="btn PrimaryButton mt-3 ms-0"
							onClick={this.handleWorkDaySubmit}
						>
							Add WorkDay
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

export default WorkDayForm;
