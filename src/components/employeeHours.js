import React from "react";
import "../style/stylesheet.css";

const EmployeeHours = ({ firstName, lastName, hours }) => {
	return (
		<tr>
			<td>
				{firstName} {lastName}
			</td>
			<td>{hours}</td>
		</tr>
	);
};

export default EmployeeHours;
