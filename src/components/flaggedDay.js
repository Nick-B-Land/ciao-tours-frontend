import React, { Component } from 'react';

class FlaggedDay extends Component {

    
    render() {

        return (
            <>
                <tr>
                    <td>{this.props.firstName} {this.props.lastName}</td>
                    <td>{this.props.date}</td>
                    <td>{this.props.issue}</td>
                    <td><button type="button" className="btn btn-warning btn-sm">Resolve</button></td>
                </tr>
            </>

        );
    }
}

export default FlaggedDay;