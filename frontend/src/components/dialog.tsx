import { XIcon } from "lucide-react";
import { type ReactNode, forwardRef } from "react";
import { createPortal } from "react-dom";

interface DialogProps {
  children: ReactNode;
}

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ children }, ref) => {
    return createPortal(
      <dialog className="dsy-modal" ref={ref}>
        <div className="dsy-modal-box">
          <form method="dialog">
            <button
              type="submit"
              className="dsy-btn dsy-btn-sm dsy-btn-circle dsy-btn-ghost absolute top-2 right-2"
              aria-label="Close"
            >
              <XIcon />
            </button>
          </form>
          {children}
        </div>
        <form method="dialog" className="dsy-modal-backdrop">
          <button type="submit">close</button>
        </form>
      </dialog>,
      document.body,
    );
  },
);
