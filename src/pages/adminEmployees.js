import React, { Component } from 'react';
import '../style/stylesheet.css';
import TopNav from '../components/topNav';
import BottomAdminNav from '../components/bottomAdminNav';

class AdminEmployees extends Component {
    render() { 
        var employeeName = 'Ashley Drinkill';
        return (
            <div className='container-fluid p-0 adminEmployeesPage'>
                <div className='row d-flex'>
                    <TopNav />
                    <BottomAdminNav />
                </div>
                <div className='row'>
                    <div className='col-2'>
                    </div>
                    <div className='col-8 min-vh-100 innerAdmin'>
                        <div className='row'>
                            <div className='employeeHeader'>
                                <h1>List Of Employees</h1>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-2'></div>
                            <div className='col'></div>
                        </div>
                    </div>
                    <div className='col-2'></div>
                </div>
            </div>
        );
    }
}
 
export default AdminEmployees;