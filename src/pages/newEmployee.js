import React, { Component } from "react";
import "../style/stylesheet.css";
import BottomAdminNav from "../components/navs/bottomAdminNav";
import employeeController from "../controllers/employeeController";
import { Link } from "react-router-dom";
import userAccountController from "../controllers/userAccountController";
import TopNavWrapper from "../functionalComponents/topNavWrapper";

class NewEmployee extends Component {
	constructor(props) {
		super(props);
		this.hiddenFileBtn = React.createRef();
		this.state = {
			firstname: "",
			lastname: "",
			jobTitle: "",
			dateOfBirth: "",
			address: "",
			city: "",
			postalCode: "",
			province: "",
			country: "",
			email: "",
			phoneNumber: "",
			startdate: "",
			enddate: "",
			hourlywage: "",
			monthlysalary: "",
			institutionid: "",
			bankaccountnum: "",
			transitid: "",
			username: "",
			password: "",
			roleText: "",
			employeeType: 1,
			showUsernameError: true,
			showPasswordError: true,
			showRoleError: true,
			showFirstnameError: true,
			showLastnameError: true,
			showAddressError: true,
			showCityError: true,
			showEmailError: true,
			showStartDateError: true,
			showInstituiteIDError: true,
			showBANError: true,
			showTransIDError: true,
			fileSelected: false,

			UsernameError: "",
			PasswordError: "",
			RoleError: "",
			FirstnameError: "",
			LastnameError: "",
			AddressError: "",
			CityError: "",
			EmailError: "",
			StartDateError: "",
			InstituiteIDError: "",
			BANError: "",
			TransIDError: "",

			error: false,
			errorMessage: "",
		};
	}

	handleJobTitleInput = (e) => {
		this.setState({ jobTitle: e.target.value });
	};

	handleDOBInput = (e) => {
		this.setState({ dateOfBirth: e.target.value });
	};

	handlePostalCodeInput = (e) => {
		this.setState({ postalCode: e.target.value });
	};

	handleProvinceInput = (e) => {
		this.setState({ province: e.target.value });
	};

	handleCountryInput = (e) => {
		this.setState({ country: e.target.value });
	};

	handlePhoneNumberInput = (e) => {
		this.setState({ phoneNumber: e.target.value });
	};

	handleFirstnameInput = (e) => {
		if (e.target.value === "") {
			this.setState({
				showFirstnameError: true,
				FirstnameError: "First Name can't be empty.",
			});
		} else {
			this.setState({ showFirstnameError: false, FirstnameError: "" });
		}
		this.setState({ firstname: e.target.value });
	};

	handleLastnameInput = (e) => {
		if (e.target.value === "") {
			this.setState({
				showLastnameError: true,
				LastnameError: "Last Name can't be empty.",
			});
		} else {
			this.setState({ showLastnameError: false, LastnameError: "" });
		}
		this.setState({ lastname: e.target.value });
	};

	handleAddressInput = (e) => {
		if (e.target.value === "") {
			this.setState({
				showAddressError: true,
				AddressError: "Address can't be empty.",
			});
		} else {
			this.setState({ showAddressError: false, AddressError: "" });
		}
		this.setState({ address: e.target.value });
	};

	handleCityInput = (e) => {
		if (e.target.value === "") {
			this.setState({ showCityError: true, CityError: "City can't be empty." });
		} else {
			this.setState({ showCityError: false, CityError: "" });
		}
		this.setState({ city: e.target.value });
	};

	handleEmailInput = (e) => {
		if (e.target.value === "") {
			this.setState({
				showEmailError: true,
				EmailError: "Email can't be empty.",
			});
		} else {
			this.setState({ showEmailError: false, EmailError: "" });
		}
		this.setState({ email: e.target.value });
	};

	handleStartdateInput = (e) => {
		console.log(e.target.value);
		if (e.target.value === "") {
			this.setState({
				showStartDateError: true,
				StartDateError: "Start Date Invalid",
			});
		} else {
			this.setState({ showStartDateError: false, StartDateError: "" });
		}
		this.setState({ startdate: e.target.value });
	};

	handleEnddateInput = (e) => {
		this.setState({ enddate: e.target.value });
	};

	handleHourlywageInput = (e) => {
		this.setState({ hourlywage: e.target.value });
	};

	handleMonthlySalaryInput = (e) => {
		this.setState({ monthlysalary: e.target.value });
	};

