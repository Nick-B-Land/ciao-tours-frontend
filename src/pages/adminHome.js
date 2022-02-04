import React, { Component, useState, useEffect } from 'react';
import '../style/stylesheet.css';
import EmployeeCard from '../components/employeeCard';
import employeeController from '../controllers/employeeController';
import TopNav from '../components/topNav';
import BottomAdminNav from '../components/bottomAdminNav';

class AdminHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            employeeList: [],
            employeesLoaded: false
        };
    }

    componentDidMount() {
        employeeController.getEmployees().then(
            employees => {
                
                this.setState({employeeList: employees.data, employeesLoaded: true});

            }
        );
    }

    renderEmployees = () => {
        console.log("render Employees fired");
        console.log(this.state.employeeList);
        return this.state.employeeList.map( e => {

                <EmployeeCard 
                key={e.id} 
                firstName={e.firstName} 
                lastName = {e.lastName} 
                jobTitle = {e.jobTitle} 
                />
        })
    }

    
    render() { 
        var adminName = 'Administrator';
        return (
            <div className='container-fluid p-0 adminHomePage'>
                <div className='row d-flex'>
                    <TopNav />
                    <BottomAdminNav />
                </div>
                <div className='row'>
                    <div className='col-2'>
                    </div>
                    <div className='col-8 innerAdmin'>
                        <div className='row'>
                            <div className='col min-vh-100'>
                                <h1>Welcome, {adminName}</h1>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-2'></div>
                            <div className='col'></div>
                        </div>
                    </div>
                    <div className='col-2'></div>
                </div>

                {/* {this.state.employeesLoaded ? this.renderEmployees() : <h3>Loading</h3>} */}
            </div>
        );
    }
}
 
export default AdminHome;