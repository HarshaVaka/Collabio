import { useForm } from "react-hook-form"
import { useLogin } from "../../hooks/useUser";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

type LoginFormInputs = {
    email: string;
    password: string;
}

type Props = {
    onGoogleSignIn?: () => void; // callback for Google sign-in
};
export function Login({ onGoogleSignIn }: Props) {
    const { mutate: login, isError, error } = useLogin();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormInputs>();

    const handleLogin = (formData: LoginFormInputs) => {
        login(formData);
    }
    useEffect(() => {
        if (isError) {
            toast.error(error.message || "Login failed");
        }
    }, [isError, error])
    return (
        <div className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-xl">
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-md font-bold text-green-900">Email</label>
                    <input
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-md font-bold text-green-900">Password</label>
                    <input
                        type="password"
                        {...register("password", { required: "Password is required" })}
                        className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-br from-green-600 to-lime-600 
                   hover:from-teal-600 hover:to-cyan-600 
                   text-white font-semibold py-2 px-4 rounded-md cursor-pointer 
                   transition-all duration-200">
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>
            </form>
            {/* Divider */}
            <div className="flex items-center my-4">
                <hr className="flex-1 border-gray-300" />
                <span className="mx-2 text-gray-400 text-sm">or</span>
                <hr className="flex-1 border-gray-300" />
            </div>

            {/* Google Sign-In Button */}
            <button
                type="button"
                onClick={onGoogleSignIn}
                className="w-full flex items-center justify-center border border-emerald-300 rounded-md py-2 px-4 hover:bg-lime-100"
            >
                <img
                    src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="Google Logo"
                    className="w-5 h-5 mr-2"
                />
                Sign in with Google
            </button>
            <div className="flex justify-center mt-4">
                <Link
                    to="../register"
                    className="text-green-500 hover:text-green-700 underline transition-colors duration-200"
                >
                    Don’t have an account? Sign up
                </Link>
            </div>


        </div>
    );
}

