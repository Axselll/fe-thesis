import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { store } from "../../app/store";
import { config, access_token } from "../../util/apiCallConfig";
import Link from "next/link";
import Image from "next/image";
import bg from "../../public/bg.jpg";
import moment from "moment";
import "moment/locale/id";
import SIgnOut from "../../components/SingOut";
import NotAuthorized from "../../components/NotAuthorized";
import Cookies from "js-cookie";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Repository() {
	const useUser = useSelector((state) => state.app.authUser);
	const useNav = useRouter();
	const [data, setData] = useState({});

	useEffect(() => {
		if (!access_token) return;
		const fetchData = async () => {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${
					useUser && useUser.loggedInUser._id
				}`,
				config
			);
			setData(response.data);
		};
		fetchData();
	}, [useUser]);

	const fetchDataAfterDelete = async () => {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${
				useUser && useUser.loggedInUser._id
			}`,
			config
		);
		setData(response.data);
	};

	const handleDelete = async (id) => {
		try {
			await axios.delete(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/repository/${
					useUser && useUser.loggedInUser._id
				}/${id}`,
				config
			);
			toast.success("a Repository Deleted", { position: "bottom-center" });
			fetchDataAfterDelete();
		} catch (error) {
			toast.error(error, { position: "bottom-center" });
		}
	};

	return (
		<>
			{access_token ? (
				<div className="w-full h-screen flex flex-col justify-center items-center relative">
					<Image
						className="opacity-10 blur-sm"
						src={bg}
						layout="fill"
						objectFit="cover"
						placeholder="blur"
						alt="bg"
					/>
					<header className="p-10 w-full flex flex-row justify-between relative">
						<p className="p-2 cursor-default w-80">
							{" "}
							Hi {data?.firstName} {data?.lastName}, are ya winnin son?
						</p>
						<SIgnOut />
					</header>
					<section className="pl-6 w-11/12 items-center relative">
						<div className="cursor-pointer w-36">
							<Link
								href={{
									pathname: `/repository/[user_id]/add`,
									query: {
										user_id: data._id,
									},
								}}
								as={`repository/${data._id}/add`}>
								<a className="bg-lime-600 w-36 text-center p-1 rounded text-white hover:bg-lime-700 transition ease-out duration-300">
									New Repository
								</a>
							</Link>
						</div>
					</section>
					<main className="w-full h-screen flex flex-col justify-start items-center p-5 relative">
						{data?.repository?.map((item) => (
							<div
								key={item._id}
								className="flex flex-col rounded-lg h-34 w-11/12 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg p-5">
								<div className="p-6 flex flex-col justify-center">
									<details className="flex flex-col justify-center text-gray-900 text-xl font-medium mb-2 cursor-default">
										<summary className="flex flex-row items-center justify-between text-2xl cursor-pointer">
											{item.name}
											<p className="text-gray-400 text-xs cursor-default">
												Updated on {moment(item.updatedAt).format("LLLL")}
											</p>
										</summary>
										<div className="flex flex-row w-auto pt-8 justify-between">
											<p className="text-gray-500 text-sm cursor-default">
												{item.desc}
											</p>
											<div className="flex flex-row">
												<Link
													href={{
														pathname: `/repository/[user_id]/[repository_id]/[repository_name]`,
														query: {
															user_id: data._id,
															repository_id: item._id,
															repository_name: item.name,
														},
													}}
													as={`repository/${data._id}/${item._id}/${item.name}`}>
													<div className="text-sm ml-2 text-gray-500 px-px border-b-2 border-white hover:text-gray-700 hover:border-black transition ease-out duration-200 cursor-pointer">
														Open
													</div>
												</Link>
												<Link
													href={{
														pathname: `/repository/[user_id]/[repository_id]/edit`,
														query: {
															user_id: data._id,
															repository_id: item._id,
															repository_name: item.name,
															repository_desc: item.desc,
														},
													}}
													as={`repository/${data._id}/${item._id}/edit`}>
													<div className="text-sm ml-2 text-gray-500 px-px border-b-2 border-white hover:text-gray-700 hover:border-black transition ease-out duration-200 cursor-pointer">
														Edit
													</div>
												</Link>
												<div
													onClick={() => handleDelete(item._id)}
													className="text-sm ml-2 text-gray-500 px-px border-b-2 border-white hover:text-gray-700 hover:border-black transition ease-out duration-200 cursor-pointer">
													Delete
												</div>
											</div>
										</div>
									</details>
								</div>
							</div>
						))}
					</main>
					<Toaster />
				</div>
			) : (
				<NotAuthorized />
			)}
		</>
	);
}
