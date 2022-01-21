import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopNav from './components/topNav';
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from './pages/loginPage';
import AdminHome from './pages/adminHome';
import EmployeeHome from './pages/employeeHome';

function App() {
  return (
    <React.Fragment>
          <BrowserRouter>
            <TopNav />
            <Routes>
              <Route
                exact
                path="/"
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
            </Routes>
          </BrowserRouter>
        </React.Fragment>
  );
}

export default App;
