import React, { Component } from "react";

/**
Locally-defined functions and variables
	createFormattedDate - changes the selected day on the calendar and converts the date object into string format for input tag to read
	formatDateFromSelectedDay - converts the date object into string format for input tag to read
	handleDate - updates the date state object and calls to recreate formatted date
	handleClientNameInput - updates the state object for the client name inputted by the user
	handleDailyAssistanceSubmit - submits the form and adds the fee to the database
	handleCancel - cancels the form by setting the chosen form to 0 (none selected)

Props
	selectedDay - currently selected day
	
	handleSelectedDay - changes the currently selected day on the calendar
		located: employeePayroll
	addDailyAssistanceFee - adds the fee to the database
		located: employeePayroll
	handleSelectedForm - changes the state of the currently selected form 
		located: employeePayroll
*/

class DailyAssistanceForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			clientName: "",
			date: new Date(this.props.selectedDay),
			formattedDate: "",
		};
	}

	/**
	 * changes the selected day on the calendar and converts the date object into string format for input tag to read
	 */
	createFormattedDate = () => {
		this.props.handleSelectedDay(this.state.date);
		let newString =
			this.state.date.getFullYear() +
			"-" +
			(this.state.date.getMonth() + 1 < 10
				? "0" + (this.state.date.getMonth() + 1)
				: this.state.date.getMonth() + 1) +
			"-" +
			(this.state.date.getDate() < 10
				? "0" + this.state.date.getDate()
				: this.state.date.getDate());
		this.setState({ formattedDate: newString }, () =>
			console.log("Date after changing: ", this.state.formattedDate)
		);
	};

	/**
	 * converts the date object into string format for input tag to read
	 */
	formatDateFromSelectedDay = () => {
		let newString =
			this.state.date.getFullYear() +
			"-" +
			(this.state.date.getMonth() + 1 < 10
				? "0" + (this.state.date.getMonth() + 1)
				: this.state.date.getMonth() + 1) +
			"-" +
			(this.state.date.getDate() < 10
				? "0" + this.state.date.getDate()
				: this.state.date.getDate());
		this.setState({ formattedDate: newString }, () =>
			console.log("Date after changing: ", this.state.formattedDate)
		);
	};

	/**
	 * runs on page load and calls createFormattedDate to run
	 */
	componentDidMount = () => {
		this.createFormattedDate();
	};

	/**
	 * updates the current day if a new day is selected
	 * @param {*} preprops 
	 * @param {*} prestate 
	 */
	componentDidUpdate = (preprops, prestate) => {
		if (preprops.selectedDay !== this.props.selectedDay) {
			this.setState({ date: new Date(this.props.selectedDay) }, () =>
				this.formatDateFromSelectedDay()
			);
		}
	};

	/**
	 * handles the state of the current selected date
	 * @param {*} e new date
	 */
	handleDate = (e) => {
		this.setState({ date: new Date(e.target.value + "T12:00:00") }, () =>
			this.createFormattedDate()
		);
	};

	/**
	 * handles state of client name
	 * @param {*} e new client name
	 */
	handleClientNameInput = (e) => {
		this.setState({ clientName: e.target.value });
	};

	/**
	 * handles submit of the form and resets form to 0 so it disappears from screen
	 */
	handleDailyAssistanceSubmit = () => {
		this.props.addDailyAssistanceFee(this.state.clientName, this.state.date);
		this.props.handleSelectedForm(0);
	};

	/**
	 * handles cancelling of form by resetting it and making it disappear
	 */
	handleCancel = () => {
		this.props.handleSelectedForm(0);
	};

	render() {
		return (
			<>
				<div className="row">
					<div className="col">
						<h3>Add Daily Assistance Fee</h3>
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
							onClick={this.handleDailyAssistanceSubmit}
						>
							Add Fee
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

export default DailyAssistanceForm;
