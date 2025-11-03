import profilePic from "../assets/profilePic1.jfif";
import { useState } from "react";
import Edit from "./Edit";
export function Profile() {
  const userDetails = {
    FirstName: "Ralla",
    LastName: "Sowmya",
    userName: "Sowmya_26",
    DOB: "2002-07-28",
    Email: "sowmyaralla@gmail.com",
    phoneNumber: 9999999999,
    Country: "India",
    Bio: "Dreaming in code and designing with purpose.",
    Gender: "Female",
  };
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div className="text-teal-900 font-bold">My Profile</div>
      <div className="bg-green-200 rounded-xl p-4 ">
        <div className="flex justify-start gap-6 items-center">
          <img
            className="rounded-full w-32 h-32"
            src={profilePic}
            alt="Profile Pic"
          />
          <div>
            <p className="text-green-800 font-bold break-words">
              {userDetails.FirstName} {userDetails.LastName}
            </p>
            <p className="text-green-600 font-bold break-words">
              {userDetails.userName}
            </p>
            <p className="text-green-500 font-medium break-words">
              {userDetails.Bio}
            </p>
            <p className="text-green-400 font-ligt break-words">
              {userDetails.Country}
            </p>
          </div>
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
        <Edit open={isOpen} onOpenChange={setOpen} />

        <hr className="border-t-1 border-teal-500 my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="text-teal-600 font-semibold" htmlFor="FirstName">
              First Name:{" "}
            </label>
            <p className="text-green-500">{userDetails.FirstName}</p>
          </div>
          <div>
            <label htmlFor="Lastname" className="text-teal-600 font-semibold">
              Last Name:{" "}
            </label>
            <p className="text-green-500">{userDetails.LastName}</p>
          </div>
          <div>
            <label htmlFor="DOB" className="text-teal-600 font-semibold">
              Date of Birth:{" "}
            </label>
            <p className="text-green-500">{userDetails.DOB}</p>
          </div>
          <div>
            <label htmlFor="Gender" className="text-teal-600 font-semibold">
              Gender
            </label>
            <p className="text-green-500">{userDetails.Gender}</p>
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="text-teal-600 font-semibold"
            >
              Phone Number
            </label>
            <p className="text-green-500">{userDetails.phoneNumber}</p>
          </div>
          <div>
            <label
              htmlFor="EmailAddress"
              className="text-teal-600 font-semibold"
            >
              Email Id
            </label>
            <p className="text-green-500 break-words">{userDetails.Email}</p>
          </div>
          <div>
            <label className="text-teal-600 font-semibold" htmlFor="Country">
              Country
            </label>
            <p className="text-green-500">{userDetails.Country}</p>
          </div>
        </div>
      </div>
    </>
  );
}
