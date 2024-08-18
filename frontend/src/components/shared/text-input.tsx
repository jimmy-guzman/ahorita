import {
  type Control,
  type FieldValues,
  type UseControllerProps,
  useController,
} from "react-hook-form";

import { cn } from "@/utils/cn";

interface TextFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  control: Control<T>;
  /**
   * What is your floating label?
   */
  label: string;
  placeholder?: string;
  className?: string;
}

/**
 * A custom text input that is meant to be used alongside `react-hook-form`
 * @example
 * <TextInput control={control} name='name' label="Your task's name?" />
 */
export const TextInput = <T extends FieldValues>({
  control,
  name,
  rules,
  shouldUnregister,
  defaultValue,
  label,
  placeholder,
  className,
}: TextFieldProps<T>) => {
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
    <div className={cn("dsy-form-control", className)}>
      <label className="dsy-label" htmlFor={name}>
        <span className="dsy-label-text">{label}</span>
      </label>
      <input
        placeholder={placeholder}
        className={cn(
          "dsy-input dsy-input-bordered w-full",
          error?.message ? "dsy-input-error" : "",
        )}
        id={name}
        ref={field.ref}
        name={name}
        value={field.value}
        defaultValue={defaultValue}
        onBlur={field.onBlur}
        onChange={field.onChange}
      />
      {error?.message && (
        <span className="text-error text-sm">{error.message}</span>
      )}
    </div>
  );
};
