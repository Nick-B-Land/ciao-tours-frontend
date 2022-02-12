import React, { Component } from 'react';
import '../style/stylesheet.css';
import TopAdminNav from '../components/topAdminNav';
import BottomAdminNav from '../components/bottomAdminNav';

class AdminReports extends Component {
    render() {
        return(
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
                            <div className='d-flex justify-content-center mainHeaders'>
                                <h1>Reports</h1>
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

export default AdminReports;