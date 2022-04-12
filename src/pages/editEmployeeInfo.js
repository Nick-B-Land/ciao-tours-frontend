import React, { Component } from "react";
import "../style/stylesheet.css";
import TopNav from "../components/navs/topNav";
import BottomAdminNav from "../components/navs/bottomAdminNav";
import employeeController from "../controllers/employeeController";
import { Link } from "react-router-dom";

class editEmployeeInfo extends Component {

	constructor(props) {
		super(props);
		this.state = {
			newFirstName : null,
			newLastname : null,
			newCity : null,
			newAddress : null,
			newInstitutionid : null,
			newBAN :null,
			newtransitId:null,
			newEmail :null,
			employeeList:[],

			loaded:false,
			showFirstnameError: true,
			showLastnameError: true,
			showAddressError: true,
			showCityError: true,
			showEmailError: true,
			showStartDateError: true,
			showInstituiteIDError: true,
			showBANError: true,
			showTransIDError: true,
			
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
			errorMessage: ""
		
		};
		console.log("naviaget" +this.props);
		console.log("naviaget"+this.props.navigate);
		this.handleDataLoading();

	}
	handleDataLoading = async () => {
		employeeController.getEmployeeByID(3).then((employees) => {
			this.setState({ employeeList: employees.data,loaded:true });
		});
		
	}
	updateInfo = async () => {
		if (this.state.showFirstnameError === false ||
			this.state.showLastnameError === false ||
			this.state.showAddressError === false ||
			this.state.showEmailError === false ||
			this.state.showCityError === false ||
			this.state.showInstituiteIDError === false ||
			this.state.showBANError === false ||
			this.state.showTransIDError === false
		) {
			this.setState({ error: true, errorMessage: "Please Complete the form." });
			setInterval(() => this.setState({ error: false, errorMessage: "" }), 4000);
		} else {
			
			let employeeObj = {
				employeeId:  this.state.employeeList[0].employeeId ,
				firstName: (this.state.newFirstName!=null ? this.state.newFirstName : this.state.employeeList[0].firstName),
				jobTitle: "",
				lastName:  this.state.newLastname!=null ? this.state.newLastname : this.state.employeeList[0].lastName,
				address:  this.state.newAddress!=null ? this.state.newAddress : this.state.employeeList[0].address,
				bankAccountNumber:  this.state.newBAN!=null ? this.state.newBAN : this.state.employeeList[0].bankAccountNumber,
				city:  this.state.newCity!=null ? this.state.newCity : this.state.employeeList[0].city,
				emailAddress:  this.state.newEmail!=null ? this.state.newEmail : this.state.employeeList[0].emailAddress,
				employeeEndDate: this.state.employeeList[0].employeeEndDate,
				employeeStartDate: this.state.employeeList[0].employeeStartDate,
				hourlyWage: this.state.employeeList[0].hourlyWage,
				institutionId:  this.state.newInstitutionid!=null ? this.state.newInstitutionid : this.state.employeeList[0].institutionId,
				monthlySalary: this.state.employeeList[0].monthlysalary,
				transitId:  this.state.newtransitId!=null ? this.state.newtransitId : this.state.employeeList[0].transitId,
			};
			//let test = JSON.stringify(employeeObj);
			//console.log(test);
			// console.log("asd"+employeeObj.firstName);
			let employeeResponse = await employeeController.updateEmployee(employeeObj,3);
			if(employeeResponse.status===200){
				this.props.navigation.navigate("/myinfo");
			}else{
				this.setState({ error: true, errorMessage: "Something went worng." });
				setInterval(() => this.setState({ error: false, errorMessage: "" }), 4000);
			}

		}
	}
	handleFirstnameInput = (e) => {
		if (e.target.value === "") {
			this.setState({ showFirstnameError: false, FirstnameError: "First Name can't be empty." })

		} else {
			this.setState({ showFirstnameError: true, FirstnameError: "" })
		}
		this.setState({ newFirstName: e.target.value });

	};
	handleLastnameInput = (e) => {
		if (e.target.value === "") {
			this.setState({ showLastnameError: false, LastnameError: "Last Name can't be empty." })
		} else {
			this.setState({ showLastnameError: true, LastnameError: "" })
		}
		this.setState({ newLastname: e.target.value });

	};

	handleAddressInput = (e) => {

		if (e.target.value === "") {
			this.setState({ showAddressError: false, AddressError: "Address can't be empty." })
		} else {
			this.setState({ showAddressError: true, AddressError: "" })
		}
		this.setState({ newAddress: e.target.value });
	};

	handleCityInput = (e) => {
		if (e.target.value === "") {
			this.setState({ showCityError: false, CityError: "City can't be empty." })
		} else {
			this.setState({ showCityError: true, CityError: "" })
		}
		this.setState({ newCity: e.target.value });
	};

	handleEmailInput = (e) => {
		if (e.target.value === "") {
			this.setState({ showEmailError: false, EmailError: "Email can't be empty." })
		} else {
			this.setState({ showEmailError: true, EmailError: "" })
		}
		this.setState({ newEmail: e.target.value });
	};

	handleStartdateInput = (e) => {
		console.log(e.target.value)
		if (e.target.value === "") {
			this.setState({ showStartDateError: false, StartDateError: "Start Date Invalid" })
		} else {
			this.setState({ showStartDateError: true, StartDateError: "" })
		}
		this.setState({ startdate: e.target.value });
	};

	handleInstitutionIdInput = (e) => {
		if (e.target.value === "") {
			this.setState({ showInstituiteIDError: false, InstituiteIDError: "Institution ID can't be empty." })
		} else if (e.target.value.length > 3) {
			this.setState({ showInstituiteIDError: false, InstituiteIDError: "Institution ID can't be more than 3 characters." })
		} else {
			this.setState({ showInstituiteIDError: true, InstituiteIDError: "" })
		}

		this.setState({ newInstitutionid: e.target.value });
	};

