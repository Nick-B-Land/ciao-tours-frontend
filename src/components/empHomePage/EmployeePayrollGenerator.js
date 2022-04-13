import React from "react";
import "../../style/stylesheet.css";

const EmployeePayrollGenerator = ({
  payrollDataId,
  payrollId,
  payrollEvent,
  dateOfPayrollData,
  noOfWorkingHours,
  timeOff,
  officeUsage,
  otherUsage,
  usageCost,
  dailyAssistanceClient,
  dailyAssistanceStartDate,
  dailyAssistanceEndDate,
  dailyAssistanceFee,
  tourBookingAdminDescription,
  tourBookingNumOfHours,
  tourBookingClient,
  tourBookingAdminFee,
  dayOfExpense,
  expenseDescription,
  expenseAmount,
  expenseDate,
}) => {
  return (
    <div id="pegWrapper" className="row  text-responsive">
      <div id="pwLeft" className="col w-25 ">
        <table className="table">
          <tbody>
            <tr>
              <td>payroll Data Id:</td>
              <td>{payrollDataId}</td>
            </tr>
            <tr>
              <td>payroll Id:</td>
              <td>{payrollId}</td>
            </tr>
            <tr>
              <td>payroll Event:</td>
              <td>{payrollEvent}</td>
            </tr>
            <tr>
              <td>date Of Payroll Data:</td>
              <td>{dateOfPayrollData}</td>
            </tr>
            <tr>
              <td>no of working hours:</td>
              <td>{noOfWorkingHours}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="pwLeft" className="col w-25 ">
        <table className="table">
          <tbody>
            <tr>
              <td>time Off:</td>
              <td>{timeOff}</td>
            </tr>
            <tr>
              <td>office Usage:</td>
              <td>{officeUsage}</td>
            </tr>
            <tr>
              <td>other Usage:</td>
              <td>{otherUsage}</td>
            </tr>
            <tr>
              <td>usage Cost:</td>
              <td>{usageCost}</td>
            </tr>
            <tr>
              <td>daily Assistance Client:</td>
              <td>{dailyAssistanceClient}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="pwLeft" className="col w-25 ">
        <table className="table">
          <tbody>
            <tr>
              <td>daily Assistance Start Date:</td>
              <td>{dailyAssistanceStartDate}</td>
            </tr>
            <tr>
              <td>daily Assistance End Date:</td>
              <td>{dailyAssistanceEndDate}</td>
            </tr>
            <tr>
              <td>daily Assistance Fee:</td>
              <td>{dailyAssistanceFee}</td>
            </tr>
            <tr>
              <td>tour Booking Admin Description:</td>
              <td>{tourBookingAdminDescription}</td>
            </tr>
            <tr>
              <td>tourBookingNumOfHours:</td>
              <td>{tourBookingNumOfHours}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="pwLeft" className="col w-25 ">
        <table className="table">
          <tbody>
            <tr>
              <td>tour Booking Client:</td>
              <td>{tourBookingClient}</td>
            </tr>
            <tr>
              <td>tour Booking Admin Fee:</td>
              <td>{tourBookingAdminFee}</td>
            </tr>
            <tr>
              <td>expense Description:</td>
              <td>{expenseDescription}</td>
            </tr>
            <tr>
              <td>expense Amount:</td>
              <td>{expenseAmount}</td>
            </tr>
            <tr>
              <td>expense Date:</td>
              <td>{expenseDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeePayrollGenerator;
