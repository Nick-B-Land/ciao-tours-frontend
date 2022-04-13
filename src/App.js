import React, { Component } from "react";
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
import EmployeePayroll from "./pages/employeePayroll";
import EmployeePaystubs from "./pages/employeePaystub";
import BookkeeperPayroll from "./pages/bookkeeperPayroll";
import EmployeeInfo from "./pages/employeeInfo";
import AdminResetPassword from "./pages/adminResetPassword";

class App extends Component {
	render() {
		this.props.currentUser.Set();
		return (
			<React.Fragment>
				<BrowserRouter>
					<Routes>
						<Route
							exact
							path="/"
							element={<LoginWrapper currentUser={this.props.currentUser} />}
						/>
						<Route
							exact
							path="/admin"
							element={<AdminHome currentUser={this.props.currentUser} />}
						/>
						<Route
							exact
							path="/employee"
							element={<EmployeeHome currentUser={this.props.currentUser} />}
						/>
						<Route
							exact
							path="/employeePayroll"
							element={<EmployeePayroll currentUser={this.props.currentUser} />}
						/>
						<Route
							exact
							path="/adminEmployees"
							element={<AdminEmployees currentUser={this.props.currentUser} />}
						/>
						<Route
							exact
							path="/adminPayroll"
							element={
								<BookkeeperPayroll currentUser={this.props.currentUser} />
							}
						/>
						<Route
							exact
							path="/adminReports"
							element={<AdminReports currentUser={this.props.currentUser} />}
						/>
						<Route
							exact
							path="/editEmployeeInfo"
							element={<EditMyinfo currentUser={this.props.currentUser} />}
						/>
						<Route
							exact
							path="/employeeInfo"
							element={<EmployeeInfo currentUser={this.props.currentUser} />}
						/>
						<Route
							exact
							path="/newEmployee"
							element={
								<NewEmployeeWrapper currentUser={this.props.currentUser} />
							}
						/>
						<Route
							exact
							path="/employeePayroll"
							element={<EmployeePayroll currentUser={this.props.currentUser} />}
						/>
						<Route
							exact
							path="/resetPassword"
							element={
								<AdminResetPassword currentUser={this.props.currentUser} />
							}
						/>
						<Route
							exact
							path="/employeePaystubs"
							element={
								<EmployeePaystubs currentUser={this.props.currentUser} />
							}
						/>
					</Routes>
				</BrowserRouter>
			</React.Fragment>
		);
	}
}

export default App;
