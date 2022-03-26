import React, { Component } from "react";
import "../style/stylesheet.css";
import employeeController from "../controllers/employeeController";
import TopAdminNav from "../components/navs/topAdminNav";
import BottomAdminNav from "../components/navs/bottomAdminNav";
import { CurrentUser } from "../model/currentUser";
import EmployeePayrollGenerator from "../components/empHomePage/EmployeePayrollGenerator";
import PaystubEmployeeGenerator from "../components/empHomePage/PaystubEmployeeGenerator";
import payrollController from "../controllers/payrollController";
import payrollDataController from "../controllers/payrollDataController";
import paystubController from "../controllers/paystubController";

class EmployeeHome extends Component {
  componentDidMount() {
    payrollDataController.getAllPayrollData().then((pd) => {
      console.log(pd.data);
    });
    payrollController.getPayroll().then((pd) => {
      console.log(pd.data);
    });

    console.log(payrollController.getPayrollByEID(1).data);
  }
  getLatestPayroll() {
    let listV = payrollDataController.getAllPayrollData();
    if (listV != null) {
      console.log(listV.length);
    }
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
      <div className="container-fluid p-0 adminHomePage text-responsive">
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
                    <div className="col-md-10 p-2">
                      <div className="p-3 bg-white pb-4 border rounded-3">
                        <h2 className="text-center">this months paystub</h2>
                        <PaystubEmployeeGenerator
                          paystubId={0}
                          address={"33 address red"}
                          city={"calgary"}
                          dop={"2007-05-08"}
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
                    <div className="col-md-2 p-2 text-center">
                      <div className="p-1 bg-white border rounded-3">
                        <h6>Today's Date</h6>
                        <p className="h2 m-0">{month}</p>
                        <p className="display-1 m-0">{day}</p>
                        <p className="h2 m-0">{year}</p>
                      </div>{" "}
                      <div className="col-md-12 text-center mt-2 pt-5 bkContact">
                        <div className="  bg-white border rounded-3 p-1">
                          <p>
                            If you have any concerns please contact the
                            bookeeper:
                          </p>
                          <b>at:example@example.ca</b>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="">
                      <div className="bg-white border rounded-3">
                        <h2 className="text-center">latest payroll</h2>
                        <EmployeePayrollGenerator
                          daClient={"jonathan daboush"}
                          daEndDate={"2007-05-08 "}
                          daFee={33}
                          daStartDate={"2007-04-08 "}
                          dateOfPayroll={"2007-05-09 "}
                          dayOfExpense={"2007-05-08 "}
                          expenseAmount={33}
                          expenseDate={"2007-05-08"}
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
