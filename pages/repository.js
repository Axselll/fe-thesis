import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { ajaxCall } from "../util/apiCall";
import { useSelector } from "react-redux";

export default function repository() {
	const user = useSelector((state) => state.app.authUser);
	const router = useRouter();

	const onSuccess = (res) => {
		// const access_token = res.accessToken;
		ajaxCall("/auth/user", "get", {}).then((res) => {
			// const { token } = res.data;
			// Cookie.set("token", token);
			console.log(res.data);
		});
	};

	return (
		<div>
			<button onClick={onSuccess}>click me</button>
			<span> .. ... .. </span>
			<p>hi {user && user.loggedInUser.firstName}</p>
		</div>
	);
}
