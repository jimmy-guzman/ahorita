import { api } from "@/api/client";
import { meQueryOptions } from "@/api/query-me";
import { PasswordInput } from "@/components/password-input";
import { TextInput } from "@/components/text-input";
import { queryClient } from "@/query-client";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import { type Static, Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { useMutation } from "@tanstack/react-query";
import {
  Link,
  createFileRoute,
  getRouteApi,
  useNavigate,
} from "@tanstack/react-router";
import { useForm } from "react-hook-form";

const schema = Type.Object({
  username: Type.String({ minLength: 1 }),
  password: Type.String({ minLength: 1 }),
});

const routeApi = getRouteApi("/login");

export const Login = () => {
  const search = routeApi.useSearch();
  const navigate = useNavigate({ from: routeApi.id });
  const { handleSubmit, control } = useForm<Static<typeof schema>>({
    resolver: typeboxResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (user: Static<typeof schema>) => {
      const res = await api.auth.login.post(user);

      if (res.error) throw new Error(res.error.value);

      return res.data;
    },
    onSuccess: async () => {
      await queryClient.fetchQuery(meQueryOptions);
      await navigate({ to: search.redirect });
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
            <legend>Login with your account</legend>
            <TextInput control={control} name="username" label="Username" />
            <PasswordInput control={control} name="password" label="Password" />
            <div className="dsy-form-control mt-6">
              <button type="submit" className="dsy-btn dsy-btn-primary">
                Login
              </button>
            </div>
            <div className="flex justify-end">
              <span>
                Need an account?{" "}
                <Link to="/signup" className="dsy-link">
                  sign up
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

const searchSchema = Type.Object({
  redirect: Type.Optional(Type.String({ default: "/" })),
});

export const Route = createFileRoute("/login")({
  component: Login,
  validateSearch: (value) => {
    return Value.Decode(searchSchema, value);
  },
});