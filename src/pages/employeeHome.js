import React, { Component } from "react";
import BottomEmpNav from "../components/bottomEmpNav";
import TopNavWrapper from "../functionalComponents/topNavWrapper";

class EmployeeHome extends Component {
  render() {
    return (
      <div className="container-fluid p-0 employeeHomePage">
        <div className="row d-flex">
          <TopNavWrapper currentUser={this.props.currentUser} />
          <BottomEmpNav />
        </div>
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8 innerAdmin">
            <div className="row">
              <div className="col min-vh-100">
                <h1 class="text-center">
                  Welcome, {this.props.currentUser.username}
                </h1>
                <br></br>
                <div class="text-center">
                  In this your employee portal in which you are to perform
                  actions related to employee working hours, events, and
                  personal information. this toll will be a convenient tool in
                  which to see information relevant to your responsibilities and
                  records.
                </div>
                <br></br>
                <div class="text-center">
                  On the employee calendar page, you will find a very simple
                  interface. in the form of a calendar in which you will be able
                  to choose from any day and see a list of events. you will be
                  able to edit, add and remove events as you see fit.
                </div>
                <br></br>
                <div class="text-center">
                  in paystubs, you will be able to view all paystubs that have
                  been generated for you. please note, you will not be able to
                  edit paystubs as they are final and generated monthly.
                  Included in this page by clicking on a paystub you will be
                  able to view payrolls and other events relative to that month
                  and how we're used to calculating your paystub. If there are
                  any issues you should talk to the bookkeeper.
                </div>
                <br></br>
                <div class="text-center">
                  Finally, in my information, you can view information relevant
                  in your employee file.
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-2"></div>
              <div className="col"></div>
            </div>
          </div>
          <div className="col-2"></div>
        </div>

        {/* {this.state.employeesLoaded ? this.renderEmployees() : <h3>Loading</h3>} */}
      </div>
    );
  }
}

export default EmployeeHome;
