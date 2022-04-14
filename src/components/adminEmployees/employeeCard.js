import React, { useState } from "react";
import employeeController from "../../controllers/employeeController";
import "../../style/stylesheet.css";

/**
 * EmployeeCard returns a list item which holds an accordian style piece that holds the employees personal information for admin/own employee
 * @returns accordian style list item
 *
 * Locally-defined Functions and Variables
 * Variables
 * 	variables for each field of an employee
 *
 * Functions
 * 	deleteMode - resets the edit mode to false
 * 	editMode - sets edit mode to true
 * 	handleEdit - controls the edit fields validation
 */
const EmployeeCard = ({
	isEmployee,
	employeeId,
	firstName,
	lastName,
	emailAddress,
	city,
	address,
	employeeStartDate,
	employeeEndDate,
	hourlyWage,
	monthlySalary,
	bankAccountNumber,
	institutionId,
	transitId,
	jobTitle,
	dateOfBirth,
	postalCode,
	country,
	province,
	phoneNumber,
}) => {
	const [isActive, setIsActive] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [stateEmpId, setStateEmpId] = useState(employeeId);
	const [statefName, setStatefName] = useState(firstName);
	const [statelName, setStatelName] = useState(lastName);
	const [stateEmail, setStateEmail] = useState(emailAddress);
	const [stateCity, setStateCity] = useState(city);
	const [stateAddress, setStateAddress] = useState(address);
	const [stateStartDate, setStateStartDate] = useState(employeeStartDate);
	const [stateEndDate, setStateEndDate] = useState(employeeEndDate);
	const [stateHourlyRate, setStateHourlyRate] = useState(hourlyWage);
	const [stateMonthlySal, setStateMonthlySal] = useState(monthlySalary);
	const [stateBankAccount, setStateBankAccount] = useState(bankAccountNumber);
	const [stateInstitutionId, setStateInstitutionId] = useState(institutionId);
	const [stateTransitId, setStateTransitId] = useState(transitId);
	const [stateJobTitle, setStateJobTitle] = useState(jobTitle);
	const [stateBirthday, setStateBirthday] = useState(dateOfBirth);
	const [statePostal, setStatePostal] = useState(postalCode);
	const [stateCountry, setStateCountry] = useState(country);
	const [stateProvince, setStateProvince] = useState(province);
	const [statePhone, setStatePhone] = useState(phoneNumber);
	const buildEmployeeObj = () => {
		let employeeObj = {
			employeeId: stateEmpId,
			firstName: statefName,
			jobTitle: "",
			lastName: statelName,
			address: stateAddress,
			bankAccountNumber: stateBankAccount,
			city: stateCity,
			emailAddress: stateEmail,
			employeeEndDate: stateEndDate,
			employeeStartDate: stateStartDate,
			hourlyWage: stateHourlyRate,
			insitutionId: stateInstitutionId,
			isAdmin: 0,
			isBookkeeper: 0,
			monthlySalary: stateMonthlySal,
			transitId: stateTransitId,
		};

		return employeeObj;
	};

	/**
	 * resets the edit mode to false (just view mode)
	 */
	const deleteMode = async () => {
		setIsEdit(false);
	};

	/**
	 * sets edit mode to true
	 */
	const editMode = async () => {
		setIsEdit(true);
	};

	/**
	 * controls the edit side of the card
	 */
	const handleEdit = async () => {
		let dateFrom = new Date("02/05/2001");
		let onlyAlph = /^[A-Za-z]+$/;
		if (
			!statefName.match(onlyAlph) ||
			!statelName.match(onlyAlph) ||
			!stateCity.match(onlyAlph)
		) {
			alert(
				"Error: either firstname,lastname or city has non alphabetic characters."
			);
		} else if (
			stateHourlyRate < 0 ||
			stateMonthlySal < 0 ||
			stateBankAccount < 0 ||
			stateInstitutionId < 0 ||
			stateTransitId < 0
		) {
			alert(
				"Error: either hourly rate,monthlysal,bankAccount,institution id or transit id is negative."
			);
		} else if (
			dateFrom > new Date(stateStartDate) ||
			stateStartDate > stateEndDate
		) {
			alert(
				"Error: either end date is before start date or start date is before 02/05/2001"
			);
		} else {
			let response = await employeeController.updateEmployee(
				buildEmployeeObj(),
				stateEmpId
			);
		}
	};

	/**
	 * deletes the employee from the database
	 */
	const handleDelete = async () => {
		let response = await employeeController.deleteEmployee(stateEmpId);
		document.location.reload();
	};

	if (isEdit) {
		return (
			<li className="accordion-item">
				<div
					className="accordion-toggle"
					onClick={() => setIsActive(!isActive)}
				>
					<h3>{statefName + " " + statelName}</h3>
					<span>{isActive ? "-" : "+"}</span>
				</div>
				{isActive && (
					<div className="accordion-content employee_card_list_tweaks">
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">Employee ID: </div>
							<div className="col">
								<input type="text" defaultValue={stateEmpId} disabled />
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee First Name:
							</div>
							<div className="col">
								<input
									type="text"
									id="employeeCardLName"
									defaultValue={statefName}
									onChange={(e) => setStatefName(e.target.value)}
								/>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Last Name:
							</div>
							<div className="col">
								<input
									type="text"
									id="employeeCardLName"
									defaultValue={statelName}
									onChange={(e) => setStatelName(e.target.value)}
								/>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Job Title:
							</div>
							<div className="col">
								<input
									type="text"
									id="employeeCardEmail"
									defaultValue={stateJobTitle}
									onChange={(e) => setStateJobTitle(e.target.value)}
								/>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Email Address:
							</div>
							<div className="col">
								<input
									type="text"
									id="employeeCardEmail"
									defaultValue={stateEmail}
									onChange={(e) => setStateEmail(e.target.value)}
								/>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Phone Number:
							</div>
							<div className="col">
								<input
									type="text"
									id="employeeCardPhone"
									defaultValue={statePhone}
									onChange={(e) => setStatePhone(e.target.value)}
								/>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Date Of Birth:
							</div>
							<div className="col">
								<input
									type="text"
									id="employeeCardBday"
									defaultValue={stateBirthday}
									onChange={(e) => setStateBirthday(e.target.value)}
								/>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Address:{" "}
							</div>
							<div className="col">
								<input
									type="text"
									defaultValue={stateAddress}
									onChange={(e) => setStateAddress(e.target.value)}
									id="employeeCardAddress"
								/>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee City:
							</div>
							<div className="col">
								<input
									type="text"
									id="employeeCardCity"
									defaultValue={stateCity}
									onChange={(e) => setStateCity(e.target.value)}
								/>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Province:
							</div>
							<div className="col">
								<input
									type="text"
									defaultValue={stateProvince}
									onChange={(e) => setStateProvince(e.target.value)}
									id="employeeCardProv"
								/>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Country:
							</div>
							<div className="col">
								<input
									type="text"
									defaultValue={stateCountry}
									onChange={(e) => setStateCountry(e.target.value)}
									id="employeeCardCountry"
								/>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Postal Code:{" "}
							</div>
							<div className="col">
								<input
									type="text"
									defaultValue={statePostal}
									onChange={(e) => setStatePostal(e.target.value)}
									id="employeeCardPostal"
								/>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Start Date:
							</div>
							<div className="col">
								<input
									type="date"
									defaultValue={
										stateStartDate ? stateStartDate.substring(0, 10) : ""
									}
									onChange={(e) => setStateStartDate(e.target.value)}
									id="employeeCardStartDate"
								/>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee End Date:
							</div>
							<div className="col">
								<input
									defaultValue={
										stateEndDate ? stateEndDate.substring(0, 10) : ""
									}
									onChange={(e) => setStateEndDate(e.target.value)}
									type="date"
									id="employeeCardEndDate"
								/>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Hourly Rate:
							</div>
							<div className="col">
								<input
									defaultValue={stateHourlyRate}
									onChange={(e) => setStateHourlyRate(e.target.value)}
									id="employeeCardHourlyRate"
								/>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Monthly Salary:
							</div>
							<div className="col">
								<input
									defaultValue={stateMonthlySal}
									onChange={(e) => setStateMonthlySal(e.target.value)}
									id="employeeCardMonthlySal"
								/>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Bank Account Number:
							</div>
							<div className="col">
								<input
									defaultValue={stateBankAccount}
									onChange={(e) => setStateBankAccount(e.target.value)}
									id="employeeCardBankAccount"
								/>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Bank Institution ID:
							</div>
							<div className="col">
								<input
									defaultValue={stateInstitutionId}
									onChange={(e) => setStateInstitutionId(e.target.value)}
									id="employeeCardInstitutionId"
								/>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Bank Transit ID:
							</div>
							<div className="col">
								<input
									defaultValue={stateTransitId}
									onChange={(e) => setStateTransitId(e.target.value)}
									id="employeeCardTransitId"
								/>
							</div>
						</div>

						<div className="row justify-content-between">
							<div className="col-5 d-flex flex-row-reverse">
								<button
									type="button"
									className="btn btn-success m-2 "
									onClick={handleEdit}
									id="employeeCardSubmitButton"
								>
									Submit
								</button>

								<button
									type="button"
									className="btn btn-secondary m-2 "
									onClick={deleteMode}
									id="employeeCardallowRemoveButton"
								>
									Go Back
								</button>
							</div>
						</div>
					</div>
				)}
			</li>
		);
	} else {
		return (
			<li className="accordion-item">
				<div
					className="accordion-toggle"
					onClick={() => setIsActive(!isActive)}
				>
					<h3>{statefName + " " + statelName}</h3>
					<span>{isActive ? "-" : "+"}</span>
				</div>
				{isActive && (
					<div className="accordion-content employee_card_list_tweaks">
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">Employee ID: </div>
							<div className="col">
								<p>{stateEmpId}</p>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee First Name:
							</div>
							<div className="col">
								<p id="firstName">{statefName}</p>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Last Name:
							</div>
							<div className="col">
								<p>{statelName}</p>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Job Title:
							</div>
							<div className="col">
								<p>{stateJobTitle}</p>
							</div>
						</div>

						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Email Address:
							</div>
							<div className="col">
								<p>{stateEmail}</p>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Phone Number:
							</div>
							<div className="col">
								<p>{statePhone}</p>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Date of Birth:
							</div>
							<div className="col">
								<p>{stateBirthday}</p>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Address:{" "}
							</div>
							<div className="col">
								<p>{stateAddress}</p>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee City:
							</div>
							<div className="col">
								<p>{stateCity}</p>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Provice:
							</div>
							<div className="col">
								<p>{stateProvince}</p>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Country:
							</div>
							<div className="col">
								<p>{stateCountry}</p>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Postal Code:
							</div>
							<div className="col">
								<p>{statePostal}</p>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Start Date:
							</div>
							<div className="col">
								<p>{stateStartDate ? stateStartDate.substring(0, 10) : ""}</p>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee End Date:
							</div>
							<div className="col">
								<p>{stateEndDate ? stateEndDate.substring(0, 10) : ""}</p>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Hourly Rate:
							</div>
							<div className="col">
								<p>{stateHourlyRate}</p>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Monthly Salary:
							</div>
							<div className="col">
								<p>{stateMonthlySal}</p>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Bank Account Number:
							</div>
							<div className="col">
								<p>{stateBankAccount}</p>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Bank Institution ID:
							</div>
							<div className="col">
								<p>{stateInstitutionId}</p>
							</div>
						</div>
						<div className="row ecLi">
							<div className="col-5 d-flex flex-row-reverse">
								Employee Bank Transit ID:
							</div>
							<div className="col">
								<p>{stateTransitId}</p>
							</div>
						</div>

						<div className="row">
							<div className="col-5 d-flex flex-row-reverse">
								<button
									type="button"
									className="btn btn-warning m-2"
									onClick={editMode}
									id="employeeCardEditButton"
								>
									Edit Information
								</button>

								{isEmployee ? null : (
									<button
										type="button"
										className="btn btn-danger m-2"
										onClick={handleDelete}
										id="employeeCardRemoveButton"
									>
										Remove Employee
									</button>
								)}
							</div>
							<div className="col">
								<button
									type="button"
									className="btn btn-success m-2 btn-lg"
									style={{ display: this ? null : "none" }}
									onClick={handleEdit}
									id="employeeCardSubmitButton"
								>
									Submit
								</button>
							</div>
							<div className="col">
								<button
									type="button"
									className="btn btn-secondary m-2"
									style={{ display: this ? null : "none" }}
									onClick={deleteMode}
									id="employeeCardallowRemoveButton"
								>
									Dont edit
								</button>
							</div>
						</div>
					</div>
				)}
			</li>
		);
	}
};

export default EmployeeCard;
