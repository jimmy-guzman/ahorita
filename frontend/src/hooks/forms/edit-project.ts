import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import {
  boolean,
  type InferOutput,
  nonEmpty,
  object,
  picklist,
  pipe,
  string,
} from "valibot";

const schema = object({
  name: pipe(string(), nonEmpty("Name is required.")),
  description: pipe(string(), nonEmpty("Description is required.")),
  isFavorite: boolean(),
  status: picklist(["In Progress", "Done"]),
});

export const useEditProjectForm = (values: InferOutput<typeof schema>) => {
  return useForm<InferOutput<typeof schema>>({
    resolver: valibotResolver(schema),
    values,
  });
};
