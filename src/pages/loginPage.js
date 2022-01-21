import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
    render() { 
        return (
            <div className='container'>
                <div className='row my-5'>
                    <div className='col'>
                        <Link to="/admin">
                            <button className='btn btn-dark'>
                                Admins
                            </button>
                        </Link>
                    </div>
                </div>
                <div className='row my-5'>
                    <div className='col'>
                        <Link to="/employee">
                            <button className='btn btn-dark'>
                                Employees
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default LoginPage;