import React, { Component } from "react";

/*
locally-defined functions/variables
	createFormattedDate - changes the selected day on the calendar and converts the date object into string format for input tag to read
	formatDateFromSelectedDay - converts the date object into string format for input tag to read
	handleDate - updates the date state object and calls to recreate formatted date
	handleExpenseDescInput - controls the state of the expense description when user enters info
	handleExpenseAmountInput - controls the state of the expense amount on change
	handleExpenseSubmit - controls the form submit by calling to add expense to database
	handleCancel - cancels the form by setting the chosen form to 0 (none selected)

props
	selectedDay - currenly selected day

	handleSelectedDay - controls state of currently selected day
		located: employeePayroll
	addExpense - adds expense to the database
		located: employeePayroll
	handleSelectedForm - controls state of currently selected form
		located: employeePayroll
*/

class ExpenseForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expenseDesc: "",
			expenseAmount: "",
			date: new Date(this.props.selectedDay),
			formattedDate: "",
			dateError: false,
			dateErrorText: "",
			descError: false,
			descErrorText: "",
			amountError: false,
			amountErrorText: "",

		};
	}

	createFormattedDate = () => {
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

	handleExpenseDescInput = (e) => {
		if (e.target.value === "" || e.target.value === null) {
			this.setState({ descError: true, descErrorText: "Desc can't be empty." })
		} else {
			this.setState({ descError: false, descErrorText: "" })
		}
		this.setState({ expenseDesc: e.target.value });
	};

	handleExpenseAmountInput = (e) => {
		if (e.target.value === "" || parseInt(e.target.value) < 0) {
			this.setState({ amountError: true, amountErrorText: "Amount can't be empty and should be +ve." })
		} else if (isNaN(+e.target.value)) {
			this.setState({ amountError: true, amountErrorText: "Amount should be in numbers" })
		} else {
			this.setState({ amountError: false, amountErrorText: "" })
		}
		this.setState({ expenseAmount: e.target.value });
	};

	handleExpenseSubmit = () => {
		if (this.state.dateError === true || this.state.descError === true || this.state.amountError === true ||
			this.state.expenseAmount === "" || this.state.expenseDesc === "" || this.state.date === "" || this.state.date === undefined) {
			this.setState({ error: true, errorMessage: "Please Complete the form." });
			setInterval(() => this.setState({ error: false, errorMessage: "" }), 4000);

		} else {
			this.props.addExpense(this.state.expenseDesc, this.state.expenseAmount, this.state.date);
			this.props.handleSelectedForm(0);
		}
	};

	handleCancel = () => {
		this.props.handleSelectedForm(0);
	}
	render() {
		const { error, errorMessage, dateError, dateErrorText, descError, descErrorText, amountError, amountErrorText } = this.state;
		return (
			<>
				<div className="row">
					<div className="col mt-2">
						<h3>Add Expense</h3>
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
						/>	<div className="row errorText">
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
							value={this.state.expenseDesc}
							onChange={this.handleExpenseDescInput}
						/><div className="row errorText">
							{descError && <div className="error "> {descErrorText} </div>}
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col">Amount</div>
				</div>
				<div className="row">
					<div className="col">
						<input
							type="text"
							value={this.state.expenseAmount}
							onChange={this.handleExpenseAmountInput}
						/><div className="row errorText">
							{amountError && <div className="error "> {amountErrorText} </div>}
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<button
							type="button"
							className="btn PrimaryButton mt-3 m-0"
							onClick={this.handleExpenseSubmit}
						>
							Add Expense
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

export default ExpenseForm;
