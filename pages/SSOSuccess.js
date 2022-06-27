import { useEffect } from "react";

function SSOSuccess() {
	useEffect(() => {
		setTimeout(() => {
			window.close();
		}, 1000);
	}, []);

	return <div></div>;
}

export default SSOSuccess;
