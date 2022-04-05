

class MonthlyFeeForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			officeUsage: "",
			phoneUsage: ""
		}
	}

	handleOfficeUsage(e) {

	}

	handlePhoneUsage(e) {

	}

	handleUsageSubmit() {

	}

	handleCancel = () => {
		this.props.handleSelectedForm(0);
	}

    render() {
		return (
			<>
				<div className="row">
					<div className="col mt-2">
						<h3>Add Monthly Fees</h3>
					</div>
				</div>
				<div className="row">
					<div className="col">Office Usage</div>
				</div>
				<div className="row">
					<div className="col">
						<input
							type="text"
							value={this.state.officeUsage}
							onChange={this.handleOfficeUsage}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">Phone Usage</div>
				</div>
				<div className="row">
					<div className="col">
						<input
							type="text"
							value={this.state.phoneUsage}
							onChange={this.handlePhoneUsage}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<button
							type="button"
							className="btn PrimaryButton mt-3 ms-0"
							onClick={this.handleUsageSubmit}
						>
							Add WorkDay
						</button>
						<button
							type="button"
							className="btn PrimaryButton mt-3 ms-3"
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