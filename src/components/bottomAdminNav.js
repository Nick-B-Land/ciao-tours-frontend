import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminEmployees from '../pages/adminEmployees';

class BottomAdminNav extends Component {
    render() { 
        return (
            <div className='row border basicNavBar'>
                <ul className='nav nav-pills  nav-fill'>
                    <li className='nav-item'>
                        <a className='nav-link'><Link to="/admin">Home</Link></a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link'><Link to="/adminEmployees">Employees</Link></a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link'><Link to="/adminReports">Reports</Link></a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link'>Run Payroll</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link'><Link to="/information">My Information</Link></a>
                    </li>
                </ul>
            </div>
        );
    }
}
 
export default BottomAdminNav;