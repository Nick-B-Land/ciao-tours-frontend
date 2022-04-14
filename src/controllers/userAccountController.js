import axios from "axios";

const CREATE_NEW_USER_ACCOUNT_API_URL = "http://localhost:8080/api/auth/signup";
const RESET_PASSWORD_API_URL = "http://localhost:8080/api/auth/reset-password/";
const GET_USER_BY_EMPLOYEE_ID_API_URL =
	"http://localhost:8080/api/auth/user-by-employee-id/";

/**
 * Controller for accessing database regarding user accounts
 * includes:
 * 	creating a new user
 * 	updating user
 * 	getting user by id
 */
class UserAccountController {
	createUserAccount(newUserAccount) {
		return axios.post(CREATE_NEW_USER_ACCOUNT_API_URL, newUserAccount);
	}

	updateUser(user, userId) {
		return axios.put(RESET_PASSWORD_API_URL + userId, user);
	}

	getUserByEmployeeID(userID) {
		return axios.get(GET_USER_BY_EMPLOYEE_ID_API_URL + userID);
	}
}

export default new UserAccountController();
