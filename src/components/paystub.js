import React from "react";
import "../style/stylesheet.css";

const Paystub = ({
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
	netPay,
	yearGross,
	yearDeductions,
	yearNet,
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

	/**
	 * calculates the total deductions for paystub
	 * @returns 
	 */
	const calculateDeductions = () => {
		let deductions =
			Number(eiDeductions) + Number(cppDeductions) + Number(incomeTax);

		return deductions.toFixed(2);
	};

	return (
		<table className="table text-white paystubTable">
			<thead>
				<tr className="table text-white tableHeader">
					<th colSpan="4" className="text-white">
						<h3 className="text-white ">
							Paystub for Period:{" "}
							{getMonthName(new Date(dateOfPaystub).getMonth()) +
								" " +
								new Date(dateOfPaystub).getFullYear()}
						</h3>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr className="table tableHeader">
					<th className="text-white">
						{firstName} {lastName}
					</th>
					<th className="text-white">Employer: CIAO Tours</th>
					<th className="text-white">Employee ID: {employeeId}</th>
					<th className="text-white">
						Date: {new Date(dateOfPaystub).toLocaleDateString()}
					</th>
				</tr>
				<tr className="table text-white tableHeader">
					<th className="text-white">
						{address}, {city}
					</th>
					<th className="text-white">{emailAddress}</th>
					<th className="text-white"></th>
					<th className="text-white">Paystub ID: {paystubId}</th>
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
									<td>{workDayCharges > 0 ? workDayCharges : "-"}</td>
									<td>{regYearHours > 0 ? regYearHours : "-"}</td>
									<td>{regYearEarnings > 0 ? regYearEarnings : "-"}</td>
								</tr>
								<tr>
									<td>Time Off </td>
									<td>-</td>
									<td>{timeOffHours > 0 ? timeOffHours : "-"}</td>
									<td>-</td>
									<td>-</td>
									<td>-</td>
								</tr>
								<tr>
									<td>Daily Assistance</td>
									<td>{dailyAssistanceNumber > 0 ? "9" : "-"}</td>
									<td>
										{dailyAssistanceNumber > 0 ? dailyAssistanceNumber : "-"}
									</td>
									<td>
										{dailyAssistanceCharges > 0 ? dailyAssistanceCharges : "-"}
									</td>
									<td>-</td>
									<td>
										{dailyAssistanceCharges > 0 ? dailyAssistanceCharges : "-"}
									</td>
								</tr>
								<tr>
									<td>Tour Booking</td>
									<td>{tourBookingHours > 0 ? hourlyWage : "-"}</td>
									<td>{tourBookingHours > 0 ? tourBookingHours : "-"}</td>
									<td>{tourBookingCharges > 0 ? tourBookingCharges : "-"}</td>
									<td>-</td>
									<td>{tourBookingCharges > 0 ? tourBookingCharges : "-"}</td>
								</tr>
								<tr>
									<td>Statutory</td>
									<td>{statHours > 0 ? hourlyWage * 1.5 : "-"}</td>
									<td>{statHours > 0 ? statHours : "-"}</td>
									<td>-</td>
									<td>-</td>
									<td>-</td>
								</tr>
								<tr>
									<td>Expense</td>
									<td>-</td>
									<td>-</td>
									<td>{expenseAmount > 0 ? expenseAmount : "-"}</td>
									<td>-</td>
									<td>{expenseYear > 0 ? expenseYear : "-"}</td>
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
									<th colSpan="3">DEDUCTIONS</th>
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
									<td>{cppDeductions > 0 ? cppDeductions.toFixed(2) : "-"}</td>
									<td>{cppYear > 0 ? cppYear : "-"}</td>
								</tr>
								<tr>
									<td>EI</td>
									<td>{eiDeductions > 0 ? eiDeductions.toFixed(2) : "-"}</td>
									<td>{eiYear > 0 ? eiYear : "-"}</td>
								</tr>
								<tr>
									<td>Income Tax</td>
									<td>{incomeTax > 0 ? incomeTax.toFixed(2) : "-"}</td>
									<td>{incomeYear > 0 ? incomeYear : "-"}</td>
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
									<td>{grossPay.toFixed(2)}</td>
									<td>{calculateDeductions()}</td>
									<td>{netPay.toFixed(2)}</td>
									<td>Direct Deposit</td>
								</tr>
								<tr>
									<th>YEAR-TO-DATE</th>
									<td>{yearGross}</td>
									<td>{yearDeductions}</td>
									<td>{yearNet}</td>
									<td>
										REFERENCE #: {employeeId}
										{paystubId}
									</td>
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
