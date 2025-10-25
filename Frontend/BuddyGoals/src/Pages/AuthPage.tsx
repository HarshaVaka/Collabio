import { Outlet } from "react-router-dom";
import connectUp from '../assets/Connect_up.png';

export default function AuthPage() {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-950 to-green-900 px-4 shadow-lg space-y-6">
            <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-6xl min-h-[600px]">
                {/* Left Image Section */}
                <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-transparent">
                    <img
                        src={connectUp}
                        alt="Connect Up"
                        className="w-4/5 h-auto object-cover"
                    />
                </div>

                {/* Right Content Section */}
                <div className="w-full lg:w-1/2 flex items-center justify-center bg-transparent p-12">
                    <div className="w-full max-w-lg">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>

    );

}