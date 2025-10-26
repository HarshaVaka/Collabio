import { JSX } from "react";
import { NavLink } from "react-router-dom";

export function SideNavItem({ icon, label, route }: { icon: JSX.Element, label: string, route: string }) {
    return (
        <NavLink to={route}
            className={({ isActive }) =>
                `flex items-center text-green-50 font-medium text-xl shadow-lg border border-green-100 rounded-2xl p-3 bg-gradient-to-r from-emerald-600 to-teal-600
        hover:text-green-950 transition-all duration-200 ${isActive ? "ring-2 ring-lime-400" : ""
                }`}>  {icon}
            <span className="ps-3">{label}</span>
        </NavLink >
    );

}