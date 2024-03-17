export type Status = "Backlog" | "Canceled" | "Done" | "In Progress" | "Todo";
export type Priority = "Low" | "Medium" | "High";
export type Label = "Feature" | "Bug" | "Documentation";

export const statuses = [
  "Backlog",
  "Todo",
  "In Progress",
  "Done",
  "Canceled",
] satisfies Status[];

export const priorities = ["Low", "Medium", "High"] satisfies Priority[];

export const labels = ["Feature", "Documentation", "Bug"] satisfies Label[];
