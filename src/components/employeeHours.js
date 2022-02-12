import React, { Component } from 'react';

class EmployeeHours extends Component {

    
    render() {

        return (
            <>
                <tr>
                    <td>{this.props.firstName} {this.props.lastName}</td>
                    <td>{this.props.hours}</td>
                </tr>
            </>

        );
    }
}

export default EmployeeHours;