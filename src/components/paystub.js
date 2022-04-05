import React from "react";
import "../style/stylesheet.css";

const Paystub = ({
	period,
	paystubId,
	firstName,
	lastName,
	employeeId,
	dateOfPaystub,
	address,
	city,
	emailAddress,
	hourlyWage,
	workDayHours,
	workDayCharges,
	monthlySalary,
	regYearHours,
	regYearEarnings,
	timeOffHours,
	dailyAssistanceNumber,
	dailyAssistanceCharges,
	tourBookingHours,
	tourBookingCharges,
	statHours,
	expenseAmount,
	expenseYear,
	cppDeductions,
	cppYear,
	eiDeductions,
	eiYear,
	incomeTax,
	incomeYear,
	grossPay,
	curDeductions,
	netPay,
	payMethod,
	yearGross,
	yearDeductions,
	yearNet,
	refNum,
}) => {
	const getMonthName = (month) => {
		if (month === 0) return "January";
		else if (month === 1) return "February";
		else if (month === 2) return "March";
		else if (month === 3) return "April";
		else if (month === 4) return "May";
		else if (month === 5) return "June";
		else if (month === 6) return "July";
		else if (month === 7) return "August";
		else if (month === 8) return "Sepetember";
		else if (month === 9) return "October";
		else if (month === 10) return "November";
		else if (month === 11) return "December";
	};

	return (
		<table className="table text-white paystubTable">
			<thead>
				<tr className="table text-white tableHeader">
					<th colSpan="4" class="text-white">
						<h3 class="text-white">
							Paystub for Period:{" "}
							{getMonthName(new Date(dateOfPaystub).getMonth()) +
								" " +
								new Date(dateOfPaystub).getFullYear()}
						</h3>
					</th>
					
				</tr>
			</thead>
			<tbody>
				<tr class="table tableHeader">
					<th class="text-white">{firstName} {lastName}</th>
					<th class="text-white">Employer: CIAO Tours</th>
					<th class="text-white">Employee ID: {employeeId}</th>
					<th class="text-white">Date: {new Date(dateOfPaystub).toLocaleDateString()}</th>
				</tr>
				<tr class="table text-white tableHeader">
					<th class="text-white">{address}, {city}</th>
					<th class="text-white">{emailAddress}</th>
					<th class="text-white"></th>
					<th class="text-white">Paystub ID: {paystubId}</th>
				</tr>
				<tr>
					<td colSpan="4" className="table-light">
						<table className="table mb-0 table-borderless haeBody">
							<thead>
								<tr className="table-active haeHeader">
									<th colSpan="6">HOURS</th>
								</tr>
							</thead>
							<tbody className="table-light">
								<tr>
									<th></th>
									<th colSpan="3">Current</th>
									<th colSpan="2">Year to Date</th>
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
									<td>
										{monthlySalary
											? monthlySalary
											: workDayHours > 0
											? hourlyWage
											: "-"}
									</td>
									<td>{monthlySalary ? 160 - timeOffHours : workDayHours}</td>
									<td>{workDayCharges}</td>
									<td>{regYearHours}</td>
									<td>{regYearEarnings}</td>
								</tr>
								<tr>
									<td>Time Off </td>
									<td>-</td>
									<td>{timeOffHours}</td>
									<td>-</td>
									<td>-</td>
									<td>-</td>
								</tr>
								<tr>
									<td>Daily Assistance</td>
									<td>{dailyAssistanceNumber > 0 ? "9" : "-"}</td>
									<td>{dailyAssistanceNumber}</td>
									<td>{dailyAssistanceCharges}</td>
									<td>-</td>
									<td>{dailyAssistanceCharges}</td>
								</tr>
								<tr>
									<td>Tour Booking</td>
									<td>{tourBookingHours > 0 ? hourlyWage : "-"}</td>
									<td>{tourBookingHours}</td>
									<td>{tourBookingCharges}</td>
									<td>-</td>
									<td>{tourBookingCharges}</td>
								</tr>
								<tr>
									<td>Statutory</td>
									<td>{statHours > 0 ? hourlyWage * 1.5 : "-"}</td>
									<td>{statHours}</td>
									<td>-</td>
									<td>-</td>
									<td>-</td>
								</tr>
								<tr>
									<td>Expense</td>
									<td>-</td>
									<td>-</td>
									<td>{expenseAmount}</td>
									<td>-</td>
									<td>{expenseYear}</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
				<tr>
					<td colSpan="4" className="table-light">
						<table className="table mb-0 table-borderless dBody">
							<thead>
								<tr className="table-active dHeader">
									<th colSpan="3">Deductions</th>
								</tr>
							</thead>
							<tbody className="table-light">
								<tr>
									<th></th>
									<th>Current</th>
									<th>Year to Date</th>
								</tr>
								<tr>
									<td>CPP</td>
									<td>{cppDeductions}</td>
									<td>{cppYear}</td>
								</tr>
								<tr>
									<td>EI</td>
									<td>{eiDeductions}</td>
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
					<td colSpan="4" className="table-light">
						<table className="table mb-0 table-bordered">
							<thead>
								<tr className="table-active sumHeader">
									<th>SUMMMARY</th>
									<th>GROSS PAY</th>
									<th>DEDUCTIONS</th>
									<th>NET PAY</th>
									<th>PAYMENT METHOD</th>
								</tr>
							</thead>
							<tbody className="table-light">
								<tr>
									<th>CURRENT</th>
									<td>{grossPay}</td>
									<td>{eiDeductions + cppDeductions + incomeTax}</td>
									<td>{netPay}</td>
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
