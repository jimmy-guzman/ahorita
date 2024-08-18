import type { ReactNode } from "react";
import {
  type Control,
  type FieldValues,
  type UseControllerProps,
  useController,
} from "react-hook-form";

interface SelectFieldProps<T extends FieldValues>
  extends UseControllerProps<T> {
  control: Control<T>;
  /**
   * What is your floating label?
   */
  label: string;
  children: ReactNode;
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
    <div className="dsy-form-control">
      <label className="dsy-label" htmlFor={name}>
        <span className="dsy-label-text">{label}</span>
      </label>
      <select
        className="dsy-select dsy-select-bordered w-full"
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
    </div>
  );
};
