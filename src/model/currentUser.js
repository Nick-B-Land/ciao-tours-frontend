//for testing I hard coded values, should not exist in live
export let CurrentUser = {
	employeeID: 16,
	username: "empTest",
	roles: ["ROLE_EMPLOYEE"],
};

CurrentUser.Set = (eID, username, roles) => {
	CurrentUser.employeeID = eID;
	CurrentUser.username = username;
	CurrentUser.roles = roles;
};

CurrentUser.Clear = () => {
	CurrentUser.employeeID = "";
	CurrentUser.username = "";
	CurrentUser.roles = [];
};

export default CurrentUser;