	handleInstitutionIdInput = (e) => {
		if (e.target.value === "") {
			this.setState({
				showInstituiteIDError: true,
				InstituiteIDError: "Institution ID can't be empty.",
			});
		} else if (e.target.value.length > 3) {
			this.setState({
				showInstituiteIDError: true,
				InstituiteIDError: "Institution ID can't be more than 3 characters.",
			});
		} else {
			this.setState({ showInstituiteIDError: false, InstituiteIDError: "" });
		}

		this.setState({ institutionid: e.target.value });
	};

	handleBankAccountNumInput = (e) => {
		if (e.target.value === "") {
			this.setState({
				showBANError: true,
				BANError: "Account Number can't be empty.",
			});
		} else {
			this.setState({ showBANError: false, BANError: "" });
		}
		this.setState({ bankaccountnum: e.target.value });
	};

	handleTransitIdInput = (e) => {
		if (e.target.value === "") {
			this.setState({
				showTransIDError: true,
				TransIDError: "Transit ID can't be empty.",
			});
		} else {
			this.setState({ showTransIDError: false, TransIDError: "" });
		}

		this.setState({ transitid: e.target.value });
	};

	handleUsernameInput = (e) => {
		if (e.target.value === "") {
			this.setState({
				showUsernameError: true,
				UsernameError: "Username can't be empty.",
			});
		} else {
			this.setState({ showUsernameError: false, UsernameError: "" });
		}

		this.setState({ username: e.target.value });
	};

	handlePasswordInput = (e) => {
		if (e.target.value === "") {
			this.setState({
				showPasswordError: true,
				PasswordError: "Password can't be empty.",
			});
		} else {
			this.setState({ showPasswordError: false, PasswordError: "" });
		}
		this.setState({ password: e.target.value });
	};

	handleRoleInput = (e) => {
		if (e.target.value === "Select") {
			this.setState({
				showRoleError: true,
				RoleError: "Selected Role in invalid.",
			});
		} else {
			this.setState({ showRoleError: false, RoleError: "" });
		}
		this.setState({ roleText: e.target.value });
	};

	handleEmployeeType = (e) => {
		this.setState({ employeeType: e.target.value });
	};

	/**
	 * adds a new employee to the database with the inputted information
	 */
	handleNewEmployee = async () => {
		if (
			this.state.showUsernameError === true ||
			this.state.showRoleError === true ||
			this.state.startdate === true ||
			this.state.showPasswordError === true ||
			this.state.showFirstnameError === true ||
			this.state.showLastnameError === true ||
			this.state.showAddressError === true ||
			this.state.showEmailError === true ||
			this.state.showCityError === true ||
			this.state.showInstituiteIDError === true ||
			this.state.showBANError === true ||
			this.state.showTransIDError === true
		) {
			this.setState({ error: true, errorMessage: "Please Complete the form." });
			setInterval(
				() => this.setState({ error: false, errorMessage: "" }),
				4000
			);
		} else {
			let employeeObj = {
				employeeId: "",
				employeeType: this.state.employeeType,
				dateOfBirth: this.state.dateOfBirth,
				jobTitle: this.state.jobTitle,
				firstName: this.state.firstname,
				lastName: this.state.lastname,
				address: this.state.address,
				postalCode: this.state.postalCode,
				city: this.state.city,
				province: this.state.province,
				country: this.state.country,
				emailAddress: this.state.email,
				phoneNumber: this.state.phoneNumber,
				employeeEndDate: this.state.enddate,
				employeeStartDate: this.state.startdate,
				hourlyWage: this.state.hourlywage,
				institutionId: this.state.institutionid,
				monthlySalary: this.state.monthlysalary,
				transitId: this.state.transitid,
				bankAccountNumber: this.state.bankaccountnum,
			};

			let employeeResponse = await employeeController.createEmployee(
				employeeObj
			);

			console.log(employeeResponse);

			let userObj = {
				username: this.state.username,
				employeeID: employeeResponse.data.employeeId,
				password: this.state.password,
				role: this.state.roles,
			};

			let userResponse = await userAccountController.createUserAccount(userObj);

			console.log(userResponse);

			if (userResponse.status === 200) {
				this.props.navigate("/adminEmployees");
			}
		}
	};

