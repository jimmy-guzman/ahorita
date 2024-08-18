import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { type InferOutput, minLength, object, pipe, string } from "valibot";

const schema = object({
  username: pipe(string(), minLength(1, "Your username is too short.")),
  password: pipe(string(), minLength(1, "Your password is too short.")),
});

export type LoginFormValues = InferOutput<typeof schema>;

export const useLoginForm = () => {
  return useForm<LoginFormValues>({
    resolver: valibotResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
};
