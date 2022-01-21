import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class TopNav extends Component {
    render() { 
        return (
            <div className="container-fluid py-4 my-0">
                <div className="row">
                    <div className="col-2 d-flex align-items-center">
                        <Link to="/">
                            <span className="navbar-brand">
                                <p>Logo</p>
                            </span>
                        </Link>
                    </div>
                    <div className="col-10 d-flex justify-content-end">
                        <span className="d-flex align-items-center">
                            <h3>Ciao Tours EMS</h3>
                        </span>
                    </div>
                </div>
          </div>
        );
    }
}
 
export default TopNav;