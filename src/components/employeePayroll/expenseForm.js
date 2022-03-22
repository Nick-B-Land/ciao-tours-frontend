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
		};
	}

	handleExpenseDescInput = (e) => {
		this.setState({ expenseDesc: e.target.value });
	};

	handleExpenseAmountInput = (e) => {
		this.setState({ expenseAmount: e.target.value });
	};

	handleExpenseSubmit = () => {
		this.props.addExpense(this.state.expenseDesc, this.state.expenseAmount);
	};

	render() {
		return (
			<>
				<div className="row">
					<div className="col mt-2">
						<h3>Add Expense</h3>
					</div>
				</div>
				<div className="row">
					<div className="col-5 d-flex flex-row-reverse">Description:</div>
					<div className="col">
						<input
							type="text"
							value={this.state.expenseDesc}
							onChange={this.handleExpenseDescInput}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-5 d-flex flex-row-reverse">Amount:</div>
					<div className="col">
						<input
							type="text"
							value={this.state.expenseAmount}
							onChange={this.handleExpenseAmountInput}
						/>
					</div>
				</div>
				<div className="row">
					<button
						type="button"
						className="btn PrimaryButton"
						onClick={this.handleExpenseSubmit}
					>
						Add Expense
					</button>
				</div>
			</>
		);
	}
}

export default ExpenseForm;
