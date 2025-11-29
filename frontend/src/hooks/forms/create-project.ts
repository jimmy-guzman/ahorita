import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { type InferOutput, nonEmpty, object, pipe, string } from "valibot";

const schema = object({
  name: pipe(string(), nonEmpty("Name is required.")),
  description: pipe(string(), nonEmpty("Description is required.")),
});

export const useCreateProjectForm = () => {
  return useForm<InferOutput<typeof schema>>({
    resolver: valibotResolver(schema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
};
