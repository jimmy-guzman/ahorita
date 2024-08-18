import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import {
  type InferOutput,
  minLength,
  object,
  pipe,
  regex,
  string,
} from "valibot";

const schema = object({
  username: pipe(
    string(),
    minLength(1, "Your username is too short."),
    regex(/^[a-zA-Z0-9]+$/, "Your username must be alphanumeric."),
  ),
  password: pipe(string(), minLength(1, "Your password is too short.")),
});

export type SignFormValues = InferOutput<typeof schema>;

export const useSignupForm = () => {
  return useForm<SignFormValues>({
    resolver: valibotResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
};
