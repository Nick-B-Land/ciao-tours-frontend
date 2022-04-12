import React, { Component } from "react";

/*
local functions/variables
	createFormattedDate - changes the selected day on the calendar and converts the date object into string format for input tag to read
	formatDateFromSelectedDay - converts the date object into string format for input tag to read
	handleDate - updates the date state object and calls to recreate formatted date
	handleClientNameInput - updates the state object for the client name inputted by the user
	handleDailyAssistanceSubmit - submits the form and adds the fee to the database
	handleCancel - cancels the form by setting the chosen form to 0 (none selected)

props
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
			dateError: false,
			dateErrorText: "",
			clientError: false,
			clientErrorText: ""

		};
	}

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

	componentDidMount = () => {
		this.createFormattedDate();
	};

	componentDidUpdate = (preprops, prestate) => {
		if (preprops.selectedDay !== this.props.selectedDay) {
			this.setState({ date: new Date(this.props.selectedDay) }, () =>
				this.formatDateFromSelectedDay()
			);
		}
	};

	handleDate = (e) => {
		if (e.target.value === "" || e.target.value === undefined) {
			this.setState({ dateError: true, dateErrorText: "Date can't be empty." })
		} else {
			this.setState({ dateError: false, dateErrorText: "" })
		}
		this.setState({ date: new Date(e.target.value + "T12:00:00") }, () =>
			this.createFormattedDate()
		);
	};

	handleClientNameInput = (e) => {
		if (e.target.value === "" || e.target.value === null) {
			this.setState({ clientError: true, clientErrorText: "Name Can't be empty." })
		} else {
			this.setState({ clientError: false, clientErrorText: "" })
		}
		this.setState({ clientName: e.target.value });
	};

	handleDailyAssistanceSubmit = () => {
		if (this.state.dateError === true || this.state.clientError === true ||
			this.state.clientName === "" || this.state.date === "" || this.state.date === undefined) {
			this.setState({ error: true, errorMessage: "Please Complete the form." });
			setInterval(() => this.setState({ error: false, errorMessage: "" }), 4000);

		} else {
			this.props.addDailyAssistanceFee(this.state.clientName, this.state.date);
			this.props.handleSelectedForm(0);
		}
	};

	handleCancel = () => {
		this.props.handleSelectedForm(0);
	};

	render() {
		const { dateError, dateErrorText, clientError, clientErrorText, error, errorMessage } = this.state;
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
						<div className="row errorText">
							{dateError && <div className="error "> {dateErrorText} </div>}
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
							{clientError && <div className="error "> {clientErrorText} </div>}
						</div>
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

export default DailyAssistanceForm;
