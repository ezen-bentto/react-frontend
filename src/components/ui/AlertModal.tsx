// src/components/ui/AlertModal.tsx
import React from "react";
import { modal, type ModalVariants } from "@/components/style/alertModal";

interface AlertModalProps extends React.DialogHTMLAttributes<HTMLDialogElement>, ModalVariants {
  className?: string;
  children: React.ReactNode;
}

const AlertModal = ({ className, size, intent, children, ...props }: AlertModalProps) => {
  const combinedClass = `${modal({ size, intent })} ${className ?? ""}`.trim();

  return (
    <>
      <button
        className="btn text-brand-primary"
        onClick={() => {
          const modal = document.getElementById("my_modal_1");
          if (modal instanceof HTMLDialogElement) {
            modal.showModal();
          }
        }}
      >
        눌러봥
      </button>
      <dialog id="my_modal_1" className={combinedClass} {...props}>
        <div className="modal-box text-2xl">
          <h3 className="text-4xl font-bold">Hello!</h3>
          <p className="py-4">{children}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AlertModal;
