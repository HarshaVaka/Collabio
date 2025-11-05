
import { useEffect, useState } from "react";
import Edit from "./Profile/Edit";
import { UserProfile } from "@/types/User.types";
import { useUserProfile } from "@/hooks/useUser";
import toast from "react-hot-toast";
export function Profile() {
  const [isOpen, setOpen] = useState(false);
  const [profileDetails, setProfileDetails] = useState<UserProfile>();
  const { data, isFetching, isError, error } = useUserProfile();

  useEffect(() => {
    if (isError) {
      toast.error(error.message)
    }
  }, [isError, error]);
  useEffect(() => {
    if (data && !isFetching)
      setProfileDetails(data);
  }, [data, isFetching]);
  return (
    <>
      <div className="text-teal-900 font-bold">My Profile</div>
      <div className="bg-green-200 rounded-xl p-4 ">
        <div className="flex justify-start gap-6 items-center">
          <img
            className="rounded-full w-32 h-32"
            src={profileDetails?.profilePicUrl}
            alt="Profile Pic"
          />
          {profileDetails && (
            <div>
              <p className="text-green-800 font-bold break-words">
                {profileDetails.firstName} {profileDetails.lastName}
              </p>
              <p className="text-green-600 font-bold break-words">
                {profileDetails.userName}
              </p>
              <p className="text-green-500 font-medium break-words">
                {profileDetails.bio}
              </p>
              <p className="text-green-400 font-ligt break-words">
                {profileDetails.country}
              </p>
            </div>
          )}

        </div>
      </div>

      <div className="bg-green-200 rounded-xl mt-10 p-6">
        <div className="flex justify-between items-center">
          <div className="text-teal-800 font-bold">Personal Information</div>
          <button
            type="button"
            className="h-10 w-20 bg-teal-800 rounded-md text-green-200"
            onClick={() => setOpen(true)}
          >
            Edit
          </button>
        </div>
        <Edit open={isOpen} onOpenChange={setOpen} profileDetails={profileDetails}/>

        <hr className="border-t-1 border-teal-500 my-4" />
        {profileDetails && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="text-teal-600 font-semibold" htmlFor="FirstName">
                First Name:{" "}
              </label>
              <p className="text-green-500">{profileDetails?.firstName}</p>
            </div>
            <div>
              <label htmlFor="Lastname" className="text-teal-600 font-semibold">
                Last Name:{" "}
              </label>
              <p className="text-green-500">{profileDetails.lastName}</p>
            </div>
            <div>
              <label htmlFor="dob" className="text-teal-600 font-semibold">
                Date of Birth:{" "}
              </label>
              <p className="text-green-500">{profileDetails.dob?.toLocaleString()}</p>
            </div>
            <div>
              <label htmlFor="Gender" className="text-teal-600 font-semibold">
                Gender
              </label>
              <p className="text-green-500">{profileDetails.gender}</p>
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="text-teal-600 font-semibold"
              >
                Phone Number
              </label>
              <p className="text-green-500">{profileDetails.phoneNo}</p>
            </div>
            <div>
              <label
                htmlFor="EmailAddress"
                className="text-teal-600 font-semibold"
              >
                Email Id
              </label>
              <p className="text-green-500 break-words">{profileDetails.email}</p>
            </div>
            <div>
              <label className="text-teal-600 font-semibold" htmlFor="Country">
                Country
              </label>
              <p className="text-green-500">{profileDetails.country}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
