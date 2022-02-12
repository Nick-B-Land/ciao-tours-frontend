import React, { useState } from "react";
import '../style/stylesheet.css';

const Accordion = ({ empName, email, type, location, hourlyRate, preferredCurrency }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <li className="accordion-item">
      <div className="accordion-toggle" onClick={() => setIsActive(!isActive)}>
        <h3>{empName}</h3><span>{isActive ? "-" : "+"}</span>
      </div>
      {isActive && 
      <div className="accordion-content">
          <p>Email: {email}</p>
          <p>Type: {type}</p>
          <p>Location: {location}</p>
          <p>Hourly Rate: {hourlyRate}</p>
          <p>Preferred Currency: {preferredCurrency}</p>
          <button type="button" className="btn btn-warning m-2">Edit Information</button>
          <button type="button" className="btn btn-danger m-2">Remove Employee</button>
      </div>}
    </li>
  );
};

export default Accordion;