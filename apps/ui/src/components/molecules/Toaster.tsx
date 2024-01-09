import { Transition } from '@headlessui/react';
import { clsx } from 'clsx';
import { CheckCircle2Icon, InfoIcon, XCircleIcon } from 'lucide-react';
import {
  resolveValue,
  Toaster as HotToaster,
  ToastIcon,
} from 'react-hot-toast';

export const Toaster = () => {
  return (
    <HotToaster
      position='bottom-center'
      toastOptions={{
        error: {
          icon: <XCircleIcon />,
        },
        blank: {
          icon: <InfoIcon />,
        },
        success: {
          icon: <CheckCircle2Icon />,
        },
      }}
    >
      {(toast) => {
        const alertClassName = clsx('dsy-alert transform', {
          'dsy-alert-success': toast.type === 'success',
          'dsy-alert-info': toast.type === 'loading' || toast.type === 'blank',
          'dsy-alert-error': toast.type === 'error',
        });

        return (
          <Transition
            appear
            show={toast.visible}
            className='transform'
            enter='transition-all duration-150'
            enterFrom='opacity-0 scale-50'
            enterTo='opacity-100 scale-100'
            leave='transition-all duration-150'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-75'
          >
            <div className={alertClassName}>
              <ToastIcon toast={toast} />
              <span>{resolveValue(toast.message, toast)}</span>
            </div>
          </Transition>
        );
      }}
    </HotToaster>
  );
};
