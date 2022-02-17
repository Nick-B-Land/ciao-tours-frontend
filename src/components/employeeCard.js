import React, { useState } from "react";
import employeeController from "../controllers/employeeController";
import "../style/stylesheet.css";

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
}) => {
	const [isActive, setIsActive] = useState(false);
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

	// const handleID = (e) => {
	// 	setStateEmpId(e.target.value);
	// 	console.log(stateEmpId);
	// };

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

	const handleEdit = async () => {
		console.log(buildEmployeeObj());
		let response = await employeeController.updateEmployee(
			buildEmployeeObj(),
			empId
		);

		document.location.reload();
		console.log(response);
	};

	const handleDelete = async () => {
		let response = await employeeController.deleteEmployee(empId);

		document.location.reload();
		console.log(response);
	};

	return (
		<li className="accordion-item">
			<div className="accordion-toggle" onClick={() => setIsActive(!isActive)}>
				<h3>{fName + " " + lName}</h3>
				<span>{isActive ? "-" : "+"}</span>
			</div>
			{isActive && (
				<div className="accordion-content">
					<p>
						Employee ID:{" "}
						<input
							defaultValue={stateEmpId}
							onChange={(e) => setStateEmpId(e.target.value)}
						/>
					</p>
					<p>
						Employee First Name:
						<input
							defaultValue={statefName}
							onChange={(e) => setStatefName(e.target.value)}
						/>
					</p>
					<p>
						Employee Last Name:
						<input
							defaultValue={statelName}
							onChange={(e) => setStatelName(e.target.value)}
						/>
					</p>
					<p>
						Employee Email Address:
						<input
							defaultValue={stateEmail}
							onChange={(e) => setStateEmail(e.target.value)}
						/>
					</p>
					<p>
						Employee City:
						<input
							defaultValue={stateCity}
							onChange={(e) => setStateCity(e.target.value)}
						/>
					</p>
					<p>
						Employee Address:
						<input
							defaultValue={stateAddress}
							onChange={(e) => setStateAddress(e.target.value)}
						/>
					</p>
					<p>
						Employee Start Date:
						<input
							defaultValue={stateStartDate}
							onChange={(e) => setStateStartDate(e.target.value)}
						/>
					</p>
					<p>
						Employee End Date:
						<input
							defaultValue={stateEndDate}
							onChange={(e) => setStateEndDate(e.target.value)}
						/>
					</p>
					<p>
						Employee Hourly Rate:
						<input
							defaultValue={stateHourlyRate}
							onChange={(e) => setStateHourlyRate(e.target.value)}
						/>
					</p>
					<p>
						Employee Monthly Salary:
						<input
							defaultValue={stateMonthlySal}
							onChange={(e) => setStateMonthlySal(e.target.value)}
						/>
					</p>
					<p>
						Employee Bank Account Number:
						<input
							defaultValue={stateBankAccount}
							onChange={(e) => setStateBankAccount(e.target.value)}
						/>
					</p>
					<p>
						Employee Bank Institution ID:
						<input
							defaultValue={stateInstitutionId}
							onChange={(e) => setStateInstitutionId(e.target.value)}
						/>
					</p>
					<p>
						Employee Bank Transit ID:
						<input
							defaultValue={stateTransitId}
							onChange={(e) => setStateTransitId(e.target.value)}
						/>
					</p>
					<button
						type="button"
						className="btn btn-warning m-2"
						onClick={handleEdit}
					>
						Edit Information
					</button>
					<button
						type="button"
						className="btn btn-danger m-2"
						onClick={handleDelete}
					>
						Remove Employee
					</button>
				</div>
			)}
		</li>
	);
};

export default EmployeeCard;
