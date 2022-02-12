import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../style/CAIO logo.png';


class TopAdminNav extends Component {
    render() {
        return (
            <div className='row basicNavBar'>
                <div className='col d-flex justify-content-between'>
                    <img src={logo} alt="CIAO Tours Logo"></img>
                    <div></div>
                    <h1 className='d-flex align-items-end'>CAIO Tours EMS</h1>
                    <div className="form-check form-switch d-flex align-items-center">
                        <input className="form-check-input m-1" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        <label className="form-check-label" for="flexSwitchCheckDefault">Employee View</label>
                    </div>
                    <a className='d-flex align-items-center' ><Link to="/loginPage">Logout</Link></a>
                </div>
            </div>
        );
    }
}

export default TopAdminNav;