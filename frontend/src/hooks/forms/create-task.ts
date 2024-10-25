import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import {
  type InferOutput,
  literal,
  minLength,
  nonOptional,
  object,
  pipe,
  string,
  union,
} from "valibot";

const schema = object({
  name: pipe(string(), minLength(1, "Your name is too short.")),
  priority: union([literal("Low"), literal("Medium"), literal("High")]),
  label: union([literal("Feature"), literal("Documentation"), literal("Bug")]),
  projectId: nonOptional(string(), "Project is required."),
});

export const useCreateTaskForm = (projectId?: string) => {
  return useForm<InferOutput<typeof schema>>({
    resolver: valibotResolver(schema),
    defaultValues: {
      name: "",
      priority: "Medium",
      label: "Feature",
      projectId,
    },
  });
};
