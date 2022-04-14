import axios from "axios";

const LOGIN_API_URL = "http://localhost:8080/api/auth/signin";
const LOGOUT_API_URL = "http://localhost:8080/api/auth/signout";

/**
 * Controller for logging in to system
 */
class LoginController {
	login(username, password) {
		return fetch(LOGIN_API_URL, {
			credentials: "include",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"Access-Control-Allow-Credentials": "true",
			},
			method: "POST",
			body: JSON.stringify({ username: username, password: password }),
		});
	}

	logout() {
		return axios.post(LOGOUT_API_URL);
	}
}

export default new LoginController();
