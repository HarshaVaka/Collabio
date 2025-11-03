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
  const { register, handleSubmit } = useForm<editProfileInputForm>();
  function onSubmit() {
    console.log("Hi");
  }
  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 m-4">
        <div>
          <label
            htmlFor="FirstName"
            className="block text-md font-bold text-green-900"
          >
            First Name{" "}
          </label>
          <input
            {...register("FirstName")}
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
        </div>
        <div>
          <label
            htmlFor="LastName"
            className="block text-md font-bold text-green-900"
          >
            Last Name{" "}
          </label>
          <input
            {...register("LastName")}
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
        </div>
        <div>
          <label
            htmlFor="Bio"
            className="block text-md font-bold text-green-900"
          >
            Bio{" "}
          </label>
          <textarea
            {...register("Bio")}
            rows={4}
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
        </div>
        <div>
          <label
            htmlFor="DOB"
            className="block text-md font-bold text-green-900"
          >
            DOB{" "}
          </label>
          <input
            {...register("DOB")}
            type="date"
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
        </div>
        <div>
          <label
            htmlFor="Gender"
            className="block text-md font-bold text-green-900"
          >
            Gender{" "}
          </label>
          <select
            id="Gender"
            {...register("Gender")}
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          >
            <option value="">Select Option</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-md font-bold text-green-900"
          >
            Phone Number{" "}
          </label>
          <input
            {...register("phoneNumber")}
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
        </div>
        <div>
          <label
            htmlFor="Country"
            className="block text-md font-bold text-green-900"
          >
            Country{" "}
          </label>
          <input
            {...register("Country")}
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
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
