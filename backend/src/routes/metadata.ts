import { Elysia, t } from "elysia";

import { auth } from "../middleware/auth";
import { selectTaskSchema } from "../models/tasks";
import { labels, priorities, statuses } from "../schemas/constants";

const tags = ["Metadata"];

const MetadataSchema = t.Object({
  statuses: t.Array(t.Index(selectTaskSchema, ["status"])),
  priorities: t.Array(t.Index(selectTaskSchema, ["priority"])),
  labels: t.Array(t.Index(selectTaskSchema, ["label"])),
});

export const metadataRoutes = new Elysia({ prefix: "/metadata" })
  .use(auth)
  .model({ metadata: MetadataSchema })
  .get("", () => ({ statuses, priorities, labels }), {
    response: "metadata",
    detail: { tags, summary: "Get Metadata" },
  });
