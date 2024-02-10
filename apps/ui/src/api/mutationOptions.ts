import type { DefaultError, UseMutationOptions } from "@tanstack/react-query";

export const mutationOptions = <
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
) => {
  return options;
};
