import { useForm } from "react-hook-form";
import * as Dialog from "@radix-ui/react-dialog";
import { PatchFormType, UserProfile } from "@/types/User.types";
import { useEffect } from "react";
import { useUpdateProfile } from "@/hooks/useUser";

export default function EditProfileForm({
  profileDetails,
}: {
  profileDetails: UserProfile;
}) {
  type editProfileInputForm = {
    firstName: string;
    lastName: string;
    bio: string;
    dOB: Date;
    gender: string;
    phoneNo: string;
    country: string;
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<editProfileInputForm>({
    mode: "onChange",
  });

  const { mutate: updateProfile, isError, error,isSuccess } = useUpdateProfile();

  function onSubmit(formData: editProfileInputForm) {
    let editedData: PatchFormType = [];
    Object.keys(formData).forEach((key) => {
      const fieldKey = key as keyof editProfileInputForm;
      if (dirtyFields[fieldKey]) {
        editedData.push({
          path: `/${fieldKey}`,
          op: "replace",
          value: formData[fieldKey],
        });
      }
    });
    console.log("Edited Data:", editedData);
    updateProfile(editedData);
  }
  useEffect(() => {
    reset({
      firstName: profileDetails.firstName,
      lastName: profileDetails.lastName,
      bio: profileDetails.bio,
      dOB: profileDetails.dOB,
      gender: profileDetails.gender,
      phoneNo: profileDetails.phoneNo,
      country: profileDetails.country,
    });
  }, [profileDetails]);
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
            {...register("firstName", { required: "First Name is required" })}
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
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
            {...register("lastName", { required: "Last Name is required" })}
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
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
            {...register("bio", { required: "Bio is required" })}
            rows={4}
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
          {errors.bio && (
            <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
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
            {...register("dOB", { required: "Date of Birth is required." })}
            type="date"
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
          {errors.dOB && (
            <p className="text-red-500 text-sm mt-1">{errors.dOB.message}</p>
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
            {...register("gender", { required: "Gender is rquired" })}
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          >
            <option value="">Select Option</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
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
            {...register("phoneNo", {
              required: "Phone Number is required",
              pattern: {
                value: /^[1-9][0-9]{9}$/,
                message: "Enter a valid 10 digit phone number",
              },
            })}
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
          {errors.phoneNo && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phoneNo.message}
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
            {...register("country", { required: "Country is required" })}
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message}
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
