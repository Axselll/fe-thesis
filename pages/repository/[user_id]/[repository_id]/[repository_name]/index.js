import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';
import axios from 'axios';
import Image from "next/image";
import bg from '../../../../../public/bg.jpg'
import { config, access_token } from "../../../../../util/apiCallConfig";
import NotAuthorized from '../../../../../components/NotAuthorized';
import CommitsTab from '../../../../../components/CommitsTab';
import ReviewTab from '../../../../../components/ReviewTab'
import SIgnOut from '../../../../../components/Singout';

export default function commit() {
    const router = useRouter()
    const [data, setData] = useState({});
    const { user_id, repository_id, repository_name } = router.query

    useEffect(() => {
        if (!access_token) return;
        const fetchData = async () => {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/repository/${user_id}/${repository_id}`,
                config
            );
            setData(response.data.response.repository[0]);
            // console.log(response.data.response.repository);
        };
        fetchData();
    }, []);


    return (
        <>
            {access_token ? (
                <div className="w-full h-screen flex flex-col justify-center items-center">
                    <Image className="opacity-20 blur-sm"
                        src={bg}
                        layout="fill"
                        objectFit="cover"
                        placeholder="blur"
                    />
                    <header className="p-10 w-full flex flex-row justify-between relative">
                        <p className="p-2 cursor-default w-80">You are on {repository_name} repository</p>
                        <SIgnOut />
                    </header>
                    <Tabs className="w-full h-screen flex flex-col justify-start items-center p-8 relative">
                        <TabList className="flex flex-row p-3 self-start">
                            <Tab className="m-2 text-gray-600 border-b-2 border-transparent hover:text-black hover:border-black transition ease-out duration-200 cursor-pointer outline-none">Commits</Tab>
                            <Tab className="m-2 text-gray-600 border-b-2 border-transparent hover:text-black hover:border-black transition ease-out duration-200 cursor-pointer outline-none">Review</Tab>
                        </TabList>
                        <TabPanel className="flex justify-center items-center w-full h-full">
                            <CommitsTab data={data} />
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
    )
}

export async function getServerSideProps(context) {
    return {
        props: {},
    };
}