import axios from "axios";

const GET_ALL_EMPLOYEES_API_URL = "http://localhost:8080/api/v1/employees";
const CREATE_NEW_EMPLOYEE_API_URL = "http://localhost:8080/api/v1/new-employee";

class EmployeeController {
	getEmployees() {
		return axios.get(GET_ALL_EMPLOYEES_API_URL);
	}

	createEmployee(newEmployee) {
		return axios.post(CREATE_NEW_EMPLOYEE_API_URL, newEmployee);
	}
}

export default new EmployeeController();
