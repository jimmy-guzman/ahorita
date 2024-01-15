import { clsx } from 'clsx';
import {
  type Control,
  type FieldValues,
  useController,
  type UseControllerProps,
} from 'react-hook-form';

interface TextFieldProps<T extends FieldValues> extends UseControllerProps<T> {
  control: Control<T>;
  /**
   * What is your floating label?
   */
  label: string;
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
    <div className='dsy-form-control relative'>
      <input
        type='text'
        placeholder={label}
        className={clsx(
          'dsy-input dsy-input-bordered peer w-full placeholder-transparent',
          error?.message ? 'dsy-input-error' : ''
        )}
        id={name}
        ref={field.ref}
        name={name}
        value={field.value}
        defaultValue={defaultValue}
        onBlur={field.onBlur}
        onChange={field.onChange}
      />
      <label
        className='dsy-label bg-base-100 text-base-content pointer-events-none absolute -top-4 left-3 text-xs text-opacity-50 transition-all peer-placeholder-shown:top-1.5 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm'
        htmlFor={name}
      >
        {label}
      </label>
      {error?.message ? (
        <p className='text-error'>{error.message}</p>
      ) : (
        <p className='invisible'>&nbsp;</p>
      )}
    </div>
  );
};
