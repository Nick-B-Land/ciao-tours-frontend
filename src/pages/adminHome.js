import React, { Component, useState, useEffect } from 'react';
import EmployeeCard from '../components/employeeCard';
import employeeController from '../controllers/employeeController';

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

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h1>Admin Home Page</h1>
                    </div>
                </div>
                {this.state.employeesLoaded ? this.renderEmployees() : <h3>Loading</h3>}
            </div>
        );
    }
}
 
export default AdminHome;