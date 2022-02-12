import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from './pages/loginPage';
import AdminHome from './pages/adminHome';
import EmployeeHome from './pages/employeeHome';
import AdminEmployees from "./pages/adminEmployees";
import AdminReports from "./pages/adminReports";
import Information from "./pages/information";
import NewEmployee from "./pages/newEmployee";

function App() {
  return (
    <React.Fragment>
          <BrowserRouter>
            <Routes>
              <Route
                exact
                path="/login"
                element={<LoginPage />}
              />  
              <Route
                exact
                path="/admin"
                element={<AdminHome />}
              />
              <Route
                exact
                path="/employee"
                element={<EmployeeHome />}
              />
              <Route
                exact
                path="/adminEmployees"
                element={<AdminEmployees />}
              />
              <Route
                exact
                path="/newEmployee"
                element={<NewEmployee />}
              />
              <Route
                exact
                path="/adminReports"
                element={<AdminReports />}
              />
              <Route
                exact
                path="/"
                element={<Information />}
              />
            </Routes>
          </BrowserRouter>
      </React.Fragment>
  );
}

export default App;
