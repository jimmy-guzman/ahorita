import { useRef } from "react";

export const useDialog = () => {
  const ref = useRef<HTMLDialogElement>(null);

  return {
    ref,
    show: () => {
      if (ref.current) {
        ref.current.showModal();
      }
    },
    close: () => {
      if (ref.current) {
        ref.current.close();
      }
    },
  };
};
