import {
    Home as HomeIcon,
    Search as SearchIcon,
    MessageSquare as ChatIcon,
    Users as UsersIcon,
    Settings as SettingsIcon,
    User as UserIcon,
} from "lucide-react";
import { SideNavItem } from "./SideNavItem";
export function SideNav() {
    const navItems = [
        { icon: <HomeIcon size={20} />, label: "Home", route: "/home" },
        { icon: <SearchIcon size={20} />, label: "Explore", route: "/explore" },
        { icon: <ChatIcon size={20} />, label: "Chats", route: "/chats" },
        { icon: <UsersIcon size={20} />, label: "Community", route: "/community" },
        { icon: <SettingsIcon size={20} />, label: "Settings", route: "/settings" },
        { icon: <UserIcon size={20} />, label: "Profile", route: "/profile" },
    ];

    return (
        <aside className="w-56 md:w-64 lg:w-72 bg-gradient-to-r from-emerald-800 to-teal-800 shadow-md flex flex-col p-4 fixed h-full">
            <h1 className="text-2xl font-bold mb-6 text-green-50">Collab.io</h1>
            <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                    <SideNavItem key={item.label} {...item} />
                ))}
            </nav>
        </aside>
    );
}