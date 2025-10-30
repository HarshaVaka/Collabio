import {
    Home as HomeIcon,
    Search as SearchIcon,
    MessageSquare as ChatIcon,
    Users as UsersIcon,
    Settings as SettingsIcon,
    User as UserIcon,
} from "lucide-react";
import { SideNavItem } from "./SideNavItem";
import { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import { UserDetail } from "@/types/User.types";


export function SideNav() {
    const navItems = [
        { icon: <HomeIcon size={20} />, label: "Home", route: "/home" },
        { icon: <SearchIcon size={20} />, label: "Explore", route: "/explore" },
        { icon: <ChatIcon size={20} />, label: "Chats", route: "/chats" },
        { icon: <UsersIcon size={20} />, label: "Community", route: "/community" },
        { icon: <SettingsIcon size={20} />, label: "Settings", route: "/settings" },
        { icon: <UserIcon size={20} />, label: "Profile", route: "/profile" },
    ];
    const [userDetails, setUserDetails] = useState<UserDetail>();
    const { data, isFetching, isError, error } = useUser();
    useEffect(() => {
        if (isError) {
            toast.error(error.message)
        }
    }, [isError, error]);
    useEffect(() => {
        if (data && !isFetching)
            setUserDetails(data);
    }, [data, isFetching]);

    return (
        <aside className="w-56 md:w-64 lg:w-72 bg-gradient-to-r from-emerald-800 to-teal-800 shadow-md flex flex-col justify-between p-4 fixed h-full">
            <div>
                <h1 className="text-2xl font-bold mb-6 text-green-50">Collab.io</h1>
                <nav className="flex flex-col gap-4">
                    {navItems.map((item) => (
                        <SideNavItem key={item.label} {...item} />
                    ))}
                </nav>
            </div>

            {/* Footer Section - Username */}
            <div className="mt-6 border-t border-emerald-600 pt-4 flex items-center gap-3 text-green-50  truncate">
                {
                    userDetails?.profilePicUrl ? (
                        <img src={userDetails.profilePicUrl} alt="" className="w-10 h-10 rounded-full"/>
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center font-semibold text-lg">
                            {userDetails?.userName?.[0]?.toUpperCase() || "U"}
                        </div>
                    )
                }
                <div className="flex flex-col">
                    <span className="text-lg font-medium truncate" title={userDetails?.userName}>{userDetails?.userName || "User"}</span>
                    <span className="text-lg font-medium truncate" title={userDetails?.email}>{userDetails?.email}</span>
                </div>

            </div>
        </aside>

    );
}