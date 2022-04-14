import React, { Component } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminHome from "./pages/adminHome";
import EmployeeHome from "./pages/employeeHome";
import AdminEmployees from "./pages/adminEmployees";
import AdminReports from "./pages/adminReports";
import LoginWrapper from "./functionalComponents/loginWrapper";
import NewEmployeeWrapper from "./functionalComponents/newEmployeeWrapper";
import EmployeePayroll from "./pages/employeePayroll";
import EmployeePaystubs from "./pages/employeePaystub";
import BookkeeperPayroll from "./pages/bookkeeperPayroll";
import EmployeeInfo from "./pages/employeeInfo";
import AdminResetPassword from "./pages/adminResetPassword";
import EmployeeChangePassword from "./pages/employeeChangePassword";

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
						{this.props.currentUser.roles.includes("ROLE_ADMIN") ? (
							<Route
								exact
								path="/admin"
								element={<AdminHome currentUser={this.props.currentUser} />}
							/>
						) : (
							<Route path="*" element={<Navigate to="/" replace />} />
						)}
						{this.props.currentUser.username ? (
							<Route
								exact
								path="/employee"
								element={<EmployeeHome currentUser={this.props.currentUser} />}
							/>
						) : (
							<Route path="*" element={<Navigate to="/" replace />} />
						)}
						{this.props.currentUser.username ? (
							<Route
								exact
								path="/employeePayroll"
								element={
									<EmployeePayroll currentUser={this.props.currentUser} />
								}
							/>
						) : (
							<Route path="*" element={<Navigate to="/" replace />} />
						)}
						{this.props.currentUser.roles.includes("ROLE_ADMIN") ? (
							<Route
								exact
								path="/adminEmployees"
								element={
									<AdminEmployees currentUser={this.props.currentUser} />
								}
							/>
						) : (
							<Route path="*" element={<Navigate to="/" replace />} />
						)}
						{this.props.currentUser.roles.includes("ROLE_ADMIN") ? (
							<Route
								exact
								path="/adminPayroll"
								element={
									<BookkeeperPayroll currentUser={this.props.currentUser} />
								}
							/>
						) : (
							<Route path="*" element={<Navigate to="/" replace />} />
						)}
						{this.props.currentUser.roles.includes("ROLE_ADMIN") ? (
							<Route
								exact
								path="/adminReports"
								element={<AdminReports currentUser={this.props.currentUser} />}
							/>
						) : (
							<Route path="*" element={<Navigate to="/" replace />} />
						)}
						{this.props.currentUser.username ? (
							<Route
								exact
								path="/employeeInfo"
								element={<EmployeeInfo currentUser={this.props.currentUser} />}
							/>
						) : (
							<Route path="*" element={<Navigate to="/" replace />} />
						)}
						{this.props.currentUser.roles.includes("ROLE_ADMIN") ? (
							<Route
								exact
								path="/newEmployee"
								element={
									<NewEmployeeWrapper currentUser={this.props.currentUser} />
								}
							/>
						) : (
							<Route path="*" element={<Navigate to="/" replace />} />
						)}
						{this.props.currentUser.roles.includes("ROLE_ADMIN") ? (
							<Route
								exact
								path="/resetPassword"
								element={
									<AdminResetPassword currentUser={this.props.currentUser} />
								}
							/>
						) : (
							<Route path="*" element={<Navigate to="/" replace />} />
						)}
						{this.props.currentUser.username ? (
							<Route
								exact
								path="/changePassword"
								element={
									<EmployeeChangePassword
										currentUser={this.props.currentUser}
									/>
								}
							/>
						) : (
							<Route path="*" element={<Navigate to="/" replace />} />
						)}
						{this.props.currentUser.username ? (
							<Route
								exact
								path="/changePassword"
								element={
									<EmployeeChangePassword
										currentUser={this.props.currentUser}
									/>
								}
							/>
						) : (
							<Route path="*" element={<Navigate to="/" replace />} />
						)}
						{this.props.currentUser.username ? (
							<Route
								exact
								path="/employeePaystubs"
								element={
									<EmployeePaystubs currentUser={this.props.currentUser} />
								}
							/>
						) : (
							<Route path="*" element={<Navigate to="/" replace />} />
						)}
					</Routes>
				</BrowserRouter>
			</React.Fragment>
		);
	}
}

export default App;
