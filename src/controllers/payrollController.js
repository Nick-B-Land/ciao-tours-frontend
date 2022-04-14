import axios from "axios";

const GET_ALL_PAYROLL_API_URL = "http://localhost:8080/api/v1/payroll";
const CREATE_NEW_PAYROLL_API_URL = "http://localhost:8080/api/v1/new-payroll";
const GET_PAYROLL_BY_ID_API_URL = "http://localhost:8080/api/v1/payroll/";
const GET_PAYROLL_BY_EID_API_URL = "http://localhost:8080/api/v1/payroll/eid/";
const GET_PAYROLL_BY_IS_PROCESSED_API_URL =
	"http://localhost:8080/api/v1/payroll/is-processed/";
const UPDATE_PAYROLL_API_URL = "http://localhost:8080/api/v1/update-payroll/";

/**
 * Controller for accessing database regarding payrolls
 * includes
 * 	creating new payrolls
 * 	getting a payroll by id, eid, or processed
 * 	updating payroll
 */
class PayrollController {
	getPayroll() {
		return axios.get(GET_ALL_PAYROLL_API_URL);
	}

	createPayroll(newPayroll) {
		return axios.post(CREATE_NEW_PAYROLL_API_URL, newPayroll);
	}

	getPayrollByID(payrollID) {
		return axios.get(GET_PAYROLL_BY_ID_API_URL + payrollID);
	}

	getPayrollByEID(employeeID) {
		return axios.get(GET_PAYROLL_BY_EID_API_URL + employeeID);
	}

	getPayrollByIsProcessed(proccessedStatus) {
		return axios.get(GET_PAYROLL_BY_IS_PROCESSED_API_URL + proccessedStatus);
	}

	updatePayroll(updatedPayroll, payrollID) {
		return axios.put(UPDATE_PAYROLL_API_URL + payrollID, updatedPayroll);
	}
}

export default new PayrollController();
