import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMutation } from "@tanstack/react-query";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { type Output, minLength, object, regex, string } from "valibot";

import { api } from "@/api/client";
import { PasswordInput } from "@/components/password-input";
import { TextInput } from "@/components/text-input";

const schema = object({
  username: string([
    minLength(1, "Your username is too short."),
    regex(/^[a-zA-Z0-9]+$/, "Your username must be alphanumeric."),
  ]),
  password: string([minLength(1, "Your password is too short.")]),
});

export const SignUp = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<Output<typeof schema>>({
    resolver: valibotResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (user: Output<typeof schema>) => {
      const res = await api.auth.signup.post(user);

      if (res.error) {
        throw res.error;
      }

      return res.data;
    },
    onSuccess: async () => {
      await navigate({ to: "/" });
    },
  });

  return (
    <div className="dsy-hero min-h-screen bg-base-200">
      <div className="dsy-hero-content flex-col lg:flex-row-reverse">
        <img
          alt="placeholder"
          src="https://placehold.co/400"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div className="dsy-card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
          <form
            className="dsy-card-body"
            onSubmit={handleSubmit((values) => mutate(values))}
          >
            <legend>Create your account</legend>
            <TextInput control={control} name="username" label="Username" />
            <PasswordInput control={control} name="password" label="Password" />
            <div className="dsy-form-control mt-6">
              <button type="submit" className="dsy-btn dsy-btn-accent">
                Sign Up
              </button>
            </div>
            <div className="flex justify-end">
              <span>
                Already a user?{" "}
                <Link to="/login" className="dsy-link">
                  login
                </Link>
                .
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/signup")({
  component: SignUp,
});
