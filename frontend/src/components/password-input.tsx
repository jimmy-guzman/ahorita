import { useState } from "react";
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
}

/**
 * A custom text input that is meant to be used alongside `react-hook-form`
 * @example
 * <PasswordInput control={control} name='password' label="Password" />
 */
export const PasswordInput = <T extends FieldValues>({
  control,
  name,
  rules,
  shouldUnregister,
  defaultValue,
  label,
  placeholder,
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
  const [view, setView] = useState(false);

  return (
    <fieldset className="dsy-fieldset">
      <label className="dsy-floating-label">
        <span>{label}</span>
        <input
          type={view ? "text" : "password"}
          placeholder={placeholder}
          className={cn(
            "dsy-input w-full",
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
      </label>
      {error?.message && (
        <span className="text-error text-sm">{error.message}</span>
      )}
      <label className="dsy-label flex cursor-pointer justify-end gap-2">
        <span>Show password</span>
        <input
          type="checkbox"
          checked={view}
          className="dsy-checkbox dsy-checkbox-xs"
          onChange={() => setView((prev) => !prev)}
        />
      </label>
    </fieldset>
  );
};
