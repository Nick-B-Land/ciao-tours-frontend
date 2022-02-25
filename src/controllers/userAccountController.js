import axios from "axios";

const CREATE_NEW_USER_ACCOUNT_API_URL = "http://localhost:8080/api/auth/signup";

class UserAccountController {
	createUserAccount(newUserAccount) {
		return axios.post(CREATE_NEW_USER_ACCOUNT_API_URL, newUserAccount);
	}
}

export default new UserAccountController();
