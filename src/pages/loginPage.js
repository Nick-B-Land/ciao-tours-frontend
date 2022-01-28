import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
    render() { 
        return (

            <div className='container-fluid '>
               <div className='row'>
                    <div className='col-6'>
                        <p>Left</p>
                    </div>
                    <div className='col-6 d-flex justify-content-center'>
                        <div className='row min-vh-100'>
                            <div className='col d-flex align-items-center'>
                                <div className="row flex-column">
                                    <div className='col'>
                                        <Link to="/admin">
                                            <button className='btn btn-dark'>
                                                Admins
                                            </button>
                                        </Link>
                                    </div>
                                    <div className='col'>
                                        <Link to="/employee">
                                            <button className='btn btn-dark'>
                                                Employees
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
               </div>
            </div>

            // <div className='container'>
            //     <div className='row my-5'>
            //         <div className='col'>
            //             <Link to="/admin">
            //                 <button className='btn btn-dark'>
            //                     Admins
            //                 </button>
            //             </Link>
            //         </div>
            //     </div>
            //     <div className='row my-5'>
            //         <div className='col'>
                        
            //         </div>
            //     </div>
            // </div>
        );
    }
}
 
export default LoginPage;