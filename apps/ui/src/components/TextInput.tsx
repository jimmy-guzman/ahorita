import { clsx } from "clsx";
import {
  type Control,
  type FieldValues,
  type UseControllerProps,
  useController,
} from "react-hook-form";

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
    <div className="dsy-form-control">
      <label className="dsy-label" htmlFor={name}>
        <span className="dsy-label-text">{label}</span>
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className={clsx(
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

      {error?.message ? (
        <p className="text-error">{error.message}</p>
      ) : (
        <p className="invisible">&nbsp;</p>
      )}
    </div>
  );
};
