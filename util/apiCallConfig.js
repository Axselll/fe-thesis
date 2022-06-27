import Cookies from "js-cookie";

const access_token = Cookies.get("access_token");

const config = {
	headers: {
		Authorization: `Bearer ${access_token}`,
	},
};

export { access_token, config };
