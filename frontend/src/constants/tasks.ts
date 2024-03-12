export type Status = "BACKLOG" | "CANCELED" | "DONE" | "IN_PROGRESS" | "TODO";
export type Priority = "LOW" | "MEDIUM" | "HIGH";

export const statuses = [
  { status: "TODO" as const, label: "Todo" },
  { status: "DONE" as const, label: "Done" },
  { status: "CANCELED" as const, label: "Canceled" },
  { status: "BACKLOG" as const, label: "Backlog" },
  { status: "IN_PROGRESS" as const, label: "In Progress" },
] satisfies { status: Status; label: string }[];

export const priorities = [
  { priority: "LOW" as const, label: "Low" },
  { priority: "MEDIUM" as const, label: "Medium" },
  { priority: "HIGH" as const, label: "High" },
] satisfies { priority: Priority; label: string }[];

export const labels = ["Feature", "Documentation", "Bug"] as const;
