import { typeboxResolver } from "@hookform/resolvers/typebox";
import type { Static } from "@sinclair/typebox";
import { Type } from "@sinclair/typebox";
import { useForm, useFormContext } from "react-hook-form";

const schema = Type.Object({
  tasks: Type.Array(
    Type.Object({
      name: Type.String({ minLength: 1 }),
      createdAt: Type.String(),
      updatedAt: Type.String(),
      status: Type.Union([
        Type.Literal("BACKLOG"),
        Type.Literal("TODO"),
        Type.Literal("IN_PROGRESS"),
        Type.Literal("DONE"),
        Type.Literal("CANCELED"),
      ]),
      id: Type.String(),
      groupId: Type.String(),
    }),
  ),
});

type FormValues = Static<typeof schema>;

export const useTasksFormContext = useFormContext<FormValues>;

export const useTasksForm = (tasks: FormValues["tasks"] = []) => {
  return useForm<FormValues>({
    resolver: typeboxResolver(schema),
    values: { tasks },
  });
};
