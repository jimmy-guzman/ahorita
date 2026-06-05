import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import {
  email,
  type InferOutput,
  minLength,
  object,
  pipe,
  string,
} from "valibot";

const schema = object({
  email: pipe(
    string(),
    email("Enter a valid email address."),
    minLength(1, "Email is required."),
  ),
  password: pipe(string(), minLength(1, "Your password is too short.")),
});

export type LoginFormValues = InferOutput<typeof schema>;

export const useLoginForm = () => {
  return useForm<LoginFormValues>({
    resolver: valibotResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
};
