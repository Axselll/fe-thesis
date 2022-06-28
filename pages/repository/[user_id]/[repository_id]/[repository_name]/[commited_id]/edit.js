import { useRouter } from "next/router";
import { useState } from "react";
import NotAuthorized from "../../../../../../components/NotAuthorized";
import {
	access_token,
	changeConfig,
} from "../../../../../../util/apiCallConfig";
import axios from "axios";

export default function add({ commitData, displayData }) {
	const router = useRouter();
	const [data, setData] = useState({
		title: displayData.commited_title,
		desc: displayData.commited_desc,
	});
	const [file, setFile] = useState("");
	const [fileData, setFileData] = useState("");

	const handleFileChange = (e) => {
		const allowedFileType = ["docx", "doc", "pdf"];
		const fileName = e.target.files[0].name;
		const fileData = e.target.files[0];
		const splitExtension = fileName.split(".").pop();

		if (!allowedFileType.includes(splitExtension)) {
			console.log("file type not allowed");
			setFile("");
			setFileData("");
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
		const body = new FormData();
		body.append("title", data.title);
		body.append("desc", data.desc);
		if (file && fileData) return body.append("file", fileData, file);

		await axios
			.patch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/commit/${commitData.user_id}/${commitData.repository_id}/${commitData.commited_id}`,
				body,
				changeConfig
			)
			.then(() => router.back())
			.catch((err) => console.error(err));
	};

	return (
		<>
			{access_token ? (
				<div>
					<form onSubmit={add} encType="multipart/form-data">
						<div>
							<label>Commit title</label>
							<input
								type="text"
								value={data.title}
								name="title"
								onChange={handleChange}
								placeholder="Insert commit title"
							/>
						</div>
						<div>
							<label>Commit description</label>
							<input
								type="text"
								value={data.desc}
								name="desc"
								onChange={handleChange}
								placeholder="Insert commit desc"
							/>
						</div>
						<div>
							<label>file</label>
							<input
								name="file"
								accept="*"
								type="file"
								onChange={handleFileChange}
							/>
						</div>
						<button type="submit">Save Data</button>
					</form>
				</div>
			) : (
				<NotAuthorized />
			)}
		</>
	);
}

export async function getServerSideProps(context) {
	const {
		user_id,
		repository_id,
		commited_id,
		commited_title,
		commited_desc,
		commited_file,
	} = context.query;
	console.log(context.query);
	return {
		props: {
			commitData: {
				user_id,
				repository_id,
				commited_id,
			},
			displayData: { commited_title, commited_desc, commited_file },
		},
	};
}
