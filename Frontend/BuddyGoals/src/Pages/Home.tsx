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
        );
    }
    return <></>
}