	render() {
		const {
			showUsernameError,
			showPasswordError,
			showFirstnameError,
			showLastnameError,
			showRoleError,
			showAddressError,
			showCityError,
			showEmailError,
			showStartDateError,
			showInstituiteIDError,
			showBANError,
			showTransIDError,
			UsernameError,
			hiddenFileBtn,
			PasswordError,
			RoleError,
			FirstnameError,
			LastnameError,
			AddressError,
			CityError,
			EmailError,
			StartDateError,
			InstituiteIDError,
			BANError,
			TransIDError,
			error,
			errorMessage,
		} = this.state;

		return (
			<div className="container-fluid p-0 adminEmployeesPage">
				<div className="row d-flex">
					<TopNavWrapper currentUser={this.props.currentUser} />
					<BottomAdminNav />
				</div>
				<div className="row">
					<div className="col-2"></div>
					<div className="col-8 min-vh-100 innerAdmin">
						<div className="row mb-4">
							<div className="employeeHeader p-4 pt-2 pb-2 text-center">
								<h1 className="py-3">Create New Employee</h1>
							</div>
						</div>

						<div className="row">
							<div className="col-md-6">
								<div className="table-responsive">
									<table class="table newEmpTable">
										<tbody>
											<tr className="form-group">
												<td className="text-end">Username</td>
												<td>
													<input
														type="text"
														value={this.state.username}
														onChange={this.handleUsernameInput}
														className="form-control"
													/>
												</td>
												<td className="errorText">
													{showUsernameError && (
														<div className="error "> {UsernameError} </div>
													)}
												</td>
											</tr>
											<tr className="form-group">
												<td className="text-end">Password</td>
												<td>
													<input
														type="text"
														value={this.state.password}
														onChange={this.handlePasswordInput}
														className="form-control"
													/>
												</td>
												<td className="errorText">
													{showPasswordError && (
														<div className="error"> {PasswordError} </div>
													)}
												</td>
											</tr>
											<tr className="form-group">
												<td className="text-end">Job Title</td>
												<td>
													<input
														type="text"
														value={this.state.jobTitle}
														onChange={this.handleJobTitleInput}
														className="form-control"
													/>
												</td>
												<td className="errorText"></td>
											</tr>
											<tr className="form-group">
												<td className="text-end">First Name</td>
												<td>
													<input
														type="text"
														value={this.state.firstname}
														onChange={this.handleFirstnameInput}
														className="form-control"
													/>
												</td>
												<td className="errorText">
													{showFirstnameError && (
														<div className="error"> {FirstnameError} </div>
													)}
												</td>
											</tr>
											<tr className="form-group">
												<td className="text-end">Last Name</td>
												<td>
													<input
														type="text"
														value={this.state.lastname}
														onChange={this.handleLastnameInput}
														className="form-control"
													/>
												</td>
												<td className="errorText">
													{showLastnameError && (
														<div className="error"> {LastnameError} </div>
													)}
												</td>
											</tr>
											<tr className="form-group">
												<td className="text-end">Date of Birth</td>
												<td>
													<input
														type="date"
														value={this.state.dateOfBirth}
														onChange={this.handleDOBInput}
														className="form-control"
													/>
												</td>
												<td className="errorText">
													{showStartDateError && (
														<div className="error"> {StartDateError} </div>
													)}
												</td>
											</tr>
											<tr className="form-group">
												<td className="text-end">Street Address</td>
												<td>
													<input
														type="text"
														value={this.state.address}
														onChange={this.handleAddressInput}
														className="form-control"
													/>
												</td>
												<td className="errorText">
													{showAddressError && (
														<div className="error"> {AddressError} </div>
													)}
												</td>
											</tr>
											<tr className="form-group">
												<td className="text-end">Postal Code</td>
												<td>
													<input
														type="text"
														value={this.state.postalCode}
														onChange={this.handlePostalCodeInput}
														className="form-control"
													/>
												</td>
												<td className="errorText">
													{showCityError && (
														<div className="error"> {CityError} </div>
													)}
												</td>
											</tr>
											<tr className="form-group">
												<td className="text-end">City</td>
												<td>
													<input
														type="text"
														value={this.state.city}
														onChange={this.handleCityInput}
														className="form-control"
													/>
												</td>
												<td className="errorText">
													{showCityError && (
														<div className="error"> {CityError} </div>
													)}
												</td>
											</tr>
											<tr className="form-group">
												<td className="text-end">Province</td>
												<td>
													<input
														type="text"
														value={this.state.province}
														onChange={this.handleProvinceInput}
														className="form-control"
													/>
												</td>
												<td className="errorText">
													{showCityError && (
														<div className="error"> {CityError} </div>
													)}
												</td>
											</tr>
											<tr className="form-group">
												<td className="text-end">Country</td>
												<td>
													<input
														type="text"
														value={this.state.country}
														onChange={this.handleCountryInput}
														className="form-control"
													/>
												</td>
												<td className="errorText"></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div className="col-md-6">
								<div className="table-responsive">
									<table class="table borderless newEmpTable">
										<tbody>
											<tr className="form-group">
												<td className="text-end">Employee Role</td>
												<td>
													<select
														value={this.state.roleText}
														onChange={this.handleRoleInput}
														className="form-select"
													>
														<option value="Select">Select</option>
														<option value="Admin">Admin</option>
														<option value="Bookkeeper">Bookkeeper</option>
														<option value="HR">HR</option>
														<option value="Employee">Employee</option>
													</select>
												</td>
												<td className="errorText">
													{showRoleError && (
														<div className="error"> {RoleError} </div>
													)}
												</td>
											</tr>
											<tr className="form-group">
												<td className="text-end">Employee Type</td>
												<td>
													<select
														value={this.state.employeeType}
														onChange={this.handleEmployeeType}
														className="form-select"
													>
														<option value="1">Hourly</option>
														<option value="2">Salary</option>
														<option value="3">Italian</option>
													</select>
												</td>
												<td className="errorText"></td>
											</tr>
											<tr className="form-group">
												<td className="text-end">Email</td>
												<td>
													<input
														type="text"
														value={this.state.email}
														onChange={this.handleEmailInput}
														className="form-control"
													/>
												</td>
												<td className="errorText">
													{showEmailError && (
														<div className="error"> {EmailError} </div>
													)}
												</td>
											</tr>
											<tr className="form-group">
												<td className="text-end">Phone Number</td>
												<td>
													<input
														type="text"
														value={this.state.phoneNumber}
														onChange={this.handlePhoneNumberInput}
														className="form-control"
													/>
												</td>
												<td className="errorText">
													{showEmailError && (
														<div className="error"> {EmailError} </div>
													)}
												</td>
											</tr>
											<tr className="form-group">
												<td className="text-end">Start Date</td>
												<td>
													<input
														type="date"
														value={this.state.startdate}
														onChange={this.handleStartdateInput}
														className="form-control"
													/>
												</td>
												<td className="errorText">
													{showStartDateError && (
														<div className="error"> {StartDateError} </div>
													)}
												</td>
											</tr>
											<tr className="form-group">
												<td className="text-end">End Date</td>
												<td>
													<input
														type="date"
														value={this.state.enddate}
														onChange={this.handleEnddateInput}
														className="form-control"
													/>
												</td>
												<td className="errorText"></td>
											</tr>
											<tr className="form-group">
												<td className="text-end">Hourly Wage</td>
												<td>
													<input
														type="text"
														value={this.state.hourlywage}
														onChange={this.handleHourlywageInput}
														className="form-control"
													/>
												</td>
												<td className="errorText"></td>
											</tr>
											<tr className="form-group">
												<td className="text-end">Monthly Salary</td>
												<td>
													<input
														type="text"
														value={this.state.monthlysalary}
														onChange={this.handleMonthlySalaryInput}
														className="form-control"
													/>
												</td>
												<td className="errorText"></td>
											</tr>
											<tr className="form-group">
												<td className="text-end">Bank Institution ID</td>
												<td>
													<input
														type="number"
														value={this.state.institutionid}
														onChange={this.handleInstitutionIdInput}
														className="form-control"
													/>
												</td>
												<td className="errorText">
													{showInstituiteIDError && (
														<div className="error"> {InstituiteIDError} </div>
													)}
												</td>
											</tr>
											<tr className="form-group">
												<td className="text-end">Bank Account Number</td>
												<td>
													<input
														type="text"
														value={this.state.bankaccountnum}
														onChange={this.handleBankAccountNumInput}
														className="form-control"
													/>
												</td>
												<td className="errorText">
													{showBANError && (
														<div className="error"> {BANError} </div>
													)}
												</td>
											</tr>
											<tr className="form-group">
												<td className="text-end">Bank Transit Number</td>
												<td>
													<input
														type="text"
														value={this.state.transitid}
														onChange={this.handleTransitIdInput}
														className="form-control"
													/>
												</td>
												<td className="errorText">
													{showTransIDError && (
														<div className="error"> {TransIDError} </div>
													)}
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						{error && (
							<div className="row">
								<div className="col-2"></div>

								<div
									class=" col-8  alert alert-danger d-flex align-items-center"
									role="alert"
								>
									<div>{errorMessage}</div>
								</div>
								<div className="col-2"></div>
							</div>
						)}
						<div className="row my-5">
							<div className="col d-flex justify-content-around newEmployeeRow">
								<Link to="/adminEmployees">
									<button
										type="button"
										className="btn btn-lrg SecondaryButton "
									>
										Go Back
									</button>
								</Link>

								<button
									type="button"
									className="btn btn-lrg PrimaryButton "
									onClick={this.handleNewEmployee}
								>
									Submit New Employee
								</button>
							</div>
						</div>
					</div>
					<div className="col-2"></div>
				</div>
			</div>
		);
	}
}

export default NewEmployee;
