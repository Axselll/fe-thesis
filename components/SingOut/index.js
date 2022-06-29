import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function SignOut() {
	const useNav = useRouter();

	const signOut = async () => {
		await Cookies.remove("access_token");
		useNav.push("/");
	};

	return (
		<div
			onClick={signOut}
			className="p-2 cursor-pointer border rounded-lg hover:bg-black hover:text-white w-15 transition ease-out duration-200">
			Sign out
		</div>
	);
}
