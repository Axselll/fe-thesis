import moment from "moment"
import "moment/locale/id"

export default function CommitsTab({ data }) {
    return (
        <div className="flex flex-col rounded-lg h-full w-full bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-4 relative">
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-gray-800 border-b">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
                                            Commit Title
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
                                            Description
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
                                            Updated Time
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-white px-6 py-4 text-left">
                                            User Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.commited?.map((item) => (
                                        <tr key={item._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {item.title} - <span className="text-gray-500 text-xs">{
                                                    item.file.slice(6)
                                                }</span>
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {item.desc}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {moment(item.updatedAt).format('LL')}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <details className="flex flex-col justify-center text-gray-900 text-xl font-medium mb-2 cursor-pointer">
                                                    <summary className="text-base cursor-pointer">Click to expand</summary>
                                                    <div className="text-sm mb-1 pl-4 text-gray-500 px-px hover:text-gray-700 transition ease-out duration-200 cursor-pointer">Edit</div>
                                                    <div className="text-sm mb-1 pl-4 text-gray-500 px-px hover:text-gray-700 transition ease-out duration-200 cursor-pointer">Delete</div>
                                                    <div className="text-sm mb-1 pl-4 text-gray-500 px-px hover:text-gray-700 transition ease-out duration-200 cursor-pointer">Download</div>
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
    )
}
