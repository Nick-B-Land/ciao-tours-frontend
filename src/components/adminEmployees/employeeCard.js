import React, { useState } from "react";
import employeeController from "../../controllers/employeeController";
import "../../style/stylesheet.css";

const EmployeeCard = ({
	empId,
	fName,
	lName,
	email,
	city,
	address,
	startDate,
	endDate,
	hourlyRate,
	monthlySal,
	bankAccount,
	institutionId,
	transitId,
	file
}) => {
	const [isActive, setIsActive] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [stateEmpId, setStateEmpId] = useState(empId);
	const [statefName, setStatefName] = useState(fName);
	const [statelName, setStatelName] = useState(lName);
	const [stateEmail, setStateEmail] = useState(email);
	const [stateCity, setStateCity] = useState(city);
	const [stateAddress, setStateAddress] = useState(address);
	const [stateStartDate, setStateStartDate] = useState(startDate);
	const [stateEndDate, setStateEndDate] = useState(endDate);
	const [stateHourlyRate, setStateHourlyRate] = useState(hourlyRate);
	const [stateMonthlySal, setStateMonthlySal] = useState(monthlySal);
	const [stateBankAccount, setStateBankAccount] = useState(bankAccount);
	const [stateInstitutionId, setStateInstitutionId] = useState(institutionId);
	const [stateTransitId, setStateTransitId] = useState(transitId);
	const [selectedFile, setSelectedFile] = useState(file);
	const [isFilePicked, setIsFilePicked] = useState(false);
	const hiddenFileBtn = React.useRef(null);
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
			file: selectedFile
		};

		return employeeObj;
	};

	const deleteMode = async () => {
		setIsEdit(false);
	};

	const uploadFile = (event) => {
		hiddenFileBtn.current.click();

	};
	const saveFile = async (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	
	};

	const editMode = async () => {
		setIsEdit(true);
	};

	const handleEdit = async () => {
		console.log(buildEmployeeObj());
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
				empId
			);
			console.log(response);
		}
	};

	const handleDelete = async () => {
		let response = await employeeController.deleteEmployee(empId);

		document.location.reload();
		console.log(response);
	};

	if (isEdit) {
		return (
			<li className="accordion-item">
				<div
					className="accordion-toggle"
					onClick={() => setIsActive(!isActive)}
				>
					<h3>{fName + " " + lName}</h3>
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

						<div className="row">
							<div className="col-5 d-flex flex-row-reverse">
								<div style={{width:"100%"}}>
								<button
									type="button"
									className="btn btn-warning m-2"
									onClick={uploadFile}
									style={{width: "40%"}}
									id="employeeCardUploadButton">
										<input type="file" ref={hiddenFileBtn} name="Upload File" onChange={saveFile} style={{display:"none"}}/> Upload File
									</button>
									{isFilePicked?(<div> {selectedFile.name}</div>):""}
								</div>
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
									go Back
								</button>
							</div>
							<div className="col-5 d-flex flex-row-reverse">
								<button
									type="button"
									className="btn btn-warning m-2"
									onClick={editMode}
									style={{ display: this ? null : "none" }}
									id="employeeCardEditButton"
								>
									Edit Information
								</button>
							</div>
							
							<div className="col">
								<button
									type="button"
									className="btn btn-danger m-2"
									onClick={handleDelete}
									style={{ display: this ? null : "none" }}
									id="employeeCardRemoveButton"
								>
									Remove Employee
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
					<h3>{fName + " " + lName}</h3>
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
								Employee Email Address:
							</div>
							<div className="col">
								<p>{stateEmail}</p>
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
								Employee Address:{" "}
							</div>
							<div className="col">
								<p>{stateAddress}</p>
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

								<button
									type="button"
									className="btn btn-danger m-2"
									onClick={handleDelete}
									id="employeeCardRemoveButton"
								>
									Remove Employee
								</button>
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
									dont edit
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
