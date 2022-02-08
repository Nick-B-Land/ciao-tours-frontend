import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from './pages/loginPage';
import AdminHome from './pages/adminHome';
import EmployeeHome from './pages/employeeHome';
import AdminEmployees from "./pages/adminEmployees";

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
                path="/"
                element={<AdminEmployees />}
              />
            </Routes>
          </BrowserRouter>
      </React.Fragment>
  );
}

export default App;
