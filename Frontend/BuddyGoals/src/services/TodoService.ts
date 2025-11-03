import { API } from "./api";

export const TodoService = {
  fetchAllTodos: async () => {
    const response = [
      {
        todoId: 1,
        title: "Project Kickoff",
        endDate: "2025-10-03",
        priority: "High",
      },
      {
        todoId: 2,
        title: "Design Phase",
        endDate: "2025-10-10",
        priority: "Medium",
      },
      {
        todoId: 3,
        title: "API Integration",
        endDate: "2025-10-20",
        priority: "High",
      },
      {
        todoId: 4,
        title: "Testing & QA",
        endDate: "2025-10-25",
        priority: "Medium",
      },
      {
        todoId: 5,
        title: "Deployment Prep",
        endDate: "2025-10-28",
        priority: "Low",
      },
      {
        todoId: 6,
        title: "Client Feedback Round",
        endDate: "2025-10-31",
        priority: "Medium",
      },
      {
        todoId: 7,
        title: "Bug Fix Sprint",
        endDate: "2025-11-05",
        priority: "High",
      },
      {
        todoId: 8,
        title: "Documentation Update",
        endDate: "2025-11-09",
        priority: "Low",
      },
      {
        todoId: 9,
        title: "Final Release",
        endDate: "2025-11-11",
        priority: "High",
      },
      {
        todoId: 10,
        title: "Post-Launch Review",
        endDate: "2025-11-14",
        priority: "Medium",
      },
    ];
    if (!response) {
        throw new Error('Error while fetching templates');
      }
      return response;
  },
};
