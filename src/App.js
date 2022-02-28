import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Myinfo from "./pages/employeeInfo";
import EditMyinfo from "./pages/editEmployeeInfo";
import AdminHome from "./pages/adminHome";
import EmployeeHome from "./pages/employeeHome";
import AdminEmployees from "./pages/adminEmployees";
import AdminReports from "./pages/adminReports";
import Information from "./pages/information";
import LoginWrapper from "./functionalComponents/loginWrapper";
import NewEmployeeWrapper from "./functionalComponents/newEmployeeWrapper";

function App() {
	return (
		<React.Fragment>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<LoginWrapper />} />
					<Route exact path="/admin" element={<AdminHome />} />
					<Route exact path="/employee" element={<EmployeeHome />} />
					<Route exact path="/adminEmployees" element={<AdminEmployees />} />
					<Route exact path="/adminReports" element={<AdminReports />} />
					<Route exact path="/myinfo" element={<Myinfo />} />
					<Route exact path="/editEmployeeInfo" element={<EditMyinfo />} />
					<Route exact path="/employeeInfo" element={<Information />} />
					<Route exact path="/newEmployee" element={<NewEmployeeWrapper />} />
				</Routes>
			</BrowserRouter>
		</React.Fragment>
	);
}

export default App;
