import { clsx } from 'clsx';
import { ReactNode } from 'react';
import { Control, FieldValues, useFormState } from 'react-hook-form';

export const SubmitButton = <TValues extends FieldValues>({
  control,
  children,
  isSubmitting,
  isError,
}: {
  control: Control<TValues>;
  children: ReactNode;
  isSubmitting: boolean;
  isError: boolean;
}) => {
  const { isValid, isSubmitted } = useFormState({ control });

  return (
    <button
      className={clsx(
        'daisy-btn daisy-btn-primary',
        isError || (!isValid && isSubmitted) ? 'daisy-btn-error' : ''
      )}
    >
      {isSubmitting && <span className='daisy-loading daisy-loading-spinner' />}
      {children}
    </button>
  );
};
