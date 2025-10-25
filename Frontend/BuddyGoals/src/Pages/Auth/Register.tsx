import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type RegisterFormInputs = {
    email: string;
    fullName: string;
    password: string;
    confirmPassword: string;
}

type Props = {
    onGoogleSignIn?: () => void; // callback for Google sign-in
};
export function Register({ onGoogleSignIn }: Props) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<RegisterFormInputs>();

    const handleRegister = (formData: RegisterFormInputs) => {
        console.log(formData);
    }
    return (
        <div className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-xl ">
            <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-green-700">Email</label>
                    <input type="email"
                        {...register('email', { required: 'Email is required' })}
                        className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"

                    />
                    {
                        errors.email &&
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    }
                </div>
                <div>
                    <label className="block text-sm font-bold text-green-700">Name</label>
                    <input type="text"
                        {...register('fullName', { required: 'Name is required' })}
                        className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"

                    />
                    {
                        errors.fullName &&
                        <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                    }
                </div>
                <div>
                    <label className="block text-sm font-bold text-green-700">Password</label>
                    <input type="password" {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 6, message: 'Password should have min 6 characters' }
                    })}
                        className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"

                    />
                    {
                        errors.password &&
                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    }
                </div>
                <div>
                    <label className="block text-sm font-bold text-green-700">Confirm Password</label>
                    <input type="password" {...register('confirmPassword', {
                        required: "Please confirm your password",
                        validate: (value) =>
                            value === watch("password") || "Passwords do not match",
                    })}
                        className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"

                    />
                    {
                        errors.confirmPassword &&
                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                    }
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-br from-green-600 to-lime-600 
                   hover:from-teal-600 hover:to-cyan-600 
                   text-white font-semibold py-2 px-4 rounded-md cursor-pointer 
                   transition-all duration-200"
                >
                    {isSubmitting ? "Registering..." : "Register"}
                </button>
            </form>
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
                Sign up with Google
            </button>
             <div className="flex justify-center mt-4">
                <Link
                    to="../login"
                    className="text-green-500 hover:text-green-700 underline transition-colors duration-200"
                >
                   Already have an account? Sign in
                </Link>
            </div>
        </div>
    )
}