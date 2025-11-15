import { UserService } from "@/services/UserService";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { SearchUserType } from "@/types/User.types";

export const SearchUser = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 500);
        return () => clearTimeout(handler)
    }, [searchTerm]);

    const { data: results = [], isLoading, isError } = useQuery<SearchUserType[]>({
        queryKey: ["userSearch", debouncedTerm],
        queryFn: () => UserService.fetchUsersBySearch(debouncedTerm),
        enabled: !!debouncedTerm, // don't run query if empty
        staleTime: 60_000, // cache results for a minute
    });

    console.log(results, isLoading, isError);

    return (
        <div className="relative w-96">
            <input type="text"
                placeholder="Search Users...."
                className="w-full p-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {
                isLoading && (
                    <div className="absolute bg-white border w-full p-2 text-gray-500">
                        Searching...
                    </div>
                )
            }

            {
                !isLoading && results.length > 0 && (
                    <ul className="absolute bg-white border w-full mt-1 rounded-md shadow max-h-64 overflow-y-auto">
                        {results.map((user) => (
                            <li
                                key={user.userName}
                                className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => navigate(`/profile/${user.userName}`)}
                            >
                                <img
                                    src={user.imageUrl}
                                    alt={user.userName}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="flex flex-col">
                                    <span className="font-medium text-gray-800">
                                        {user.firstName} {user.lastName}
                                    </span>
                                    <span className="text-sm text-gray-500">@{user.userName}</span>
                                </div>
                                {user.mutualCount > 0 && (
                                    <span className="ml-auto text-xs text-gray-400">
                                        {user.mutualCount} mutual{user.mutualCount > 1 ? "s" : ""}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                )
            }

            {
                !isLoading && debouncedTerm && results.length === 0 && !isError && (
                    <div className="absolute bg-white border w-full p-2 text-gray-500">
                        No users found
                    </div>
                )
            }
            {
                isError && (
                    <div className="absolute bg-white border w-full p-2 text-red-500">
                        Error fetching users
                    </div>
                )
            }
        </div >
    )
}