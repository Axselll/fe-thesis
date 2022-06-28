import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Tab, TabList, Tabs, TabPanel } from "react-tabs";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import bg from "../../../../../public/bg.jpg";
import {
	config,
	downloadConfig,
	access_token,
	changeConfig,
} from "../../../../../util/apiCallConfig";
import NotAuthorized from "../../../../../components/NotAuthorized";
import ReviewTab from "../../../../../components/ReviewTab";
import SIgnOut from "../../../../../components/Singout";
import moment from "moment";
import "moment/locale/id";

export default function commit() {
	const router = useRouter();
	const [data, setData] = useState({});
	const { user_id, repository_id, repository_name } = router.query;

	useEffect(() => {
		if (!access_token) return;
		fetchData();
	}, []);

	const fetchData = async () => {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/repository/${user_id}/${repository_id}`,
			config
		);
		setData(response.data.response.repository[0]);
	};

	const handleDelete = async (user_id, repository_id, commited_id, file) => {
		try {
			await axios.delete(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/commit/${user_id}/${repository_id}/${commited_id}/${file}`,
				config
			);
			await fetchData();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			{access_token ? (
				<div className="w-full h-screen flex flex-col justify-center items-center relative">
					<Image
						className="opacity-20 blur-sm"
						src={bg}
						layout="fill"
						objectFit="cover"
						placeholder="blur"
					/>
					<header className="p-10 w-full flex flex-row justify-between relative">
						<p className="p-2 cursor-default w-80">
							You are on {repository_name} repository
						</p>
						<SIgnOut />
					</header>
					<Tabs className="w-full h-screen flex flex-col justify-start items-center p-8 relative">
						<TabList className="flex flex-row p-3 self-start">
							<Tab className="m-2 text-gray-600 border-b-2 border-transparent hover:text-black hover:border-black transition ease-out duration-200 cursor-pointer outline-none">
								Commits
							</Tab>
							<Tab className="m-2 text-gray-600 border-b-2 border-transparent hover:text-black hover:border-black transition ease-out duration-200 cursor-pointer outline-none">
								Review
							</Tab>
							<section className="pl-6 w-11/12 items-center relative self-center">
								<div
									onClick={() =>
										router.push({
											pathname: `/repository/[user_id]/[repository_id]/[repository_name]/add`,
											query: {
												user_id: user_id,
												repository_id: repository_id,
												repository_name: repository_name,
											},
										})
									}
									className="cursor-pointer w-36">
									<a className="bg-lime-600 w-36 text-center p-1 rounded text-white hover:bg-lime-700 transition ease-out duration-300">
										New Repository
									</a>
								</div>
							</section>
						</TabList>
						<TabPanel className="flex justify-center items-center w-full h-full">
							<div className="flex flex-col rounded-lg h-full w-full bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-4 relative">
								<div className="flex flex-col">
									<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
										<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
											<div className="overflow-hidden">
												<table className="min-w-full">
													<thead className="bg-gray-800 border-b">
														<tr>
															<th
																scope="col"
																className="text-sm font-medium text-white px-6 py-4 text-left">
																Commit Title
															</th>
															<th
																scope="col"
																className="text-sm font-medium text-white px-6 py-4 text-left">
																Description
															</th>
															<th
																scope="col"
																className="text-sm font-medium text-white px-6 py-4 text-left">
																Updated Time
															</th>
															<th
																scope="col"
																className="text-sm font-medium text-white px-6 py-4 text-left">
																User Action
															</th>
														</tr>
													</thead>
													<tbody>
														{data?.commited?.map((item) => (
															<tr
																key={item._id}
																className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
																<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
																	{item.title} -{" "}
																	<span className="text-gray-500 text-xs">
																		{item.file}
																	</span>
																</td>
																<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
																	{item.desc}
																</td>
																<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
																	{moment(item.updatedAt).format("LL")}
																</td>
																<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
																	<details className="flex flex-col justify-center text-gray-900 text-xl font-medium mb-2 cursor-pointer">
																		<summary className="text-base cursor-pointer">
																			Click to expand
																		</summary>
																		<Link
																			href={{
																				pathname: `/repository/[user_id]/[repository_id]/[repository_name]/[commited_id]/edit`,
																				query: {
																					user_id: user_id,
																					repository_id: repository_id,
																					repository_name: repository_name,
																					commited_title: item.title,
																					commited_desc: item.desc,
																					commited_file: item.file,
																					commited_id: item._id,
																				},
																			}}>
																			<div className="text-sm mb-1 pl-4 text-gray-500 px-px hover:text-gray-700 transition ease-out duration-200 cursor-pointer">
																				Edit
																			</div>
																		</Link>
																		<div
																			onClick={() =>
																				handleDelete(
																					user_id,
																					repository_id,
																					item._id,
																					item.file
																				)
																			}
																			className="text-sm mb-1 pl-4 text-gray-500 px-px hover:text-gray-700 transition ease-out duration-200 cursor-pointer">
																			Delete
																		</div>
																		<a
																			href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/commit/${item.file}`}
																			target="_blank"
																			className="text-sm mb-1 pl-4 text-gray-500 px-px hover:text-gray-700 transition ease-out duration-200 cursor-pointer">
																			Download
																		</a>
																	</details>
																</td>
															</tr>
														))}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</TabPanel>
						<TabPanel className="flex justify-center items-center w-full h-full -mt-96">
							<ReviewTab data={data} />
						</TabPanel>
					</Tabs>
				</div>
			) : (
				<NotAuthorized />
			)}
		</>
	);
}

export async function getServerSideProps(context) {
	return {
		props: {},
	};
}
