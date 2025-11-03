import { useForm } from "react-hook-form";

export default function EditProfileForm() {
  type editProfileInputForm = {
    FirstName: string;
    LastName: string;
    Bio: string;
    DOB: string;
    Gender: string;
    phoneNumber: string;
    Country: string;
  };
  const { register, handleSubmit } = useForm<editProfileInputForm>();
  function onSubmit() {
    console.log("Hi");
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="FirstName">First Name</label>
          <input type="FirstName" {...register("FirstName")} />
        </div>
        <div>
          <label htmlFor="LastName">Last Name</label>
          <input type="LastName" {...register("LastName")} />
        </div>
        <div>
          <label htmlFor="Bio">Bio</label>
          <input type="Bio" {...register("Bio")} />
        </div>
        <div>
          <label htmlFor="DOB">DOB</label>
          <input type="DOB" {...register("DOB")} />
        </div>
        <div>
          <label htmlFor="Gender">Gender</label>
          <input type="Gender" {...register("Gender")} />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="phoneNumber" {...register("phoneNumber")} />
        </div>
        <div>
          <label htmlFor="Country">Country</label>
          <input type="Country" {...register("Country")} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
