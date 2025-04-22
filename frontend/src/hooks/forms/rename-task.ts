import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { type InferOutput, minLength, object, pipe, string } from "valibot";

const schema = object({
  name: pipe(string(), minLength(1, "Your name is too short.")),
});

export const useRenameTaskForm = (name: string) => {
  return useForm<InferOutput<typeof schema>>({
    resolver: valibotResolver(schema),
    values: { name },
  });
};
