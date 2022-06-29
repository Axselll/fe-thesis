import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useRef } from "react";
import NotAuthorized from "../../../../../components/NotAuthorized";
import { access_token, changeConfig } from "../../../../../util/apiCallConfig";
import axios from "axios";
import bg from "../../../../../public/bg.jpg";
import toast, { Toaster } from "react-hot-toast";

export default function Add({ commitData }) {
	const useNav = useRouter();
	const useReference = useRef();
	const [data, setData] = useState({
		title: "",
		desc: "",
	});
	const [file, setFile] = useState("");
	const [fileData, setFileData] = useState("");

	const handleFileChange = (e) => {
		const allowedFileType = ["docx", "doc", "pdf"];
		const fileName = e.target.files[0]?.name;
		const fileData = e.target.files[0];
		const splitExtension = fileName.split(".").pop();

		if (!allowedFileType.includes(splitExtension)) {
			toast.error("File type must be pdf/docx", { position: "bottom-center" });
			setFile("");
			setFileData("");
			useReference.current.value = "";
			return;
		}
		setFile(fileName);
		setFileData(fileData);
	};

	const handleChange = ({ target: { name, value } }) => {
		setData({ ...data, [name]: value });
	};

	const add = async (e) => {
		e.preventDefault();
		try {
			const body = new FormData();
			body.append("title", data.title);
			body.append("desc", data.desc);
			body.append("file", fileData, file);

			await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/commit/${commitData.user_id}/${commitData.repository_id}`,
				body,
				changeConfig
			);
			toast.success("New Commit Created", { position: "bottom-center" });
			setTimeout(() => {
				useNav.back();
			}, 2000);
		} catch (error) {
			toast.error(error, { position: "bottom-center" });
		}
	};

	return (
		<>
			{access_token ? (
				<div className="flex justify-center items-center h-screen w-full">
					<Image
						className="opacity-20 blur-sm"
						src={bg}
						layout="fill"
						objectFit="cover"
						placeholder="blur"
						alt="bg"
					/>
					<div className="flex rounded-lg bg-white bg-opacity-30 backdrop-filter backdrop-blur-xl p-4 justify-center items-center">
						<form onSubmit={add} encType="multipart/form-data">
							<div>
								<label
									htmlFor="floatingTitle"
									className="form-label inline-block mb-2 text-gray-700 text-xl">
									Commit Title
								</label>
								<input
									className="form-control
							block
							w-full
							px-4
							py-2
							text-xl
							font-normal
							text-gray-700
							bg-white bg-clip-padding
							border border-solid border-gray-300
							rounded
							transition
							ease-in-out
							m-0
							focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									id="floatingTitle"
									required
									type="text"
									value={data.title}
									name="title"
									onChange={handleChange}
								/>
							</div>
							<div>
								<label
									htmlFor="floatingDesc"
									className="form-label inline-block mb-2 text-gray-700 text-xl">
									Commit Description
								</label>
								<input
									className="form-control
							block
							w-full
							px-4
							py-2
							text-xl
							font-normal
							text-gray-700
							bg-white bg-clip-padding
							border border-solid border-gray-300
							rounded
							transition
							ease-in-out
							m-0
							focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									autoComplete="off"
									id="floatingDesc"
									required
									type="text"
									value={data.desc}
									name="desc"
									onChange={handleChange}
								/>
							</div>
							<div className="mb-3 w-96">
								<label
									htmlFor="floatingFile"
									className="form-label inline-block mb-2 text-gray-700 text-xl">
									Choose Your File
								</label>
								<input
									className="form-control
								block
								w-full
								px-2
								py-1.5
								text-xl
								font-normal
								text-gray-700
								bg-white bg-clip-padding
								border border-solid border-gray-300
								rounded
								transition
								ease-in-out
								m-0
								focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									autoComplete="off"
									id="floatingFile"
									required
									name="file"
									accept="*"
									type="file"
									onChange={handleFileChange}
									ref={useReference}
								/>
							</div>
							<div className="flex space-x-2 justify-center">
								<button
									type="submit"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light"
									className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out -mr-72 -ml-5">
									Save Data
								</button>
							</div>
						</form>
					</div>
					<Toaster />
				</div>
			) : (
				<NotAuthorized />
			)}
		</>
	);
}

export async function getServerSideProps(context) {
	const { user_id, repository_id } = context.query;
	// console.log(context.query);
	return {
		props: {
			commitData: {
				user_id,
				repository_id,
			},
		},
	};
}
