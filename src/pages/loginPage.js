import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../style/CAIO logo.png';
import '../style/stylesheet.css';

class LoginPage extends Component {
    render() { 
        return (
            <div className='container-fluid min-vh-100 loginscreen'>
                <div className='row'>
                    <div className='col-6 p-0'>
                        <div className='loginBG'></div>

                    </div>
                    <div className='col-6 d-flex justify-content-center'>
                        <div className='row min-vh-100'>
                            <div className='col d-flex align-items-center'>
                                <div className='row'>
                                    <div className='col d-flex flex-column'>
                                        <div className='mx-auto'><img className='mx-auto' src={logo}/></div>
                                        <div className='p-2 mx-auto'>Login</div>
                                        <div className='row'>
                                            <div className='d-flex justify-content-between'>
                                                <div className='m-2'>Username</div>
                                                <div><input type='text'></input></div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='d-flex justify-content-between'>
                                                <div className='m-2'>Password</div>
                                                <div><input type='password'></input></div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='d-flex justify-content-center'>
                                                <div><input type='submit' value='Login' onSubmit={LoginPage.validate()}></input></div>
                                            </div>
                                        </div>
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
    validate() {
        return (true);
    }

}
 
export default LoginPage;