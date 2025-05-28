interface ModalProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  className?: string;
  children: React.ReactNode;
}

const AlertModal = ({ className, children, ...props }: ModalProps) => {
  const baseClass = "modal";
  const combinedClass = `${baseClass} ${className}`.trim();

  return (
    <>
      <button
        className="btn text-my-primary"
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
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
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
