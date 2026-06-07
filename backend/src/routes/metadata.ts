import { Elysia, t } from "elysia";

import { authPlugin } from "../middleware/auth";
import { selectProjectSchema } from "../models/projects";
import { selectTaskSchema } from "../models/tasks";
import {
  labels,
  priorities,
  projectStatuses,
  statuses,
} from "../schemas/constants";

const tags = ["Metadata"];

const MetadataSchema = t.Object({
  statuses: t.Array(t.Index(selectTaskSchema, ["status"])),
  priorities: t.Array(t.Index(selectTaskSchema, ["priority"])),
  labels: t.Array(t.Index(selectTaskSchema, ["label"])),
  projectStatuses: t.Array(t.Index(selectProjectSchema, ["status"])),
});

export const metadataRoutes = new Elysia({ prefix: "/metadata" })
  .use(authPlugin)
  .model({ Metadata: MetadataSchema })
  .get("", () => ({ statuses, priorities, labels, projectStatuses }), {
    auth: true,
    response: "Metadata",
    detail: { tags, summary: "Get Metadata" },
  });
