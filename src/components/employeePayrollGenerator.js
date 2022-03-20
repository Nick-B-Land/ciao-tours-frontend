import React from "react";
import "../style/stylesheet.css";

const employeePayrollGenerator = ({
  daClient,
  daEndDate,
  daFee,
  daStartDate,
  dateOfPayroll,
  dayOfExpense,
  expenseAmount,
  expenseDate,
  expenseDescription,
  noOfWorkingHours,
  officeUsage,
  otherUsage,
  payrollEvent,
  payrollId,
  timeOff,
  tbAdminDesc,
  tbAdminFee,
  tbClient,
  tbNoh,
  usageCost,
}) => {
  return (
    <table className="table">
      <tbody>
        <tr>
          <td>daily assistance client:</td>
          <td>{daClient}</td>
        </tr>
        <tr>
          <td>daily assistance start date:</td>
          <td>{daFee}</td>
        </tr>
        <tr>
          <td>daily assistance end date:</td>
          <td>{daEndDate}</td>
        </tr>
        <tr>
          <td>daily assistance fee:</td>
          <td>{daStartDate}</td>
        </tr>
        <tr>
          <td>date of payroll:</td>
          <td>{dateOfPayroll}</td>
        </tr>
        <tr>
          <td>day of expense:</td>
          <td>{dayOfExpense}</td>
        </tr>
        <tr>
          <td>expense amount:</td>
          <td>{expenseAmount}</td>
        </tr>
        <tr>
          <td>expense date:</td>
          <td>{expenseDate}</td>
        </tr>
        <tr>
          <td>expense description:</td>
          <td>{expenseDescription}</td>
        </tr>
        <tr>
          <td>number of working hours:</td>
          <td>{noOfWorkingHours}</td>
        </tr>
        <tr>
          <td>office usage:</td>
          <td>{officeUsage}</td>
        </tr>
        <tr>
          <td>other usage:</td>
          <td>{otherUsage}</td>
        </tr>
        <tr>
          <td>payroll event:</td>
          <td>{payrollEvent}</td>
        </tr>
        <tr>
          <td>time Off:</td>
          <td>{timeOff}</td>
        </tr>
        <tr>
          <td>tour booking administration description:</td>
          <td>{tbAdminDesc}</td>
        </tr>
        <tr>
          <td>tour booking administration fee:</td>
          <td>{tbAdminFee}</td>
        </tr>
        <tr>
          <td>tour booking client:</td>
          <td>{tbClient}</td>
        </tr>
        <tr>
          <td>tour booking number of hours:</td>
          <td>{tbNoh}</td>
        </tr>
        <tr>
          <td>usage cost:</td>
          <td>{usageCost}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default employeePayrollGenerator;
