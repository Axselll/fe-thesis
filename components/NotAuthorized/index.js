import Link from "next/link";

export default function NotAuthorized() {
	return (
		<div className="flex flex-col w-full h-screen items-center justify-center">
			<div className="flex flex-row items-center justify-center">
				<h1 className="text-4xl ">{"401 ||  "}</h1>
				<p className="text-4xl text-gray-700 pl-2">Unauthorized</p>
			</div>
			<Link href="/">
				<a className="mt-8 border-b text-gray-500 border-black hover:text-black transition ease-out duration-300">
					{"Go back to Landing Page "}
				</a>
			</Link>
		</div>
	);
}
