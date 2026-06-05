import { useMutation } from "@tanstack/react-query";
import { createFileRoute, getRouteApi, Link } from "@tanstack/react-router";
import * as v from "valibot";

import { meQueryOptions } from "@/api/query-me";
import { PasswordInput } from "@/components/password-input";
import { RouteErrorComponent } from "@/components/shared/route-error";
import { TextInput } from "@/components/shared/text-input";
import { type LoginFormValues, useLoginForm } from "@/hooks/forms/login";
import { authClient } from "@/lib/auth-client";
import queryClient from "@/query-client";

const routeApi = getRouteApi("/(auth)/login");

function Login() {
  const search = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  const { handleSubmit, control } = useLoginForm();

  const { mutate } = useMutation({
    mutationFn: async (values: LoginFormValues) => {
      const res = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });

      if (res.error) {
        throw res.error;
      }

      return res.data;
    },
    onSuccess: async () => {
      await queryClient.fetchQuery(meQueryOptions);
      await navigate({ to: search.redirect });
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
            Sign in to your account
          </p>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((values) => mutate(values))}
        >
          <fieldset className="dsy-fieldset gap-3">
            <TextInput control={control} name="email" label="Email" />
            <PasswordInput control={control} name="password" label="Password" />
          </fieldset>

          <button type="submit" className="dsy-btn dsy-btn-primary w-full">
            Sign in
          </button>
        </form>

        <p className="mt-4 text-center text-base-content/50 text-sm">
          Need an account?{" "}
          <Link to="/signup" className="dsy-link dsy-link-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

const searchSchema = v.object({
  redirect: v.optional(v.fallback(v.string(), "/"), "/"),
});

export const Route = createFileRoute("/(auth)/login")({
  component: Login,
  errorComponent: RouteErrorComponent,
  validateSearch: searchSchema,
});
