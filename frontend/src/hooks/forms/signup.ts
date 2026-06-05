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
  name: pipe(string(), minLength(1, "Your name is too short.")),
  email: pipe(
    string(),
    email("Enter a valid email address."),
    minLength(1, "Email is required."),
  ),
  password: pipe(
    string(),
    minLength(8, "Password must be at least 8 characters."),
  ),
});

export type SignupFormValues = InferOutput<typeof schema>;

export const useSignupForm = () => {
  return useForm<SignupFormValues>({
    resolver: valibotResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
};
