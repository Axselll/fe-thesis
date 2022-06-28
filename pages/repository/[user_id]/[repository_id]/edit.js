import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { config, access_token } from "../../../../util/apiCallConfig";
import NotAuthorized from "../../../../components/NotAuthorized";

export default function add({ user_id, repository_id, repoData }) {
    const router = useRouter();
    const [data, setData] = useState({
        name: repoData.repository_name,
        desc: repoData.repository_desc
    });

    const handleChange = ({ target: { name, value } }) => {
        setData({ ...data, [name]: value })
    }

    const addNewRepository = async (e) => {
        e.preventDefault();

        await axios
            .patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/repository/${user_id}/${repository_id}`, data, config)
            .then(() => router.push("/repository"))
            .catch((err) => console.log(err));
    }

    return (
        <>
            {access_token ? (
                <div>
                    <form onSubmit={addNewRepository}>
                        <div>
                            <label>Repository name</label>
                            <input
                                required
                                type="text"
                                value={data.name}
                                name="name"
                                onChange={handleChange}
                                placeholder="Insert repository name"
                            />
                        </div>
                        <div>
                            <label>Repository description</label>
                            <input
                                required
                                type="text"
                                value={data.desc}
                                name="desc"
                                onChange={handleChange}
                                placeholder="Insert repository description"
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
    const { user_id, repository_id, repository_name, repository_desc } = context.query;
    console.log(context.query);

    return {
        props: {
            user_id,
            repository_id,
            repoData: { repository_name, repository_desc }
        },
    };
}
