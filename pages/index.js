import styles from "../styles/Home.module.css";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

const axiosApiCall = (url, method, body = {}) =>
	axios({
		method,
		url: `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
		data: body,
	});

export default function Home() {
	const router = useRouter();

	const onSuccess = (res) => {
		const access_token = res.accessToken;
		axiosApiCall("auth/google", "get", { access_token }).then((res) => {
			const { token } = res.data;
			Cookie.set("token", token);
			router.push("/test");
		});
	};

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<div>
					{console.log(onSuccess.token)}
					<button>
						<GoogleLogin
							clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
							buttonText="Sign In"
							onSuccess={onSuccess}
							onFailure={() => {}}
						/>
					</button>
				</div>
			</main>
		</div>
	);
}
