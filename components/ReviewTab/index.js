import moment from "moment"
import "moment/locale/id"

export default function ReviewTab({ data }) {
    return (
        <div className="flex flex-row rounded-lg h-full w-full bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-4 items-center">
            {data?.commited?.map((item) => (
                <ol className="border-l md:border-l-0 md:border-t border-gray-300 md:flex md:justify-center md:gap-6">
                    <li>
                        <div className="flex md:block flex-start items-center pt-2 md:pt-0">
                            <div className="bg-gray-300 w-2 h-2 rounded-full -ml-1 md:ml-0 mr-3 md:mr-0 md:-mt-1"></div>
                            <p className="text-gray-500 text-sm mt-2 mr-5">Created on {moment(item.createdAt).format('LL')}</p>
                        </div>
                        <div className="mt-0.5 ml-4 md:ml-0 pb-5">
                            <h4 className="text-gray-800 font-semibold text-xl mb-1.5 mr-5">{item.title}</h4>
                            {/* <p className="text-gray-500 mb-3">{item.desc}</p> */}
                        </div>
                    </li>
                </ol>
            ))}
        </div>
    )
}
