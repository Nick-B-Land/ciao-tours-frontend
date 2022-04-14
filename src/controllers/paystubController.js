import axios from "axios";

const GET_ALL_PAYSTUB_API_URL = "http://localhost:8080/api/v1/paystubs";
const CREATE_NEW_PAYSTUB_API_URL = "http://localhost:8080/api/v1/new-paystub";
const GET_PAYSTUB_BY_ID_API_URL = "http://localhost:8080/api/v1/paystubs/";
const GET_PAYSTUB_BY_EID_API_URL =
  "http://localhost:8080/api/v1/paystubs/employee/";
const GET_PAYSTUB_BY_DATE_OF_PAYSTUB_API_URL =
  "http://localhost:8080/api/v1/paystubs/date/";

/**
 * Controller for accessing database regarding paystubs
 * includes:
 *  creating a new paystub
 *  getting paystub by id, eid, date
 */
class PaystubController {
  getPaystub() {
    return axios.get(GET_ALL_PAYSTUB_API_URL);
  }

  createPaystub(newPaystub) {
    return axios.post(CREATE_NEW_PAYSTUB_API_URL, newPaystub);
  }

  getPaystubByID(paystubID) {
    return axios.get(GET_PAYSTUB_BY_ID_API_URL + paystubID);
  }

  getPaystubByEID(employeeID) {
    return axios.get(GET_PAYSTUB_BY_EID_API_URL + employeeID);
  }

  getPaystubByDateOfPaystub(dateOfPaystub) {
    return axios.get(GET_PAYSTUB_BY_DATE_OF_PAYSTUB_API_URL + dateOfPaystub);
  }
}

export default new PaystubController();
