import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { config, access_token } from "../../../util/apiCallConfig";
import NotAuthorized from "../../../components/NotAuthorized";

export default function add({ user_id }) {
    const router = useRouter();
    const [data, setData] = useState({
        name: "",
        desc: ""
    });

    const handleChange = ({ target: { name, value } }) => {
        setData({ ...data, [name]: value })
    }

    const addNewRepository = async (e) => {
        e.preventDefault();

        await axios
            .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/repository/${user_id}`, data, config)
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
    const { user_id } = context.query;
    // console.log(context.query);

    return {
        props: {
            user_id,
        },
    };
}
