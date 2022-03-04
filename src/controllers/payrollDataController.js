import axios from "axios";

const GET_ALL_PAYROLL_DATA_API_URL =
	"http://localhost:8080/api/v1/payroll-data";
const CREATE_NEW_PAYROLL_DATA_API_URL =
	"http://localhost:8080/api/v1/new-payroll-data";
const GET_PAYROLL_DATA_BY_ID_API_URL =
	"http://localhost:8080/api/v1/payroll-data/";
const GET_PAYROLL_DATA_BY_PAYROLL_ID_API_URL =
	"http://localhost:8080/api/v1/payroll-data-by-payroll/";

class PayrollDataController {
	getAllPayrollData() {
		return axios.get(GET_ALL_PAYROLL_DATA_API_URL);
	}

	createPayrollData(newPayrollData) {
		return axios.post(CREATE_NEW_PAYROLL_DATA_API_URL, newPayrollData);
	}

	getPayrollDataByID(payrollDataID) {
		return axios.get(GET_PAYROLL_DATA_BY_ID_API_URL + payrollDataID);
	}

	getPayrollDataByPayrollID(payrollID) {
		return axios.get(GET_PAYROLL_DATA_BY_PAYROLL_ID_API_URL + payrollID);
	}
}

export default new PayrollDataController();
