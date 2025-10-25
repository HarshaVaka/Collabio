import { useQuery } from "@tanstack/react-query";
import { HomeService } from "../services/HomeService";
import { useEffect } from "react";

export default function Home() {
    const { data, isFetching, isError, error, isSuccess } = useQuery({
        queryKey: ["checkAuth"],
        queryFn: () => HomeService.checkAuth(),
        staleTime: Infinity,
    });

    useEffect(() => {
        console.log({ data, isFetching, isError, isSuccess, error });
    }, [data, isFetching, isError, isSuccess, error]);


    if (isError) return <div>Error occurred. Please try again.</div>
    if (isSuccess) {
        return (
            <div className="flex h-screen bg-gradient-to-br from-lime-50 via-lime-100 to-teal-100">
                {/* Left Sidebar */}
                <aside className="w-100 bg-gradient-to-b from-lime-700 to-lime-700 shadow-md flex flex-col p-4 fixed h-full ">
                    <h1 className="text-2xl font-bold mb-6 text-green-50">MyApp</h1>
                    <nav className="flex flex-col gap-4">
                        <a href="#" className="text-green-50 hover:text-green-950 font-medium text-xl">Home</a>
                        <a href="#" className="text-green-50 hover:text-green-950 font-medium text-xl">Dashboard</a>
                        <a href="#" className="text-green-50 hover:text-green-950 font-medium text-xl">Settings</a>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 ml-100 p-6 overflow-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Left two vertical divs for scope groups & events */}
                        <div className="md:col-span-2 space-y-6">
                            {/* Scope Groups */}
                            <div className="bg-white rounded-lg shadow p-4">
                                <h2 className="text-lg font-bold mb-4">Scope Groups</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Example cards */}
                                    <div className="bg-green-100 rounded-md p-4 shadow">Group 1</div>
                                    <div className="bg-green-100 rounded-md p-4 shadow">Group 2</div>
                                    <div className="bg-green-100 rounded-md p-4 shadow">Group 3</div>
                                </div>
                            </div>

                            {/* Events */}
                            <div className="bg-white rounded-lg shadow p-4">
                                <h2 className="text-lg font-bold mb-4">Events</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Example cards */}
                                    <div className="bg-blue-100 rounded-md p-4 shadow">Event 1</div>
                                    <div className="bg-blue-100 rounded-md p-4 shadow">Event 2</div>
                                    <div className="bg-blue-100 rounded-md p-4 shadow">Event 3</div>
                                </div>
                            </div>
                        </div>

                        {/* Right column for Todos */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg shadow p-4">
                                <h2 className="text-lg font-bold mb-4">Todos</h2>
                                <ul className="space-y-2">
                                    <li className="p-2 bg-yellow-100 rounded-md">Todo 1</li>
                                    <li className="p-2 bg-yellow-100 rounded-md">Todo 2</li>
                                    <li className="p-2 bg-yellow-100 rounded-md">Todo 3</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
    return <></>
}