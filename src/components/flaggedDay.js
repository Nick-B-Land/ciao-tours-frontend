import React, { Component } from 'react';
import '../style/stylesheet.css';

const FlaggedDay = ({ firstName, lastName, date, issue }) => {
    return (
        <tr>
            <td>{firstName} {lastName}</td>
            <td>{date}</td>
            <td>{issue}</td>
            <td><button type="button" className="btn btn-warning btn-sm">Resolve</button></td>
        </tr>
    );
};

export default FlaggedDay;