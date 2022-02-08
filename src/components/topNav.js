import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../style/CAIO logo.png';


class TopNav extends Component {
    render() { 
        return (
            <div className='row basicNavBar'>
                <div className='col d-flex justify-content-between'>
                    <img src={logo} alt="CIAO Tours Logo"></img>
                    <h1 className='d-flex align-items-end'>CAIO Tours EMS</h1>
                    <a className='d-flex align-items-center' ><Link to="/login">Logout</Link></a>
                </div>
            </div>
        );
    } 
}
 
export default TopNav;