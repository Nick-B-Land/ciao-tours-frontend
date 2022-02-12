import React, { Component } from 'react';
import '../style/stylesheet.css';
import TopNav from '../components/topNav';
import BottomAdminNav from '../components/bottomAdminNav';
import TopAdminNav from '../components/topAdminNav';

class AdminEmployees extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         menu :[
    //             {
    //                 empName: 'Tyler Max',
    //                 email: '23@abc.com',
    //                 type: 'Contractor',
    //                 location: 'Italy',
    //                 hourlyrate: '14.00 CAD',
    //                 preferredCurrency: 'EUR',
    //             },
    //             {
    //                 empName: 'Kelly Venus',
    //                 email: '435@abc.com',
    //                 type: 'Contractor',
    //                 location: 'USA',
    //                 hourlyrate: '10.00 CAD',
    //                 preferredCurrency: 'USD',
    //             },
    //             {
    //                 empName: 'Peter Earth',
    //                 email: '567@abc.com',
    //                 type: 'Contractor',
    //                 location: 'Italy',
    //                 hourlyrate: '14.00 CAD',
    //                 preferredCurrency: 'EUR',
    //             },
    //         ]
    //     }
    // }

    render() {
        return (
            <div className='container-fluid p-0 adminEmployeesPage'>
                <div className='row d-flex'>
                    <TopAdminNav />
                    <BottomAdminNav />
                </div>
                <div className='row'>
                    <div className='col-2'>
                    </div>
                    <div className='col-8 min-vh-100 innerAdmin'>
                        <div className='row'>
                            <div className='employeeHeader p-4 pt-2 pb-2'>
                                <h1>List Of Employees</h1>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col p-0'>
                                <div>
                                    {/* <div className="accordion-item">
                                        <div className="accordion-title p-4 pt-2 pb-2">
                                            <div><h3>Employee Name #1</h3></div>
                                            <div><h3>+</h3></div>
                                        </div>
                                        <div className="accordion-content bg-white p-5 pt-2 pb-2">
                                            <p>Email: 23@abc.com</p>
                                            <p>Type: Contractor</p>
                                            <p>Location: Italy</p>
                                            <p>Hourly Rate: 14.00 CAD</p>
                                            <p>Preferred currency of payment: EUR</p>
                                            <p>...</p>
                                            <button type="button" className="btn btn-warning btn-sm m-1">Edit Information</button>
                                            <button type="button" className="btn btn-danger btn-sm">Remove Employeee</button>
                                        </div>
                                    </div> */}

                                    {/* <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-mdb-toggle="collapse"
                                                data-mdb-target="#collapseTwo"
                                                aria-expanded="false"
                                                aria-controls="collapseTwo"
                                            >
                                                Employee Name #2
                                            </button>
                                        </h2>
                                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-mdb-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <p>Email: 23@abc.com</p>
                                                <p>Type: Contractor</p>
                                                <p>Location: Italy</p>
                                                <p>Hourly Rate: 14.00 CAD</p>
                                                <p>Preferred currency of payment: EUR</p>
                                                <p>...</p>
                                                <button type="button" className="btn btn-warning btn-sm m-1">Edit Information</button>
                                                <button type="button" className="btn btn-danger btn-sm">Remove Employeee</button>
                                            </div>
                                        </div>
                                    </div> */}

                                    {/* <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingThree">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-mdb-toggle="collapse"
                                                data-mdb-target="#collapseThree"
                                                aria-expanded="false"
                                                aria-controls="collapseThree"
                                            >
                                                Employee Name #3
                                            </button>
                                        </h2>
                                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-mdb-parent="#accordionExample">
                                            <div className="accordion-body">
                                                <p>Email: 23@abc.com</p>
                                                <p>Type: Contractor</p>
                                                <p>Location: Italy</p>
                                                <p>Hourly Rate: 14.00 CAD</p>
                                                <p>Preferred currency of payment: EUR</p>
                                                <p>...</p>
                                                <button type="button" className="btn btn-warning btn-sm m-1">Edit Information</button>
                                                <button type="button" className="btn btn-danger btn-sm">Remove Employeee</button>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-2'></div>
                </div>
            </div>
        );
    }
}

export default AdminEmployees;