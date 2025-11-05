import { useForm } from "react-hook-form";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect } from "react";

export default function AddEditTodoForm() {
  const todo = {Title: "Test title", Description: "desc", StartDate: new Date().toISOString().split("T")[0], EndDate: new Date().toISOString().split("T")[0], Priority: 1, Status: "Active"}

  type addEditTodoForm = {
    Title: string;
    Description: string;
    StartDate: string;
    EndDate: string;
    Priority: number;
    Status: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<addEditTodoForm>();

  useEffect(() => {
    if (todo) {
      reset({
        Title: todo.Title,
        Description: todo.Description,
        StartDate: todo.StartDate,
        EndDate: todo.EndDate,
        Priority: todo.Priority,
        Status: todo.Status,
      });
    }
  }, [todo, reset]);

  function onSubmit(formData: addEditTodoForm) {
    console.log(formData);
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 m-4">
        <div>
          <label
            htmlFor="Title"
            className="block text-md font-bold text-green-900"
          >
            <span className="text-red-900">*</span>Title{" "}
          </label>
          <input
            {...register("Title", { required: "Title is required" })}
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
          {errors.Title && (
            <p className="text-red-500 text-sm mt-1">{errors.Title.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="Description"
            className="block text-md font-bold text-green-900"
          >
            <span className="text-red-900">*</span>Description{" "}
          </label>
          <textarea
            {...register("Description", {
              required: "Description is required",
            })}
            rows={4}
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
          {errors.Description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.Description.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="StartDate"
            className="block text-md font-bold text-green-900"
          >
            <span className="text-red-900">*</span>
            Start Date{" "}
          </label>
          <input
            {...register("StartDate", { required: "Start Date is required." })}
            type="date"
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
          {errors.StartDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.StartDate.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="EndDate"
            className="block text-md font-bold text-green-900"
          >
            <span className="text-red-900">*</span>
            End Date{" "}
          </label>
          <input
            {...register("EndDate")}
            type="date"
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          />
        </div>
        <div>
          <label
            htmlFor="Priority"
            className="block text-md font-bold text-green-900"
          >
            <span className="text-red-900">*</span>
            Priority{" "}
          </label>
          <select
            id="Priority"
            {...register("Priority", {
              required: "Priority is rquired",
              valueAsNumber: true,
            })}
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          >
            <option value="">Select Option</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
          {errors.Priority && (
            <p className="text-red-500 text-sm mt-1">
              {errors.Priority.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="Status"
            className="block text-md font-bold text-green-900"
          >
            <span className="text-red-900">*</span>
            Status{" "}
          </label>
          <select
            id="Status"
            {...register("Status", { required: "Status is rquired" })}
            className="mt-1 block w-full border border-emerald-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
          >
            <option value="">Select Option</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          {errors.Status && (
            <p className="text-red-500 text-sm mt-1">{errors.Status.message}</p>
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
