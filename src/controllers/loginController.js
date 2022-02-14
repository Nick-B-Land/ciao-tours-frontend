import axios from "axios";

const LOGIN_API_URL = "http://localhost:8080/api/auth/signin";
const LOGOUT_API_URL = "http://localhost:8080/api/auth/signout";

class LoginController {
	login(username, password) {
		return axios.post(LOGIN_API_URL, {
			username: username,
			password: password,
		});
	}

	logout() {
		return axios.post(LOGOUT_API_URL);
	}
}

export default new LoginController();
