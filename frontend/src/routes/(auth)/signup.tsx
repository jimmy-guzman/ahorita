import { useMutation } from "@tanstack/react-query";
import { createFileRoute, getRouteApi, Link } from "@tanstack/react-router";

import { PasswordInput } from "@/components/password-input";
import { TextInput } from "@/components/shared/text-input";
import { type SignupFormValues, useSignupForm } from "@/hooks/forms/signup";
import { authClient } from "@/lib/auth-client";

const routeApi = getRouteApi("/(auth)/signup");

function SignUp() {
  const navigate = routeApi.useNavigate();
  const { handleSubmit, control } = useSignupForm();

  const { mutate } = useMutation({
    mutationFn: async (values: SignupFormValues) => {
      const res = await authClient.signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
      });

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
            <fieldset className="dsy-fieldset">
              <legend className="dsy-fieldset-legend">
                Create your account
              </legend>
              <TextInput control={control} name="name" label="Name" />
              <TextInput control={control} name="email" label="Email" />
              <PasswordInput
                control={control}
                name="password"
                label="Password"
              />
              <button type="submit" className="dsy-btn dsy-btn-accent mt-6">
                Sign Up
              </button>
            </fieldset>
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
}

export const Route = createFileRoute("/(auth)/signup")({
  component: SignUp,
});
