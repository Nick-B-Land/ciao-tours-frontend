import React, { Component } from "react";

/**
 * ExpenseForm
 * Purpose: returns the expense form back to the payroll page to be shown on screen and controls input
 * 
Locally-defined functions/variables
	createFormattedDate - changes the selected day on the calendar and converts the date object into string format for input tag to read
	formatDateFromSelectedDay - converts the date object into string format for input tag to read
	handleDate - updates the date state object and calls to recreate formatted date
	handleExpenseDescInput - controls the state of the expense description when user enters info
	handleExpenseAmountInput - controls the state of the expense amount on change
	handleExpenseSubmit - controls the form submit by calling to add expense to database
	handleCancel - cancels the form by setting the chosen form to 0 (none selected)

Props
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
		console.log("Date before formatting", this.state.date);
		let newString = this.state.date.getFullYear() + "-" + (this.state.date.getMonth()+1 < 10 ? "0" + (this.state.date.getMonth()+1) : (this.state.date.getMonth()+1)) + 
			"-" + (this.state.date.getDate() < 10 ? "0" + this.state.date.getDate() : this.state.date.getDate());
		this.setState({ formattedDate : newString }, () => console.log("Date after changing: ", this.state.formattedDate));
	}

	componentDidMount = () => {
		this.createFormattedDate();
	}

	componentDidUpdate = (preprops, prestate) => {
		if (preprops.selectedDay !== this.props.selectedDay){
			this.setState({ date : new Date(this.props.selectedDay) }, () => this.formatDateFromSelectedDay());
		}
	}

	/**
	 * handles the date input for form 
	 * @param {*} e new date
	 */
	handleDate = (e) => {
		this.setState({ date : new Date(e.target.value + "T12:00:00") }, () => this.createFormattedDate());
	}

	/**
	 * handles the expense desc for form 
	 * @param {*} e new desc
	 */
	handleExpenseDescInput = (e) => {
		this.setState({ expenseDesc: e.target.value });
	};

	/**
	 * handles state expense amount for form
	 * @param {*} e new amount
	 */
	handleExpenseAmountInput = (e) => {
		this.setState({ expenseAmount: e.target.value });
	};

	/**
	 * handles the form submit
	 */
	handleExpenseSubmit = () => {
		this.props.addExpense(this.state.expenseDesc, this.state.expenseAmount, this.state.date);
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
							value={this.state.expenseDesc}
							onChange={this.handleExpenseDescInput}
						/>
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
						/>
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
			</>
		);
	}
}

export default ExpenseForm;
