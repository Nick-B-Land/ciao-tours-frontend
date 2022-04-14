import axios from "axios";

const GET_ALL_PAYROLL_DATA_API_URL =
	"http://localhost:8080/api/v1/payroll-data";
const CREATE_NEW_PAYROLL_DATA_API_URL =
	"http://localhost:8080/api/v1/new-payroll-data";
const GET_PAYROLL_DATA_BY_ID_API_URL =
	"http://localhost:8080/api/v1/payroll-data/";
const GET_PAYROLL_DATA_BY_PAYROLL_ID_API_URL =
	"http://localhost:8080/api/v1/payroll-data-by-payroll/";
const DELETE_PAYROLL_DATA_BY_ID =
	"http://localhost:8080/api/v1/delete-payroll-data/";

/**
 * Controller for accessing database regarding payroll data info
 * includes:
 * 	creating a new payroll data
 * 	getting payroll data by payroll id, eid
 * 	deleting payroll data event
 */
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

	getPayrollDataByPayrollID(payrollDataID) {
		return axios.get(GET_PAYROLL_DATA_BY_PAYROLL_ID_API_URL + payrollDataID);
	}

	deletePayrollDataEvent(payrollDataID) {
		return axios.delete(DELETE_PAYROLL_DATA_BY_ID + payrollDataID);
	}
}

export default new PayrollDataController();
