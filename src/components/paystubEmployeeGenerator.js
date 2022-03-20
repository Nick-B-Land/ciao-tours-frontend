import React from "react";
import "../style/stylesheet.css";

const paystubEmployeeGenerator = ({
  paystubId,
  address,
  city,
  dop,
  desc,
  emailAdd,
  expAmount,
  firstName,
  lastName,
  hourlyWage,
  monthlySal,
  nonSalInc,
  numDayOff,
  numOfHours,
  numberOfWork,
  rate,
}) => {
  return (
    <table className="table">
      <tbody>
        <tr>
          <td>paystub Id:</td>
          <td>{paystubId}</td>
        </tr>
        <tr>
          <td> address:</td>
          <td>{address}</td>
        </tr>
        <tr>
          <td> city:</td>
          <td>{city}</td>
        </tr>
        <tr>
          <td>date of birth:</td>
          <td>{dop}</td>
        </tr>
        <tr>
          <td>description:</td>
          <td>{desc}</td>
        </tr>
        <tr>
          <td>email address:</td>
          <td>{emailAdd}</td>
        </tr>
        <tr>
          <td>expense amount:</td>
          <td>{expAmount}</td>
        </tr>
        <tr>
          <td>paystub Id:</td>
          <td>{paystubId}</td>
        </tr>
        <tr>
          <td>first Name:</td>
          <td>{firstName}</td>
        </tr>
        <tr>
          <td>last Name:</td>
          <td>{lastName}</td>
        </tr>
        <tr>
          <td>monthly salary:</td>
          <td>{monthlySal}</td>
        </tr>
        <tr>
          <td>number of work days:</td>
          <td>{numberOfWork}</td>
        </tr>
        <tr>
          <td>hourly wage:</td>
          <td>{hourlyWage}</td>
        </tr>
        <tr>
          <td>non salary income:</td>
          <td>{nonSalInc}</td>
        </tr>
        <tr>
          <td>number of days off:</td>
          <td>{numDayOff}</td>
        </tr>
        <tr>
          <td>number of hours:</td>
          <td>{numOfHours}</td>
        </tr>
        <tr>
          <td>rate:</td>
          <td>{rate}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default paystubEmployeeGenerator;
