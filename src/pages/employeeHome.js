import React, { Component } from "react";
import "../style/stylesheet.css";
import TopAdminNav from "../components/navs/topAdminNav";
import BottomAdminNav from "../components/navs/bottomAdminNav";
import { CurrentUser } from "../model/currentUser";
import EmployeePayrollGenerator from "../components/empHomePage/EmployeePayrollGenerator";
import PaystubEmployeeGenerator from "../components/empHomePage/PaystubEmployeeGenerator";
import payrollController from "../controllers/payrollController";
import payrollDataController from "../controllers/payrollDataController";
import paystubController from "../controllers/paystubController";

class EmployeeHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pdl: null,
      ps: null,
    };
  }

  componentDidMount() {
    let list1 = null;
    let list2 = null;
    let list3 = null;
    let empId = null;
    let latestDate = null;
    let counter1 = 0;
    let counter2 = 0;
    let counter3 = 0;

    payrollController.getPayroll().then((pd) => {
      list1 = pd.data;

      for (let i = 0; i < pd.data.length; i++) {
        let item = list1[i];
        let list2 = Object.values(item);
        if (latestDate == null || latestDate < Date.parse(list2[2])) {
          latestDate = Date.parse(list2[2]);
          counter1 = i;
        }
        if (i == pd.data.length - 1) {
          console.log(Object.values(list1[counter1]));
          console.log(Object.keys(list1[counter1]));
        }
      }
      list1 = Object.values(pd.data)[counter1];
      list1 = Object.values(list1);
      empId = list1[1];
      payrollDataController.getPayrollDataByPayrollID(list1[1]).then((pdi) => {
        let latestDate = null;
        let pdList = pdi.data;

        for (let i = 0; i < pdi.data.length; i++) {
          let currData = Object.values(pdList[i]);
          let currIndex = Object.values(currData);
          if (latestDate == null || latestDate < currIndex[3]) {
            latestDate = currIndex[3];
            counter2 = i;
            list2 = currIndex;
          }
          if (i == pdi.data.length - 1) {
            console.log(Object.values(pdList[counter2]));
            console.log(Object.keys(pdList[counter2]));
          }
        }

        paystubController.getPaystubByEID(empId).then((ps) => {
          latestDate = null;
          let psList = ps.data;

          for (let i = 0; i < ps.data.length; i++) {
            let currData = Object.values(psList[i]);
            let currIndex = Object.values(currData);
            if (latestDate == null || latestDate < currIndex[2]) {
              latestDate = currIndex[2];
              list3 = currData;
              counter3 = i;
            }
            if (i == ps.data.length - 1) {
              console.log(Object.values(psList[counter3]));
              console.log(Object.keys(psList[counter3]));
            }
          }

          this.setState({
            pdl: list2,
            ps: list3,
          });
          for (let i = 0; i < list2.length; i++) {
            console.log(list2[i]);
          }
          for (let i = 0; i < list3.length; i++) {
            console.log(list3[i]);
          }
        });
      });
    });
  }
  getLatestPayroll() {
    let listV = payrollDataController.getAllPayrollData();
    if (listV != null) {
      console.log(listV.length);
    }
  }
  render() {
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
              <div className="employeeHeader p-4 pt-2 pb-2 text-center">
                <h1 className="mb-2">Welcome, {CurrentUser.username}</h1>
                <div className="container">
                  <div className="row">
                    <div className="col-md-10 p-2">
                      <div className="p-3 bg-white pb-4 border rounded-3">
                        <h2 className="text-center">this months paystub</h2>
                        <PaystubEmployeeGenerator
                          paystubId={this.state.ps[0]}
                          address={this.state.ps[1]}
                          city={this.state.ps[2]}
                          dop={this.state.ps[3]}
                          desc={this.state.ps[4]}
                          emailAdd={this.state.ps[5]}
                          expAmount2={this.state.ps[6]}
                          firstName={this.state.ps[7]}
                          lastName={this.state.ps[8]}
                          hourlyWage={this.state.ps[9]}
                          monthlySal={this.state.ps[10]}
                          nonSalInc={this.state.ps[11]}
                          numDayOff={this.state.ps[12]}
                          numOfHours={this.state.ps[13]}
                          numberOfWork={this.state.ps[14]}
                          rate={this.state.ps[15]}
                          eiDeductions={this.state.ps[16]}
                          grosspay={this.state.ps[17]}
                          netpay={this.state.ps[18]}
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
                          payrollDataId={this.state.pdl[0]}
                          payrollId={this.state.pdl[1]}
                          payrollEvent={this.state.pdl[2]}
                          dateOfPayrollData={this.state.pdl[3]}
                          noOfWorkingHours={this.state.pdl[4]}
                          timeOff={this.state.pdl[5]}
                          officeUsage={this.state.pdl[6]}
                          otherUsage={this.state.pdl[7]}
                          usageCost={this.state.pdl[8]}
                          dailyAssistanceClient={this.state.pdl[9]}
                          dailyAssistanceStartDate={this.state.pdl[10]}
                          dailyAssistanceEndDate={this.state.pdl[11]}
                          dailyAssistanceFee={this.state.pdl[12]}
                          tourBookingAdminDescription={this.state.pdl[13]}
                          tourBookingNumOfHours={this.state.pdl[14]}
                          tourBookingClient={this.state.pdl[15]}
                          tourBookingAdminFee={this.state.pdl[16]}
                          dayOfExpense={this.state.pdl[17]}
                          expenseDescription={this.state.pdl[18]}
                          expenseAmount={this.state.pdl[19]}
                          expenseDate={this.state.pdl[20]}
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
