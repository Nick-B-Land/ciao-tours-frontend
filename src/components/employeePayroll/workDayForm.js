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
			formattedDate: ""
		};
	}

	/**
	 * changes the selected day on the calendar and converts the date object into string format for input tag to read
	 */
	createFormattedDate = () => {
		this.props.handleSelectedDay(this.state.date);
		let newString = this.state.date.getFullYear() + "-" + (this.state.date.getMonth()+1 < 10 ? "0" + (this.state.date.getMonth()+1) : (this.state.date.getMonth()+1)) + 
			"-" + (this.state.date.getDate() < 10 ? "0" + this.state.date.getDate() : this.state.date.getDate());
		this.setState({ formattedDate : newString }, () => console.log("Date after changing: ", this.state.formattedDate));
	}

	/**
	 * converts the date object into string format for input tag to read
	 */
	formatDateFromSelectedDay = () => {
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
	 * controls state for selected date
	 * @param {} e 
	 */
	handleDate = (e) => {
		this.setState({ date : new Date(e.target.value + "T12:00:00") }, () => this.createFormattedDate());
	}

	/**
	 * controls state of number of hours inputted
	 * @param {} e 
	 */
	handleNumHoursInput = (e) => {
		this.setState({ numHours: e.target.value });
	};

	/**
	 * handles the form submit
	 */
	handleWorkDaySubmit = () => {
		this.props.addWorkDay(this.state.numHours, this.state.date);
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
			</>
		);
	}
}

export default WorkDayForm;
