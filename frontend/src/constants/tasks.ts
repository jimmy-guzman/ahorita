import type { APITypes } from "@/api/client";

export const statuses = [
  "Backlog",
  "Todo",
  "In Progress",
  "Done",
  "Canceled",
] satisfies APITypes["task"]["status"][];

export const priorities = [
  "Low",
  "Medium",
  "High",
] satisfies APITypes["task"]["priority"][];

export const labels = [
  "Feature",
  "Documentation",
  "Bug",
] satisfies APITypes["task"]["label"][];
