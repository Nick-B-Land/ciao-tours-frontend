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

// this might work for setting cookie
// fetch('http://localhost:8080/only-already-authenticated-users', {
//       method: "GET",
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//     })

export default new LoginController();
