import axios from "axios";

export const ajaxCall = (url, method, body = {}) =>
	axios({
		method,
		url: `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
		data: body,
	});
