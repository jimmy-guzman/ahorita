import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { type InferOutput, minLength, object, pipe, string } from "valibot";

const schema = object({
  name: pipe(string(), minLength(1, "Your name is too short.")),
  description: pipe(string(), minLength(1, "Your description is too short.")),
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
