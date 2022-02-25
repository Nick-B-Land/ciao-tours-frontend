import React from "react";
import { useNavigate } from "react-router-dom";
import NewEmployee from "../pages/newEmployee";

const NewEmployeeWrapper = (props) => {
	const navigate = useNavigate();

	return <NewEmployee navigate={navigate} {...props} />;
};

export default NewEmployeeWrapper;
