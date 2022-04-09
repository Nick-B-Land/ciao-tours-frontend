import React, { Component } from "react";
import "../style/stylesheet.css";
import TopNav from "../components/navs/topNav";
import BottomAdminNav from "../components/navs/bottomAdminNav";
import employeeController from "../controllers/employeeController";
import { Link } from "react-router-dom";
import userAccountController from "../controllers/userAccountController";

class NewEmployee extends Component {
	constructor(props) {
		super(props);
		this.hiddenFileBtn = React.createRef();
		this.state = {
			firstname: "",
			lastname: "",
			address: "",
			city: "",
			email: "",
			startdate: "",
			enddate: "",
			hourlywage: "",
			monthlysalary: "",
			file: null,
			isadmin: false,
			isbookkeeper: false,
			institutionid: "",
			bankaccountnum: "",
			transitid: "",
			username: "",
			password: "",
			roleText: "",
			employeeType: "",
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

	uploadFile = () => {
		this.hiddenFileBtn.current.click();
	};
	saveFile = async (event) => {
		this.state({ file: event.target.files[0] });
		this.state({ fileSelected: true });
	};

	handleNewEmployee = async () => {
		// need to add in proper handling of is admin/bookkeeper - can't be a bool
		//but I don't think we even need those fields tbh
		//should add own handler for this, but roles need more front end work in general
		//should select and add roles from predefined list, this is hacky way for now
		//can only add one role via this method
		// this.setState({ roles: [...this.state.roles, this.state.roleText] });
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
				firstName: this.state.firstname,
				jobTitle: "",
				lastName: this.state.lastname,
				address: this.state.address,
				bankAccountNumber: this.state.bankaccountnum,
				city: this.state.city,
				emailAddress: this.state.email,
				employeeEndDate: this.state.enddate,
				employeeStartDate: this.state.startdate,
				hourlyWage: this.state.hourlywage,
				institutionId: this.state.institutionid,
				monthlySalary: this.state.monthlysalary,
				transitId: this.state.transitid,
				employeeType: { employeeTypeId: this.state.employeeType },
			};
			//let test = JSON.stringify(employeeObj);
			//console.log(test);

			// let employeeResponse = await employeeController.createEmployee(
			// 	employeeObj
			// );

			//console.log(employeeResponse);

			let userObj = {
				username: this.state.username,
				employee: employeeObj,
				password: this.state.password,
				roles: this.state.roles,
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
			file,
			fileSelected,
		} = this.state;

		return (
			<div className="container-fluid p-0 adminEmployeesPage">
				<div className="row d-flex">
					<TopNav />
					<BottomAdminNav />
				</div>
				{/* {showUsernameError && <div class="alert alert-danger d-flex  myalert"  role="alert"> <div> An example danger alert with an icon </div>

				</div>}  */}

				<div className="row">
					<div className="col-2"></div>
					<div className="col-8 min-vh-100 innerAdmin">
						<div className="row" style={{ textAlign: "center" }}>
							<h1>Create New Employee</h1>
						</div>
						<div className="row">
							<div className="col-5 d-flex flex-row-reverse newEmployeeRow">
								Username:
							</div>
							<div className="col newEmployeeRow">
								<input
									type="text"
									value={this.state.username}
									onChange={this.handleUsernameInput}
								/>
								<div className="row errorText">
									{showUsernameError && (
										<div className="error "> {UsernameError} </div>
									)}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-5 d-flex flex-row-reverse newEmployeeRow">
								Password:
							</div>
							<div className="col newEmployeeRow">
								<input
									type="text"
									value={this.state.password}
									onChange={this.handlePasswordInput}
								/>
								<div className="row errorText">
									{showPasswordError && (
										<div className="error"> {PasswordError} </div>
									)}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-5 d-flex flex-row-reverse newEmployeeRow">
								Type:
							</div>
							<div className="col dropdown newEmployeeRow">
								<select
									value={this.state.employeeType}
									onChange={this.handleEmployeeType}
								>
									<option value="1">Hourly</option>
									<option value="2">Salary</option>
									<option value="3">Italian</option>
								</select>
							</div>
						</div>
						<div className="row">
							<div className="col-5 d-flex flex-row-reverse newEmployeeRow">
								Roles:
							</div>
							<div className="col dropdown newEmployeeRow">
								<select
									value={this.state.roleText}
									onChange={this.handleRoleInput}
								>
									<option value="Select">Select</option>
									<option value="Admin">Admin</option>
									<option value="Bookkeeper">Bookkeeper</option>
									<option value="HR">HP</option>
									<option value="Employee">Employee</option>
								</select>
								<div className="row errorText">
									{showRoleError && <div className="error"> {RoleError} </div>}
								</div>
							</div>
						</div>
						<div className="row">
							<div
								className="col-5 d-flex flex-row-revers newEmployeeRow"
								style={{ textAlign: "right" }}
							>
								First Name:
							</div>
							<div className="col newEmployeeRow">
								<input
									type="text"
									value={this.state.firstname}
									onChange={this.handleFirstnameInput}
								/>
								<div className="row errorText">
									{showFirstnameError && (
										<div className="error"> {FirstnameError} </div>
									)}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-5 d-flex flex-row-reverse newEmployeeRow">
								Last Name:
							</div>
							<div className="col newEmployeeRow">
								<input
									type="text"
									value={this.state.lastname}
									onChange={this.handleLastnameInput}
								/>
								<div className="row errorText">
									{showLastnameError && (
										<div className="error"> {LastnameError} </div>
									)}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-5 d-flex flex-row-reverse newEmployeeRow">
								Address:
							</div>
							<div className="col newEmployeeRow">
								<input
									type="text"
									value={this.state.address}
									onChange={this.handleAddressInput}
								/>
								<div className="row errorText">
									{showAddressError && (
										<div className="error"> {AddressError} </div>
									)}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-5 d-flex flex-row-reverse newEmployeeRow">
								City:
							</div>
							<div className="col newEmployeeRow">
								<input
									type="text"
									value={this.state.city}
									onChange={this.handleCityInput}
								/>
								<div className="row errorText">
									{showCityError && <div className="error"> {CityError} </div>}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-5 d-flex flex-row-reverse newEmployeeRow">
								Email:
							</div>
							<div className="col newEmployeeRow">
								<input
									type="text"
									value={this.state.email}
									onChange={this.handleEmailInput}
								/>
								<div className="row errorText">
									{showEmailError && (
										<div className="error"> {EmailError} </div>
									)}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-5 d-flex flex-row-reverse newEmployeeRow">
								Start Date:
							</div>
							<div className="col newEmployeeRow">
								<input
									type="date"
									value={this.state.startdate}
									onChange={this.handleStartdateInput}
								/>
								<div className="row errorText">
									{showStartDateError && (
										<div className="error"> {StartDateError} </div>
									)}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-5 d-flex flex-row-reverse newEmployeeRow">
								End Date (if applicable):
							</div>
							<div className="col newEmployeeRow">
								<input
									type="date"
									value={this.state.enddate}
									onChange={this.handleEnddateInput}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-5 d-flex flex-row-reverse newEmployeeRow">
								Hourly Wage (if applicable):
							</div>
							<div className="col newEmployeeRow">
								<input
									type="text"
									value={this.state.hourlywage}
									onChange={this.handleHourlywageInput}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-5 d-flex flex-row-reverse newEmployeeRow">
								Monthly Salary (if applicable):
							</div>
							<div className="col newEmployeeRow">
								<input
									type="text"
									value={this.state.monthlysalary}
									onChange={this.handleMonthlySalaryInput}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-5 d-flex flex-row-reverse newEmployeeRow">
								Institution ID (for direct deposit):
							</div>
							<div className="col newEmployeeRow">
								<input
									type="number"
									value={this.state.institutionid}
									onChange={this.handleInstitutionIdInput}
								/>
								<div className="row errorText">
									{showInstituiteIDError && (
										<div className="error"> {InstituiteIDError} </div>
									)}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-5 d-flex flex-row-reverse newEmployeeRow">
								Bank Account Number (for direct deposit):
							</div>
							<div className="col newEmployeeRow">
								<input
									type="text"
									value={this.state.bankaccountnum}
									onChange={this.handleBankAccountNumInput}
								/>
								<div className="row errorText">
									{showBANError && <div className="error"> {BANError} </div>}
								</div>
							</div>
						</div>
						<div className="row ">
							<div className="col-5 d-flex flex-row-reverse newEmployeeRow">
								Transit ID (for direct deposit):
							</div>
							<div className="col newEmployeeRow">
								<input
									type="text"
									value={this.state.transitid}
									onChange={this.handleTransitIdInput}
								/>
								<div className="row errorText">
									{showTransIDError && (
										<div className="error"> {TransIDError} </div>
									)}
								</div>
							</div>
						</div>
						<div className="row ">
							<div className="col-5 d-flex flex-row-reverse newEmployeeRow">
								Upload a File:
							</div>
							<div className="col newEmployeeRow">
								<div style={{ width: "60%" }}>
									<button
										type="button"
										className="btn btn-warning m-2"
										onClick={this.uploadFile}
										style={{ width: "40%" }}
										id="employeeCardUploadButton"
									>
										<input
											type="file"
											ref={this.hiddenFileBtn}
											name="Upload File"
											onChange={this.saveFile}
											style={{ display: "none" }}
										/>{" "}
										Upload File
									</button>
									{fileSelected ? <div> {this.file.name}</div> : ""}
								</div>
							</div>
						</div>
						<br />
						<br />
						<br />
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
						<div className="row">
							<div className="col d-flex justify-content-between newEmployeeRow">
								<Link to="/adminEmployees">
									<button
										type="button"
										className="btn btn-small SecondaryButton "
									>
										Go Back
									</button>
								</Link>

								<button
									type="button"
									className="btn btn-small PrimaryButton "
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
