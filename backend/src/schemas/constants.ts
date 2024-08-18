export const statuses = [
  "Backlog" as const,
  "Todo" as const,
  "In Progress" as const,
  "Done" as const,
  "Canceled" as const,
] satisfies [string, ...string[]];

export const priorities = [
  "Low" as const,
  "Medium" as const,
  "High" as const,
] satisfies [string, ...string[]];

export const labels = [
  "Feature" as const,
  "Bug" as const,
  "Documentation" as const,
] satisfies [string, ...string[]];
