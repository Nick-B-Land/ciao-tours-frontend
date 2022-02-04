import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BottomAdminNav extends Component {
    render() { 
        return (
            <div className='row border basicNavBar'>
                <ul className='nav nav-pills  nav-fill'>
                    <li className='nav-item'>
                        <a className='nav-link'><Link to="/Home">Home</Link></a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link'>Employees</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link'>Reports</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link'>Run Payroll</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link'>My Information</a>
                    </li>
                </ul>
            </div>
        );
    }
}
 
export default BottomAdminNav;