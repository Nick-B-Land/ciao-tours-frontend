import React, { Component } from "react";

//
// props
// addDailyAssistanceFee - function that uses front end controller to add a payroll data object in employeePayroll
//

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

	createFormatedDate = () => {
		this.props.handleSelectedDay(this.state.date);
		let newString = this.state.date.getFullYear() + "-" + (this.state.date.getMonth()+1 < 10 ? "0" + (this.state.date.getMonth()+1) : (this.state.date.getMonth()+1)) + 
			"-" + (this.state.date.getDate() < 10 ? "0" + this.state.date.getDate() : this.state.date.getDate());
		this.setState({ formattedDate : newString }, () => console.log("Date after changing: ", this.state.formattedDate));
	}

	formatDateFromSelectedDay = () => {
		console.log("Date before formatting", this.state.date);
		let newString = this.state.date.getFullYear() + "-" + (this.state.date.getMonth()+1 < 10 ? "0" + (this.state.date.getMonth()+1) : (this.state.date.getMonth()+1)) + 
			"-" + (this.state.date.getDate() < 10 ? "0" + this.state.date.getDate() : this.state.date.getDate());
		this.setState({ formattedDate : newString }, () => console.log("Date after changing: ", this.state.formattedDate));
	}

	componentDidMount = () => {
		this.createFormatedDate();
	}

	componentDidUpdate = (preprops, prestate) => {
		if (preprops.selectedDay !== this.props.selectedDay){
			this.setState({ date : new Date(this.props.selectedDay) }, () => this.formatDateFromSelectedDay());
		}
	}

	handleDate = (e) => {
		this.setState({ date : new Date(e.target.value + "T12:00:00") }, () => this.createFormatedDate());
	}

	handleExpenseDescInput = (e) => {
		this.setState({ expenseDesc: e.target.value });
	};

	handleExpenseAmountInput = (e) => {
		this.setState({ expenseAmount: e.target.value });
	};

	handleExpenseSubmit = () => {
		this.props.addExpense(this.state.expenseDesc, this.state.expenseAmount);
		this.props.handleSelectedForm(0);
	};

	handleCancelSubmit = () => {
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
							className="btn PrimaryButton mt-3 ms-3"
							onClick={this.handleCancelSubmit}
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
