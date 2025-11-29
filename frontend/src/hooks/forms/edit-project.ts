import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import {
  boolean,
  type InferOutput,
  nonEmpty,
  object,
  pipe,
  string,
} from "valibot";

const schema = object({
  name: pipe(string(), nonEmpty("Name is required.")),
  description: pipe(string(), nonEmpty("Description is required.")),
  isFavorite: boolean(),
  isDone: boolean(),
});

export const useEditProjectForm = (values: InferOutput<typeof schema>) => {
  return useForm<InferOutput<typeof schema>>({
    resolver: valibotResolver(schema),
    values,
  });
};
