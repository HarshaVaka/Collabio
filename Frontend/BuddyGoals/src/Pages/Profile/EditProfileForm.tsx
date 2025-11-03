import { useForm } from "react-hook-form";
import * as Dialog from "@radix-ui/react-dialog";

export default function EditProfileForm() {
  type editProfileInputForm = {
    FirstName: string;
    LastName: string;
    Bio: string;
    DOB: Date;
    Gender: string;
    phoneNumber: string;
    Country: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<editProfileInputForm>();
  function onSubmit(formData: editProfileInputForm) {
    console.log(formData);
  }
  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 m-4">
        <div>
          <label
            htmlFor="FirstName"
            className="block text-md font-bold text-green-900"
          >
            <span className="text-red-900">*</span>First Name{" "}
          </label>
          <input
            {...register("FirstName", { required: "First Name is required" })}
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
          {errors.FirstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.FirstName.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="LastName"
            className="block text-md font-bold text-green-900"
          >
            <span className="text-red-900">*</span>Last Name{" "}
          </label>
          <input
            {...register("LastName", { required: "Last Name is required" })}
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
          {errors.LastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.LastName.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="Bio"
            className="block text-md font-bold text-green-900"
          >
            <span className="text-red-900">*</span>Bio{" "}
          </label>
          <textarea
            {...register("Bio", { required: "Bio is required" })}
            rows={4}
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
          {errors.Bio && (
            <p className="text-red-500 text-sm mt-1">{errors.Bio.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="DOB"
            className="block text-md font-bold text-green-900"
          >
            <span className="text-red-900">*</span>
            Date Of Birth{" "}
          </label>
          <input
            {...register("DOB", { required: "Date of Birth is required." })}
            type="date"
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
          {errors.DOB && (
            <p className="text-red-500 text-sm mt-1">{errors.DOB.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="Gender"
            className="block text-md font-bold text-green-900"
          >
            <span className="text-red-900">*</span>
            Gender{" "}
          </label>
          <select
            id="Gender"
            {...register("Gender", { required: "Gender is rquired" })}
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          >
            <option value="">Select Option</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
          {errors.Gender && (
            <p className="text-red-500 text-sm mt-1">{errors.Gender.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-md font-bold text-green-900"
          >
            <span className="text-red-900">*</span>
            Phone Number{" "}
          </label>
          <input
            {...register("phoneNumber", {
              required: "Phone Number is required",
              pattern: {
                value: /^[1-9][0-9]{9}$/,
                message: "Enter a valid 10 digit phone number",
              },
            })}
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="Country"
            className="block text-md font-bold text-green-900"
          >
            <span className="text-red-900">*</span>
            Country{" "}
          </label>
          <input
            {...register("Country", { required: "Country is required" })}
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
          {errors.Country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.Country.message}
            </p>
          )}
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="submit"
            className="bg-gradient-to-br from-green-600 to-lime-600 
                   hover:from-lime-800 hover:to-green-800 
                   text-white font-semibold py-2 px-4 rounded-md cursor-pointer 
                   transition-all duration-200"
          >
            Save
          </button>
          <Dialog.Close asChild>
            <button
              className=" bg-gradient-to-br from-emerald-100 to-green-200
                           hover:from-emerald-400 hover:to-lime-100
                           text-green-900 font-semibold py-2 px-4 rounded-md cursor-pointer 
                           transition-all duration-200"
            >
              Close
            </button>
          </Dialog.Close>
        </div>
      </form>
    </div>
  );
}
