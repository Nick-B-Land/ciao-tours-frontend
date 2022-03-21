import React, { Component } from "react";
import "../style/employeeCalendarCSS.css";
import "../style/stylesheet.css";


class CalendarDayReport extends Component {
    constructor(props) {
		super(props);
		this.state = {
			eventsLoaded: false,
		};
	}

    componentDidMount = () => {
        this.setState({ eventsLoaded : true });
    }

            // payrollDataId: "",
			// payrollId: this.state.selectedPayrollID,
			// payrollEvent: 7,
			// dateOfPayrollData: dataDay.toISOString(),
			// noOfWorkingHours: null,
			// timeOff: null,
			// officeUsage: null,
			// otherUseage: null,
			// usageCost: null,
			// dailyAssistanceClient: null,
			// dailyAssistanceStartDate: null,
			// dailyAssistanceEndDate: null,
			// dailyAssistanceFee: null,
			// tourBookingAdminDescription: null,
			// tourBookingNumOfHours: null,
			// tourBookingClient: null,
			// tourBookingAdminFee: null,
			// dayOfExpense: null,
			// expenseDescription: expenseDesc,
			// expenseAmount: expenseAmount,
			// expenseDate: dataDay.toISOString(),
        
    loadEventDetails = () => {
        console.log("Entered loadEventDetails");
        if(this.props.selectedEvents.length !== 0){
            console.log("Starting to run events map");
            console.log(this.props.selectedEvents);
            this.props.selectedEvents.map((e) => {
                console.log("Event type "+ e.payrollEvent);
                if (e.payrollEvent === 1) {
                    return(
                        <div>Workday hours added: {e.noOfWorkingHours}</div>
                    );
                } else if (e.payrollEvent === 2) {
                    return(
                        <>
                            <div>Tour Booking</div>
                            <div className="ps-3">Description: {e.tourBookingAdminDescription}</div>
                            <div className="ps-3">Hours: {e.tourBookingNumOfHours}</div>
                            <div className="ps-3">Client: {e.tourBookingClient}</div>
                        </>
                    );
                } else if (e.payrollEvent === 3) {
                    return(
                        <>
                            <div>Daily Assistance Fee</div>
                            <div className="ps-3">Client: {e.dailyAssistanceClient}</div>
                        </>
                    );
                } else if (e.payrollEvent === 4) {
                    return(
                        <>
                            <div>Time Off: {e.timeOff} hours</div>
                        </>
                    );
                } else if (e.payrollEvent === 7) {
                    return(
                        <>
                            <div>Expense</div>
                            <div className="ps-3">Description: {e.expenseDescription}</div>
                            <div className="ps-3">Amount: {e.expenseAmount}</div>
                        </>
                    );
                } else {
                    return(null);
                };
            });
        } else {return null};
    };

    render() {
        return(
            <>
				<div className="row">
					<div className="col mt-2">
						<h3>Day at a Glance</h3>
					</div>
				</div>
                <div className="row">
                    <div className="col mt-2">
                        {this.props.selectedEvents.length !== 0
                            ?  
                                this.props.selectedEvents.map((e) => {
                                    if (e.payrollEvent === 1) {
                                        return(
                                            <>
                                                <div className=""><b>Workday hours added:</b> {e.noOfWorkingHours}</div>
                                                <div><input type="button" className="button btn-sm PrimaryButton" id={e.payrollDataId} value="Remove"/></div>
                                            </>
                                        );
                                    } else if (e.payrollEvent === 2) {
                                        return(
                                            <>
                                                <div><b>Tour Booking</b></div>
                                                <div className="ps-3">Description: {e.tourBookingAdminDescription}</div>
                                                <div className="ps-3">Hours: {e.tourBookingNumOfHours}</div>
                                                <div className="ps-3">Client: {e.tourBookingClient}</div>
                                                <div><input type="button" className="button btn-sm PrimaryButton" id={e.payrollDataId} value="Remove"/></div>
                                            </>
                                        );
                                    } else if (e.payrollEvent === 3) {
                                        return(
                                            <>
                                                <div><b>Daily Assistance Fee</b></div>
                                                <div className="ps-3">Client: {e.dailyAssistanceClient}</div>
                                                <div><input type="button" className="button btn-sm PrimaryButton" id={e.payrollDataId} value="Remove"/></div>
                                            </>
                                        );
                                    } else if (e.payrollEvent === 4) {
                                        return(
                                            <>
                                                <div><b>Time Off:</b> {e.timeOff} hours</div>
                                                <div><input type="button" className="button btn-sm PrimaryButton" id={e.payrollDataId} value="Remove"/></div>
                                            </>
                                        );
                                    } else if (e.payrollEvent === 7) {
                                        return(
                                            <>
                                                <div><b>Expense</b></div>
                                                <div className="ps-3">Description: {e.expenseDescription}</div>
                                                <div className="ps-3">Amount: {e.expenseAmount}</div>
                                                <div><input type="button" className="button btn-sm PrimaryButton" id={e.payrollDataId} value="Remove"/></div>
                                            </>
                                        );
                                    } else {
                                        return(null);
                                    };
                                })
                            : "No Events"
                        }
                    </div>
                </div>
            </>
        );
    }

}
export default CalendarDayReport;