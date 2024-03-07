import { eq } from "drizzle-orm";
import { Elysia, t } from "elysia";

import { db } from "../db";
import { auth } from "../middleware/auth";

import { LabelDto } from "../models/labels";
import { labels } from "../schemas";

export const labelsRoutes = new Elysia()
  .use(auth)
  .group("/labels", { detail: { tags: ["Labels"] } }, (app) =>
    app.get(
      "",
      async ({ user }) => {
        return db.query.labels.findMany({
          where: eq(labels.userId, user?.id ?? ""),
        });
      },
      {
        response: t.Array(LabelDto),
      },
    ),
  );
