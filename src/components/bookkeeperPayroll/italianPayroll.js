import React, { Component } from "react";

class ItalianPayroll extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dailyAssistanceFees: this.props.dailyAssistanceFees,
			dailyAssistanceCharges: 0,
			expenseCharges: this.props.expenseCharges,
			tourBookingHours: this.props.tourBookingHours,
			tourBookingCharges: 0,
			totalGrossPay: 0,
		};
	}

	componentDidMount = () => {
		this.setTourCharges();
		this.setDailyAssistanceCharges();
		this.setState(
			{
				dailyAssistanceFees: this.props.dailyAssistanceFees,
				expenseCharges: this.props.expenseCharges,
				tourBookingHours: this.props.tourBookingHours,
			},
			() => this.setGrossPay()
		);
	};

	componentDidUpdate = (prevProps, prevState) => {
		// console.log("Italian Payroll Props - CDU");
		// console.log(
		// 	"currentEmployee fName: " + this.props.currentEmployee.firstName
		// );
		// console.log("dailyAssistanceFees props: " + this.props.dailyAssistanceFees);
		// console.log("expenseCharges props: " + this.props.expenseCharges);
		// console.log("tourBookingHours props: " + this.props.tourBookingHours);
		// console.log("dailyAssistanceFees state: " + this.state.dailyAssistanceFees);
		// console.log("expenseCharges state: " + this.state.expenseCharges);
		// console.log("tourBookingHours state: " + this.state.tourBookingHours);

		if (prevProps.dailyAssistanceFees !== this.props.dailyAssistanceFees) {
			console.log("UPDATING DAF");
			this.setState(
				{ dailyAssistanceFees: this.props.dailyAssistanceFees },
				() => this.setDailyAssistanceCharges()
			);
			this.setState({ expenseCharges: this.props.expenseCharges }, () =>
				this.setGrossPay()
			);
			this.setState(
				{ tourBookingHours: this.props.tourBookingHours },
				this.setTourCharges
			);
		} else if (prevProps.expenseCharges !== this.props.expenseCharges) {
			console.log("UPDATING EXPENSECHARGES");
			this.setState(
				{ dailyAssistanceFees: this.props.dailyAssistanceFees },
				() => this.setDailyAssistanceCharges()
			);
			this.setState({ expenseCharges: this.props.expenseCharges }, () =>
				this.setGrossPay()
			);
			this.setState(
				{ tourBookingHours: this.props.tourBookingHours },
				this.setTourCharges
			);
		} else if (prevProps.tourBookingHours !== this.props.tourBookingHours) {
			console.log("UPDATING TBH");
			this.setState(
				{ dailyAssistanceFees: this.props.dailyAssistanceFees },
				() => this.setDailyAssistanceCharges()
			);
			this.setState({ expenseCharges: this.props.expenseCharges }, () =>
				this.setGrossPay()
			);
			this.setState(
				{ tourBookingHours: this.props.tourBookingHours },
				this.setTourCharges
			);
		}
	};

	setTourCharges = () => {
		console.log("SET TOUR CHARGES: " + this.state.tourBookingCharges);
		const tourBookingHourRate = 13;
		let tourCharges =
			Number(this.state.tourBookingHours) * Number(tourBookingHourRate);

		this.props.setTourBookingCharges(tourCharges);
		this.setState({ tourBookingCharges: tourCharges }, () =>
			this.setGrossPay()
		);
	};

	setDailyAssistanceCharges = () => {
		console.log("SET DAF CHARGES: " + this.state.dailyAssistanceFees);
		const dailyAssistanceRate = 9;
		let totalDailyCharges =
			Number(this.state.dailyAssistanceFees) * Number(dailyAssistanceRate);

		this.props.setDailyAssistanceCharges(totalDailyCharges);
		this.setState({ dailyAssistanceCharges: totalDailyCharges }, () => {
			this.setGrossPay();
		});
	};

	setGrossPay = () => {
		console.log("set gross pay called");

		let gross =
			Number(this.state.dailyAssistanceCharges) +
			Number(this.state.tourBookingCharges) +
			Number(this.state.expenseCharges);

		this.props.setGrossPay(gross);
		this.setState({
			totalGrossPay: gross,
		});
	};

	handleDAFInput = (e) => {
		this.props.setDailyAssistanceFees(e.target.value);
		this.setState({ dailyAssistanceFees: e.target.value }, () =>
			this.setDailyAssistanceCharges()
		);
	};

	handleDAFChargesInput = (e) => {
		this.props.setDailyAssistanceCharges(e.target.value);
		this.setState({ dailyAssistanceCharges: e.target.value }, () =>
			this.setGrossPay()
		);
	};

	handleExpenseInput = (e) => {
		this.props.setExpenseCharges(e.target.value);
		this.setState({ expenseCharges: e.target.value }, this.setGrossPay);
	};

	handleBookingHoursInput = (e) => {
		this.setState({ tourBookingHours: e.target.value }, this.setTourCharges);
	};

	handleBookingFeesInput = (e) => {
		this.setState({ tourBookingCharges: e.target.value }, this.setGrossPay);
	};

	render() {
		return (
			<>
				<div className="row">
					<div className="col">
						<h3>Tour Administration Fees</h3>
					</div>
				</div>
				{this.props.renderTourAdminFees()}
				<div className="row">
					<div className="col">
						<i>Total Hours: {this.state.tourBookingHours}</i>
					</div>
					<div className="col">
						<i>Administration Total: ${this.state.tourBookingCharges} </i>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<h3>Daily Assistance Fees</h3>
					</div>
				</div>
				{this.props.renderDailyAssistanceFees()}
				<div className="row">
					<div className="col">
						<i>Total Days: {this.state.dailyAssistanceFees}</i>
					</div>
					<div className="col">
						<i>Daily Assistance Total: ${this.state.dailyAssistanceCharges} </i>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<h3>Expenses</h3>
					</div>
				</div>
				{this.props.renderExpenses()}
				<div className="row">
					<div className="col">
						<i>Total Expenses: ${this.state.expenseCharges}</i>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<h3>Paystub</h3>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<p>Daily Assistance Fees: </p>
						<input
							type="text"
							value={this.state.dailyAssistanceFees}
							onChange={this.handleDAFInput}
						/>
					</div>
					<div className="col">
						<p>Daily Assistance Charges: </p>
						{" $ "}
						<input
							type="text"
							value={this.state.dailyAssistanceCharges}
							onChange={this.handleDAFChargesInput}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<p>Booking Hours: </p>
						<input
							type="text"
							value={this.state.tourBookingHours}
							onChange={this.handleBookingHoursInput}
						/>
					</div>
					<div className="col">
						<p>Booking Fees: </p>
						{" $ "}
						<input
							type="text"
							value={this.state.tourBookingCharges}
							onChange={this.handleBookingFeesInput}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<p>Expense Fees: </p>
						{" $ "}
						<input
							type="text"
							value={this.state.expenseCharges}
							onChange={this.handleExpenseInput}
						/>
					</div>
					<div className="col">
						<p>Gross Pay: </p>
						{" $ "}
						<input type="text" value={this.state.totalGrossPay} readOnly />
					</div>
				</div>
			</>
		);
	}
}

export default ItalianPayroll;
