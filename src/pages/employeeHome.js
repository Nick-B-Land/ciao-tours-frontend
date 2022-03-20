import React, { Component } from "react";
import "../style/stylesheet.css";
import employeeController from "../controllers/employeeController";
import TopAdminNav from "../components/topAdminNav";
import BottomAdminNav from "../components/bottomAdminNav";
import { CurrentUser } from "../model/currentUser";
import paystubEmployeeGenerator from "../components/paystubEmployeeGenerator";
import employeePayrollGenerator from "../components/employeePayrollGenerator";

class EmployeeHome extends Component {
  componentDidMount() {
    employeeController.getEmployees().then((employees) => {
      this.setState({ employeeList: employees.data, employeesLoaded: true });
    });
  }

  render() {
    var adminName = "Administrator";
    var monthName = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    var current = new Date();
    var month = `${monthName[current.getMonth()]}`;
    var day = `${current.getDate()}`;
    var year = `${current.getFullYear()}`;

    return (
      <div className="container-fluid p-0 adminHomePage">
        <div className="row d-flex">
          <TopAdminNav currentUser={this.props.currentUser} />
          <BottomAdminNav />
        </div>
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8 innerAdmin">
            <div className="row">
              <div className="col mt-2 min-vh-100">
                <h1 className="mb-2">Welcome, {CurrentUser.username}</h1>
                <div className="container">
                  <div className="row">
                    <div className="col-md-9 p-2">
                      <div className="p-3 bg-white pb-4 border rounded-3">
                        <h2 className="text-center">Flagged Days</h2>
                        <p>this months paystub.</p>
                        <paystubEmployeeGenerator
                          paystubId={0}
                          address={"33 address red"}
                          city={"calgary"}
                          dop={"2007-05-08 12:35:29.123"}
                          desc={"januarys paystub"}
                          emailAdd={"username@email.ca"}
                          expAmount={33}
                          firstName={"username"}
                          lastName={"password"}
                          hourlyWage={33}
                          monthlySal={33}
                          nonSalInc={33}
                          numDayOff={6}
                          numOfHours={33}
                          numberOfWork={33}
                          rate={33}
                        />
                      </div>
                    </div>
                    <div className="col-md-3 p-2 text-center">
                      <div className="p-3 bg-white border rounded-3">
                        <h6>Today's Date</h6>
                        <p className="h2 m-0">{month}</p>
                        <p className="display-1 m-0">{day}</p>
                        <p className="h2 m-0">{year}</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 p-2">
                      <div className="p-3 bg-white border rounded-3">
                        <h2>latest payroll</h2>
                        <employeePayrollGenerator
                          daClient={"jonathan daboush"}
                          daEndDate={"2007-05-08 12:35:29.123"}
                          daFee={33}
                          daStartDate={"2007-04-08 12:35:29.123"}
                          dateOfPayroll={"2007-05-09 12:35:29.123"}
                          dayOfExpense={"2007-05-08 12:35:29.123"}
                          expenseAmount={33}
                          expenseDate={"2007-05-08 12:35:29.123"}
                          expenseDescription={"this is a payroll"}
                          noOfWorkingHours={33}
                          officeUsage={"i broke a stapler."}
                          otherUsage={"client broke 2 staplers"}
                          payrollEvent={1}
                          payrollId={1}
                          timeOff={3}
                          tbAdminDesc={null}
                          tbAdminFee={null}
                          tbClient={null}
                          tbNoh={null}
                          usageCost={33}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {this.state.employeesLoaded ? this.renderEmployees() : <h3>Loading</h3>} */}
      </div>
    );
  }
}

export default EmployeeHome;
