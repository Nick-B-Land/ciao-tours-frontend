import React, { Component } from 'react';
import '../style/stylesheet.css';
import TopNav from '../components/topNav';
import BottomAdminNav from '../components/bottomAdminNav';

class AdminEmployees extends Component {
    
    render() { 

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
                            <div className='col min-vh-100 adminContent'>
                                <h1>I can't see anything</h1>
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