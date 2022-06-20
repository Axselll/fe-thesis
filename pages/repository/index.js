import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import axios from "axios";
import { store } from "../../app/store";

export default function repository({ data }) {
	const user = useSelector((state) => state.app.authUser);
	const router = useRouter();

	const onSuccess = (res) => {
		console.log(Cookies.get("access_token"));
	};

	const test = () => {
		console.log(data);
	};

	return (
		<div>
			<button onClick={onSuccess}>click me to check</button>
			<span> .. ... .. </span>
			<button onClick={test}>click me</button>
			<p>hi {user && user.loggedInUser.firstName}</p>
		</div>
	);
}

export async function getServerSideProps(ctx) {
	const data = store.getState();
	// const token = Cookies.get("access_token");
	// const config = {
	// 	headers: {
	// 		Authorization: `Bearer ${token}`,
	// 	},
	// };

	// const response = await axios.get(
	// 	`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${user && user._id}`,
	// 	config
	// );
	// const authorized = response.status != 401;
	return {
		props: {
			data: data,
			// 	data: response.data,
			// authorized,
		},
	};
}
