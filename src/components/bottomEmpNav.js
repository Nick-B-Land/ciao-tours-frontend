import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class BottomEmpNav extends Component {
    render() { 
        return (
            <div className='row border basicNavBar'>
                <ul className='nav nav-pills  nav-fill'>
                    <li className='nav-item'>
                        <a className='nav-link'><Link to="/employee">Home</Link></a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link'>Payroll Calendar</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link'>Paystubs</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link'>My Information</a>
                    </li>
                </ul>
            </div>
        );
    }
}
 
export default BottomEmpNav;