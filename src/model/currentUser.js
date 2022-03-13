//for testing I hard coded values, should not exist in live
export let CurrentUser = {
	eID: 0,
	username: "",
	roles: [],
	uID: 0,
};

CurrentUser.Set = () => {
	if (sessionStorage.getItem("userSession")) {
		let user = JSON.parse(sessionStorage.getItem("userSession"));

		CurrentUser.eID = user.eID;
		CurrentUser.username = user.username;
		CurrentUser.roles = user.roles;
		CurrentUser.uID = user.uID;
	}
};

CurrentUser.Clear = () => {
	sessionStorage.removeItem("userSession");
};

export default CurrentUser;
