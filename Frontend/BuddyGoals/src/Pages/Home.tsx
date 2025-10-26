import { useQuery } from "@tanstack/react-query";
import { HomeService } from "../services/HomeService";
import { useEffect } from "react";
import {
    Home as HomeIcon,
    Search as SeachIcon,
    MessageSquare as ChatIcon,
    Users as UsersIcon,
    Settings as SettingsIcon,
    User as UserIcon,
} from "lucide-react";

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
                <aside className="w-48 sm:w-56 md:w-64 lg:w-72 bg-gradient-to-r from-emerald-800 to-teal-800 shadow-md flex flex-col p-4 fixed h-full ">
                    <h1 className="text-2xl font-bold mb-6 bg-gradient-to-br from text-green-50">Collab.io</h1>
                    <nav className="flex flex-col gap-4">
                        <a href="#" className="flex flex-row text-green-50 hover:text-green-950 font-medium text-xl shadow-lg border border-green-100 rounded-2xl p-3 bg-gradient-to-r from-emerald-600 to-teal-600"><HomeIcon size={20} /> <span className="ps-3">Home</span></a>
                        <a href="#" className="flex flex-row text-green-50 hover:text-green-950 font-medium text-xl shadow-lg border border-green-100 rounded-2xl p-3 bg-gradient-to-r from-emerald-600 to-teal-600"><SeachIcon size={20} /> <span className="ps-3">Explore</span></a>
                        <a href="#" className="flex flex-row text-green-50 hover:text-green-950 font-medium text-xl shadow-lg border border-green-100 rounded-2xl p-3 bg-gradient-to-r from-emerald-600 to-teal-600"><ChatIcon size={20} /><span className="ps-3">Chats</span></a>
                        <a href="#" className="flex flex-row text-green-50 hover:text-green-950 font-medium text-xl shadow-lg border border-green-100 rounded-2xl p-3 bg-gradient-to-r from-emerald-600 to-teal-600"><UsersIcon size={20} /> <span className="ps-3">Groups & Events</span></a>
                        <a href="#" className="flex flex-row text-green-50 hover:text-green-950 font-medium text-xl shadow-lg border border-green-100 rounded-2xl p-3 bg-gradient-to-r from-emerald-600 to-teal-600"><SettingsIcon size={20} /> <span className="ps-3">Settings</span></a>
                        <a href="#" className="flex flex-row text-green-50 hover:text-green-950 font-medium text-xl shadow-lg border border-green-100 rounded-2xl p-3 bg-gradient-to-r from-emerald-600 to-teal-600"><UserIcon size={20} /> <span className="ps-3">Profile</span></a>
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