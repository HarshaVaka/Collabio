import { Outlet } from "react-router-dom";
import { SideNav } from "./SideNav";

export function MainLayout() {
    return (
        <div className="flex h-screen bg-gradient-to-br from-lime-50 via-lime-100 to-teal-100">
            <SideNav />
            <main className="flex-1 ml-100 p-6 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}