	handleBankAccountNumInput = (e) => {

		if (e.target.value === "") {
			this.setState({ showBANError: false, BANError: "Account Number can't be empty." })
		} else {
			this.setState({ showBANError: true, BANError: "" })
		}
		this.setState({ newBAN: e.target.value });
	};

	handleTransitIdInput = (e) => {
		if (e.target.value === "") {
			this.setState({ showTransIDError: false, TransIDError: "Transit ID can't be empty." })
		} else {
			this.setState({ showTransIDError: true, TransIDError: "" })
		}

		this.setState({ newtransitId: e.target.value });
	};

	render() {
		const {showFirstnameError, showLastnameError, showAddressError, showCityError, showEmailError, showInstituiteIDError,
			 showBANError, showTransIDError, FirstnameError, LastnameError, AddressError, CityError, EmailError, InstituiteIDError, BANError, TransIDError, error, errorMessage } = this.state;

		return (
			<form>
				{this.state.loaded
				?
				<div className="container-fluid p-0 myInfoPage">
					<div className="row d-flex">
						<TopNav currentUser={this.props.currentUser} />
						<BottomAdminNav />
					</div>
					<div className="row  d-flex">
						<div className="col-2"></div>
						<div className="col-7 min-vh-100 innerAdmin ">
							<div className="row">
								<div className="employeeHeader p-4 pt-2 pb-2 text-center">
									<h1>My Information</h1>
								</div>
							</div>
							<div className="row">
								<hr className="bar"></hr>
							</div>
							<div className="row newEmployeeRow">
								<div className="col-3 text-start"> First Name:</div>
								<div className="col-4">
									<input disabled={false} onChange={this.handleFirstnameInput} value={this.state.employeeList[0].firstName}></input>
									<div className="row errorText">
									{ showFirstnameError && <div className="error"> {FirstnameError} </div>}
								</div>
								</div>
							</div>
							<div className="row newEmployeeRow">
								<div className="col-3 text-start"> Last Name:</div>
								<div className="col-4">
									<input disabled={false} onChange={this.handleLastnameInput} value={ this.state.employeeList[0].lastName}></input>
									{ showLastnameError && <div className="error"> {LastnameError} </div>}
								</div>
							</div>
							<div className="row newEmployeeRow">
								<div className="col-3  text-start">Address:</div>
								<div className="col-4">
									<input disabled={false} onChange={this.handleAddressInput} value={this.state.employeeList[0].address}></input>
									{ showAddressError && <div className="error"> { AddressError} </div>}
								</div>
							</div>
							<div className="row newEmployeeRow">
								<div className="col-3  text-start">City:</div>
								<div className="col-4">
									<input disabled={false} onChange={this.handleCityInput} value={this.state.employeeList[0].city}></input>
									{ showCityError && <div className="error"> { CityError} </div>}
								</div>
							</div>
							<div className="row newEmployeeRow">
								<div className="col-3  text-start">Email:</div>
								<div className="col-4">
									<input disabled={false} onChange={this.handleEmailInput} value={this.state.employeeList[0].emailAddress}></input>
									{ showEmailError && <div className="error"> { EmailError} </div>}
								</div>
							</div>
							<div className="row newEmployeeRow">
								<div className="col-3  text-start">Start Date:</div>
								<div className="col-4">
									<input disabled={true} onChange={this.handleStartdateInput} value={this.state.employeeList[0].employeeStartDate}></input>
									{/* { showStartDateError && <div className="error"> {StartDateError} </div>} */}
								</div>
							</div>
							<div className="row newEmployeeRow">
								<div className="col-3  text-start">Hourly Rate:</div>
								<div className="col-4">
									<input disabled={true}  value={this.state.employeeList[0].hourlyWage}></input>
								</div>
							</div>
							<div className="row newEmployeeRow">
								<div className="col-3  text-start">Monthly Salary:</div>
								<div className="col-4">
									<input disabled={true} value={this.state.employeeList[0].monthlySalary}></input>
								</div>
							</div>
							<div className="row newEmployeeRow">
								<div className="col-3  text-start">Institution ID:</div>
								<div className="col-4">
									<input disabled={false} onChange={this.handleInstitutionIdInput} value={this.state.employeeList[0].institutionId}></input>
									{showInstituiteIDError && <div className="error"> {InstituiteIDError} </div>}
								</div>
							</div>
							<div className="row newEmployeeRow">
								<div className="col-3  text-start">Bank Account:</div>
								<div className="col-4">
									<input disabled={false} onChange={this.handleBankAccountNumInput} value={this.state.employeeList[0].bankAccountNumber}></input>
									{ showBANError && <div className="error"> {BANError} </div>}
								</div>
							</div>
							<div className="row newEmployeeRow">
								<div className="col-3  text-start">Transit ID</div>
								<div className="col-4">
									<input disabled={false} onChange={this.handleTransitIdInput} value={this.state.employeeList[0].transitId}></input>
									{ showTransIDError && <div className="error"> {TransIDError} </div>}
								</div>
							</div>
							<div className="row justify-content-center text-center">
								<div className="col-12">
									Standard form with all the information.
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
							<div className="row newEmployeeRow ">
								<div className="col-11" style={{textAlign:"right"}}>
									<button
										type="button"
										onClick={this.updateInfo}
										className="employeeButton btn btn-warning m-2"
									>
										Save Information
									</button>
								</div>
							</div>
						</div>
						<div className="col-2"></div>
					</div>
				</div> :"Loading Data..."}
			</form>
		);
	}
}

export default editEmployeeInfo;
