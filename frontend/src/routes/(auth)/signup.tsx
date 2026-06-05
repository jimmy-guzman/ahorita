import { useMutation } from "@tanstack/react-query";
import { createFileRoute, getRouteApi, Link } from "@tanstack/react-router";

import { PasswordInput } from "@/components/password-input";
import { RouteErrorComponent } from "@/components/shared/route-error";
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
    <div className="flex min-h-screen items-center justify-center bg-base-200">
      <div className="w-full max-w-sm rounded-box border border-base-300 bg-base-100 p-8">
        <div className="mb-6">
          <Link to="/" className="font-bold text-base-content text-xl">
            ahorita
          </Link>
          <p className="mt-1 text-base-content/50 text-sm">
            Create your account
          </p>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((values) => mutate(values))}
        >
          <fieldset className="dsy-fieldset gap-3">
            <TextInput control={control} name="name" label="Name" />
            <TextInput control={control} name="email" label="Email" />
            <PasswordInput control={control} name="password" label="Password" />
          </fieldset>

          <button type="submit" className="dsy-btn dsy-btn-primary w-full">
            Sign up
          </button>
        </form>

        <p className="mt-4 text-center text-base-content/50 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="dsy-link dsy-link-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/(auth)/signup")({
  component: SignUp,
  errorComponent: RouteErrorComponent,
});
