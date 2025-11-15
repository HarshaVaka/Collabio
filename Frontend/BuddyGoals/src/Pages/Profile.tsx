
import { useEffect, useState } from "react";
import Edit from "./Profile/Edit";
import { FriendshipStatus, UserProfile } from "@/types/User.types";
import { useUserProfile } from "@/hooks/useUser";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAddFriendQuery, useUpdateFriendQuery } from "@/hooks/useFriend";
import { PatchFormType } from "@/types/global.types";
export function Profile() {
  const [isOpen, setOpen] = useState(false);
  const [profileDetails, setProfileDetails] = useState<UserProfile>();

  const { userName } = useParams();
  const { data, isFetching, isError, error } = useUserProfile(userName);

  const { mutate: addFriend } = useAddFriendQuery();
  const { mutate: updateFriendStatus } = useUpdateFriendQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error.message)
    }
  }, [isError, error]);
  useEffect(() => {
    if (data && !isFetching)
      setProfileDetails(data);
  }, [data, isFetching]);
  function handleAddFriend(): void {
    if (userName)
      addFriend({ receiverUserName: userName });
  }

  function updateRequest(status: number) {
    if (!data?.requestId) {
      toast.error("Invalid action. Missing requestId.");
      return;
    }

    const payload: PatchFormType = [
      { path: "/status", op: "replace", value: status }
    ];

    updateFriendStatus({
      requestId: data.requestId,
      userName,
      payload
    });
  }

  return (
    <>
      <div className="text-teal-900 font-bold">My Profile</div>
      <div className="bg-green-200 rounded-xl p-4 ">
        <div className="flex flex-col sm:flex-row justify-start gap-6 items-center">
          <img
            className="rounded-full w-28 h-28 object-cover border-4 border-green-300"
            src={profileDetails?.profilePicUrl || "/default-avatar.png"}
            alt="Profile Pic"
          />

          {profileDetails && (
            <div className="flex flex-col gap-2 w-full">
              <p className="text-green-800 font-bold text-xl break-words">
                {profileDetails.firstName} {profileDetails.lastName}
              </p>
              <p className="text-green-600 font-bold break-words">
                @{profileDetails.userName}
              </p>
              <p className="text-green-700 font-medium break-words">
                {profileDetails.bio}
              </p>
              <p className="text-green-400 font-ligt break-words">
                {profileDetails.country}
              </p>
              {profileDetails.status != null ? (
                <div className="flex gap-3 items-center mt-2">
                  {/* Add Friend Button */}
                  {profileDetails.status === FriendshipStatus.NoFriends && (
                    <button
                      onClick={handleAddFriend}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg shadow cursor-pointer
                         hover:bg-green-700 transition"
                    >
                      Add Friend
                    </button>
                  )}

                  {/* Pending */}
                  {profileDetails.status === FriendshipStatus.Pending && (
                    <button
                      disabled
                      className="px-4 py-2 bg-yellow-400 text-white rounded-lg shadow"
                    >
                      Request Sent
                    </button>
                  )}

                  {profileDetails.status === FriendshipStatus.AwaitingApproval && (
                    <>
                      <button
                        onClick={() => updateRequest(1)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateRequest(2)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {profileDetails.status === FriendshipStatus.AlreadyFriends && (
                    <button
                      disabled
                      className="px-4 py-2 bg-yellow-400 text-white rounded-lg shadow cursor-pointer"
                    >
                      Message
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex gap-3 items-center mt-2 px-2">
                  <button
                    type="button"
                    className="h-10 w-20 bg-teal-800 rounded-md text-green-200 cursor-pointer"
                    onClick={() => setOpen(true)}
                  >
                    Edit Profile
                  </button>
                </div>
              )}
              {/* Friend Count */}
              {profileDetails.friendCount !== undefined && (
                <p
                  className="text-green-800 font-semibold underline cursor-pointer w-fit"
                  onClick={() => { }}
                >
                  {profileDetails.friendCount} {profileDetails.friendCount === 1 ? "Friend" : "Friends"}
                </p>
              )}

              {/* Mutual Friends */}
              {profileDetails.mutualCount !== undefined && profileDetails.mutualCount > 0 && (
                <p className="text-green-700 text-sm font-medium">
                  🔗 {profileDetails.mutualCount} mutual {profileDetails.mutualCount === 1 ? "friend" : "friends"}
                </p>
              )}

            </div>
          )}

        </div>
      </div>

      <div className="bg-green-200 rounded-xl mt-10 p-6">
        <div className="flex justify-between items-center">
          <div className="text-teal-800 font-bold">Personal Information</div>
        </div>
        <Edit open={isOpen} onOpenChange={setOpen} profileDetails={profileDetails} />

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
