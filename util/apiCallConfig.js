import Cookies from "js-cookie";

const access_token = Cookies.get("access_token");

const config = {
	headers: {
		Authorization: `Bearer ${access_token}`,
	},
};

const changeConfig = {
	headers: {
		Authorization: `Bearer ${access_token}`,
		"Content-Type": "multipart/form-data",
	},
};

const downloadConfig = {
	headers: {
		Authorization: `Bearer ${access_token}`,
		responseType: "blob"
	},
};

export { access_token, config, changeConfig, downloadConfig };
