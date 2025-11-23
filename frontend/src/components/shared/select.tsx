import type { ReactNode } from "react";
import {
  type Control,
  type FieldValues,
  type UseControllerProps,
  useController,
} from "react-hook-form";

import { cn } from "@/utils/cn";

interface SelectFieldProps<T extends FieldValues>
  extends UseControllerProps<T> {
  control: Control<T>;
  /**
   * What is your floating label?
   */
  label: string;
  children: ReactNode;
  className?: string;
}

/**
 * A custom text input that is meant to be used alongside `react-hook-form`
 * @example
 * <TextInput control={control} name='name' label="Your task's name?" />
 */
export const Select = <T extends FieldValues>({
  control,
  name,
  rules,
  shouldUnregister,
  defaultValue,
  label,
  className,
  children,
}: SelectFieldProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
    shouldUnregister,
    rules,
  });

  return (
    <label className={cn("dsy-floating-label", className)}>
      <span>{label}</span>
      <select
        className="dsy-select w-full"
        id={name}
        ref={field.ref}
        onBlur={field.onBlur}
        onChange={field.onChange}
        name={name}
        value={field.value}
        defaultValue={defaultValue}
      >
        {children}
      </select>
      {error?.message && (
        <span className="text-error text-sm">{error.message}</span>
      )}
    </label>
  );
};
