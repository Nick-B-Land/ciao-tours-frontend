import React, { Component } from 'react';

class EmployeeCard extends Component {
    render() { 
        return (
            <div className='row card'>
                <div className='col card-body'>
                    <h5 className='card-title'> {this.props.firstName + " " + this.props.lastName} </h5>
                    <p className='card-text'> {this.props.jobTitle} </p>
                </div>
            </div>
        );
    }
}
 
export default EmployeeCard;