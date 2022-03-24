import React from "react";
import "../style/stylesheet.css";

const Paystub = ({
	period,
	paystubid,
	fName,
	lName,
	employer,
	empId,
	date,
	address,
	city,
	email,
	hourlyWage,
	workdayHours,
	workdayCharges,
	monthlySalary,
	regYearHours,
	regYearEarnings,
	daysOff,
	dailyAssistanceNumber,
	dailyAssistanceCharges,
	tourBookingHours,
	tourBookingCharges,
	statHours,
	expense,
	expenseYear,
	cpp,
	cppYear,
	ei,
	eiYear,
	incomeTax,
	incomeYear,
	curGross,
	curDeductions,
	curNet,
	payMethod,
	yearGross,
	yearDeductions,
	yearNet,
	refNum,
}) => {

	return (
		<table class="table paystubTable">
			<thead>
				<tr class="table-success">
					<th colspan="3"><h3>Paystub for Period: {period}</h3></th>
					<td>
						<button type="button" className="btn btn-light downloadButton">
							Download
						</button>
					</td>
				</tr>
			</thead>
			<tbody>
				<tr class="table-success">
					<th>{fName} {lName}</th>
					<th>Employer: {employer}</th>
					<th>Employee ID: {empId}</th>
					<th>Date: {date}</th>
				</tr>
				<tr class="table-success">
					<th>{address}, {city}</th>
					<th>{email}</th>
					<th></th>
					<th>Paystub ID: {paystubid}</th>
				</tr>
				<tr>
					<td colspan="4" class='table-light'>
						<table class="table mb-0 table-borderless haeBody">
							<thead>
								<tr className="table-dark haeHeader">
									<th colspan="6">HOURS</th>
								</tr>
							</thead>
							<tbody class="table-light">
								<tr>
									<th></th>
									<th colspan="3">Current</th>
									<th colspan="2">Year to Date</th>
								</tr>
								<tr>
									<th>Description</th>
									<th>Rate</th>
									<th>Hours</th>
									<th>Total</th>
									<th>Hours</th>
									<th>Total</th>
								</tr>
								<tr>
									<td>Workdays</td>
									<td>{hourlyWage}</td>
									<td>{workdayHours}</td>
									<td>{workdayCharges}</td>
									<td>{regYearHours}</td>
									<td>{regYearEarnings}</td>
								</tr>
								<tr>
									<td>Time Off </td>
									<td>-</td>
									<td>{daysOff}</td>
									<td>-</td>
									<td>3</td>
									<td>-</td>
								</tr>
								<tr>
									<td>Daily Assistance</td>
									<td>-</td>
									<td>{dailyAssistanceNumber}</td>
									<td>{dailyAssistanceCharges}</td>
									<td>-</td>
									<td>{dailyAssistanceCharges}</td>
								</tr>
								<tr>
									<td>Tour Booking</td>
									<td>-</td>
									<td>{tourBookingHours}</td>
									<td>{tourBookingCharges}</td>
									<td>-</td>
									<td>{tourBookingCharges}</td>
								</tr>
								<tr>
									<td>Statutory</td>
									<td>-</td>
									<td>{statHours}</td>
									<td>-</td>
									<td>-</td>
									<td>-</td>
								</tr>
								<tr>
									<td>Expense</td>
									<td>-</td>
									<td>-</td>
									<td>{expense}</td>
									<td>-</td>
									<td>{expenseYear}</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
				<tr>
					<td colspan="4" class='table-light'>
						<table class="table mb-0 table-borderless dBody">
							<thead>
								<tr class="table-dark dHeader">
									<th colspan="3">Deductions</th>
								</tr>
							</thead>
							<tbody class="table-light">
								<tr>
									<th></th>
									<th>Current</th>
									<th>Year to Date</th>
								</tr>
								<tr>
									<td>CPP</td>
									<td>{cpp}</td>
									<td>{cppYear}</td>
								</tr>
								<tr>
									<td>EI</td>
									<td>{ei}</td>
									<td>{eiYear}</td>
								</tr>
								<tr>
									<td>Income Tax</td>
									<td>{incomeTax}</td>
									<td>{incomeYear}</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
				<tr>
					<td colspan="4" class='table-light'>
						<table class="table mb-0 table-bordered">
							<thead>
								<tr class="table-dark sumHeader">
									<th>SUMMMARY</th>
									<th>GROSS PAY</th>
									<th>DEDUCTIONS</th>
									<th>NET PAY</th>
									<th>PAYMENT METHOD</th>
								</tr>
							</thead>
							<tbody class="table-light">
								<tr>
									<th>CURRENT</th>
									<td>{curGross}</td>
									<td>{curDeductions}</td>
									<td>{curNet}</td>
									<td>{payMethod}</td>
								</tr>
								<tr>
									<th>YEAR-TO-DATE</th>
									<td>{yearGross}</td>
									<td>{yearDeductions}</td>
									<td>{yearNet}</td>
									<td>REFERENCE #: {refNum}</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default Paystub;
