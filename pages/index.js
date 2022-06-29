import Image from "next/image";
import logo from "../public/logo-itusdh.png";
import img1 from "../public/hr_06.jpg";
import axios from "axios";
import Cookies from "js-cookie";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useDispatch } from "react-redux";
import { setIsAuthenticated, setAuthUser } from "../app/appSlice";
import { setToken } from "../app/tokenSlice";
import { useRouter } from "next/router";
import { store } from "../app/store";

export default function Home() {
	const dispatch = useDispatch();
	const useNav = useRouter();

	const fetchAuthUser = async () => {
		const response = await axios
			.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user`, {
				withCredentials: true,
			})
			.catch((err) => {
				console.log(err);
				dispatch(setIsAuthenticated(false));
				dispatch(setAuthUser(null));
				dispatch(setToken(null));
				useNav.push("/");
			});

		if (response && response.data) {
			dispatch(setIsAuthenticated(true));
			dispatch(setAuthUser(response.data));
			await dispatch(
				setToken(Cookies.set("access_token", response.data.access_token))
			);
			store.subscribe(setAuthUser);
			useNav.push("/repository");
		}
	};

	const signIn = async () => {
		let timer = null;
		const newWindow = window.open(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`,
			"_blank",
			"width=500,height=600"
		);

		if (newWindow) {
			timer = setInterval(() => {
				if (newWindow.closed) {
					console.log("authenticated");
					fetchAuthUser();
					if (timer) clearInterval(timer);
				}
			}, 500);
		}
	};

	return (
		<div className="flex flex-col w-full h-screen">
			<header className="flex items-center justify-between p-3">
				<Image width={170} height={145} src={logo} alt="logo" />
				<div className="p-7">
					<GoogleLoginButton
						onClick={signIn}
						className="flex items-center justify-center">
						<p className="text-xs">Sign in with google</p>
					</GoogleLoginButton>
				</div>
			</header>
			<main className="flex h-screen items-center justify-around">
				<section className="-mt-24">
					<h1 className="text-4xl font-bold p-2">
						{"We Will Track Your Stuff"}
					</h1>
					<h2 className=" flex flex-col items-end text-sm p-2">
						{"Created for those who can't organize things"}
						<span>because their life is so messed up</span>
					</h2>
				</section>
				<section>
					<Image width={335} height={300} src={img1} alt="hero img" />
				</section>
			</main>
			<footer className="flex justify-center items-center text-sm w-full h-12 bg-slate-600 text-white">
				2022 || CCDFE
			</footer>
		</div>
	);
}
