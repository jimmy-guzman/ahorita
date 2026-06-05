import { Elysia, t } from "elysia";

import { authPlugin } from "../middleware/auth";
import { selectTaskSchema } from "../models/tasks";
import { labels, priorities, statuses } from "../schemas/constants";

const tags = ["Metadata"];

const MetadataSchema = t.Object({
  statuses: t.Array(t.Index(selectTaskSchema, ["status"])),
  priorities: t.Array(t.Index(selectTaskSchema, ["priority"])),
  labels: t.Array(t.Index(selectTaskSchema, ["label"])),
});

export const metadataRoutes = new Elysia({ prefix: "/metadata" })
  .use(authPlugin)
  .model({ Metadata: MetadataSchema })
  .get("", () => ({ statuses, priorities, labels }), {
    auth: true,
    response: "Metadata",
    detail: { tags, summary: "Get Metadata" },
  });
