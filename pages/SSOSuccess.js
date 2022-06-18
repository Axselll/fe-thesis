import { useEffect } from "react";

function SSOSuccess() {
	useEffect(() => {
		setTimeout(() => {
			window.close();
		}, 1000);
	}, []);

	return <div>Thanks for loggin in!</div>;
}

export default SSOSuccess;
