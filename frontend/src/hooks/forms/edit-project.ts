import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import {
  type InferOutput,
  boolean,
  minLength,
  object,
  pipe,
  string,
} from "valibot";

const schema = object({
  name: pipe(string(), minLength(1, "Your username is too short.")),
  description: pipe(string(), minLength(1, "Your description is too short.")),
  isFavorite: boolean(),
  isDone: boolean(),
});

export const useEditProjectForm = (values: InferOutput<typeof schema>) => {
  return useForm<InferOutput<typeof schema>>({
    resolver: valibotResolver(schema),
    values,
  });
};
