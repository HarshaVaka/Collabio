import { useParams } from "react-router-dom";

export function TodoDetail() {
  const { id } = useParams<{ id: string }>();

  const todos = [
    {
      Id: 1,
      Title: "Title 1",
      Description: "Finish React project",
      StartDate: "2025-10-25",
      EndDate: "2025-10-29",
      Priority: 1,
      Status: "Active",
    },
    {
      Id: 2,
      Title: "Title 2",
      Description: "Prepare project documentation",
      StartDate: "2025-10-20",
      EndDate: "2025-10-30",
      Priority: 2,
      Status: "Inactive",
    },
    {
      Id: 3,
      Title: "Title 3",
      Description: "Review and deploy application",
      StartDate: "2025-10-22",
      EndDate: "2025-10-31",
      Priority: 3,
      Status: "Active",
    },
    {
      Id: 4,
      Title: "Title 4",
      Description: "Finish React project",
      StartDate: "2025-10-25",
      EndDate: "2025-10-29",
      Priority: 1,
      Status: "Active",
    },
    {
      Id: 5,
      Title: "Title 5",
      Description: "Prepare project documentation",
      StartDate: "2025-10-20",
      EndDate: "2025-10-30",
      Priority: 2,
      Status: "Inactive",
    },
    {
      Id: 6,
      Title: "Title 6",
      Description: "Review and deploy application",
      StartDate: "2025-10-22",
      EndDate: "2025-10-31",
      Priority: 3,
      Status: "Active",
    },
  ];

  const todo = todos[parseInt(id) - 1];

  return (
    <div className="relative bg-emerald-300 h-full rounded-xl p-5">
      <h1 className="text-xl font-bold text-center mb-4">Todo Details</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 p-4 rounded-lg">
        <div className="font-semibold text-gray-700">Title:</div>
        <div>{todo.Title}</div>

        <div className="font-semibold text-gray-700">Description:</div>
        <div>{todo.Description}</div>

        <div className="font-semibold text-gray-700">Start Date:</div>
        <div>{todo.StartDate}</div>

        <div className="font-semibold text-gray-700">End Date:</div>
        <div>{todo.EndDate}</div>

        <div className="font-semibold text-gray-700">Priority:</div>
        <div>{todo.Priority}</div>

        <div className="font-semibold text-gray-700">Status:</div>
        <div>{todo.Status}</div>
      </section>
      <button
        className="absolute bottom-2 right-23 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Edit
      </button>
      <button
        className={`absolute bottom-2 right-2 px-4 py-2 rounded bg-gray-300 text-gray-600 cursor-not-allowed`}
      >
        Delete
      </button>
    </div>
  );
}
