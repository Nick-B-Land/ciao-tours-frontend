import axios from "axios";

const EMPLOYEE_API_URL = "http://localhost:8080/api/v1/employees";

class EmployeeController {

    getEmployees() {
        return axios.get(EMPLOYEE_API_URL);
    }

}

export default new EmployeeController();