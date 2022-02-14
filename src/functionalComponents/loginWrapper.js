import React from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "../pages/loginPage";

const LoginWrapper = (props) => {
	const navigate = useNavigate();

	return <LoginPage navigate={navigate} {...props} />;
};

export default LoginWrapper;
