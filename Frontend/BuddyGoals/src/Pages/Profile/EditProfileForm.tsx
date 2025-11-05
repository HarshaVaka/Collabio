import { useForm } from "react-hook-form";
import { UserProfile } from "@/types/User.types";
import { useEffect } from "react";
import { useUpdateProfile } from "@/hooks/useUser";
import { PatchFormType } from "@/types/global.types";

export default function EditProfileForm({
  profileDetails,
  onOpenChange
}: {
  profileDetails: UserProfile,
  onOpenChange: (open: boolean) => void
}) {
  type editProfileInputForm = {
    firstName: string;
    lastName: string;
    bio: string;
    dob: Date;
    gender: string;
    phoneNo: string;
    countryCode: string;
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<editProfileInputForm>({
    mode: "onChange",
  });

  const { mutate: updateProfile } = useUpdateProfile();

  function onSubmit(formData: editProfileInputForm) {
    const editedData: PatchFormType = [];
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
    updateProfile(editedData, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  }
  useEffect(() => {
    reset({
      firstName: profileDetails.firstName,
      lastName: profileDetails.lastName,
      bio: profileDetails.bio,
      dob: profileDetails.dob,
      gender: profileDetails.gender,
      phoneNo: profileDetails.phoneNo,
      countryCode: profileDetails.countryCode,
    });
  }, [profileDetails, reset]);
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
            {...register("dob", { required: "Date of Birth is required." })}
            type="date"
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
          {errors.dob && (
            <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
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
            {...register("countryCode", { required: "Country is required" })}
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
          {errors.countryCode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.countryCode.message}
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

          <button
            className=" bg-gradient-to-br from-emerald-100 to-green-200
                           hover:from-emerald-400 hover:to-lime-100
                           text-green-900 font-semibold py-2 px-4 rounded-md cursor-pointer 
                           transition-all duration-200"
            onClick={() => onOpenChange(false)}
          >
            Close
          </button>

        </div>
      </form>
    </div>
  );
}
