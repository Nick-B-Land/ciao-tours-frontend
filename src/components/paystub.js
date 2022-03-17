import React from "react";
import "../style/stylesheet.css";

const Paystub = ({
	period,
	fName,
	lName,
	employer,
	empId,
	date,
	regRate,
	regHours,
	regEarnings,
	regYearHours,
	regYearEarnings,
	sickRate,
	sickHours,
	sickEarnings,
	sickYearHours,
	sickYearEarnings,
	holRate,
	holHours,
	holEarnings,
	holYearHours,
	holYearEarnings,
	cpp,
	cppYear,
	ei,
	eiYear,
	tax,
	taxYear,
	csb,
	csbYear,
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
					<th>Employee Number: {empId}</th>
					<th>Date: {date}</th>
				</tr>
				<tr>
					<td colspan="4" class='table-light'>
						<table class="table mb-0 table-borderless haeBody">
							<thead>
								<tr className="table-dark haeHeader">
									<th colspan="6">HOURS AND EARNINGS</th>
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
									<th>Earnings</th>
									<th>Hours</th>
									<th>Earnings</th>
								</tr>
								<tr>
									<td>Regular</td>
									<td>{regRate}</td>
									<td>{regHours}</td>
									<td>{regEarnings}</td>
									<td>{regYearHours}</td>
									<td>{regYearEarnings}</td>
								</tr>
								<tr>
									<td>Sick</td>
									<td>{sickRate}</td>
									<td>{sickHours}</td>
									<td>{sickEarnings}</td>
									<td>{sickYearHours}</td>
									<td>{sickYearEarnings}</td>
								</tr>
								<tr>
									<td>Holiday</td>
									<td>{holRate}</td>
									<td>{holHours}</td>
									<td>{holEarnings}</td>
									<td>{holYearHours}</td>
									<td>{holYearEarnings}</td>
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
									<td>{tax}</td>
									<td>{taxYear}</td>
								</tr>
								<tr>
									<td>CANADA SAVINGS BOND</td>
									<td>{csb}</td>
									<td>{csbYear}</td>
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
