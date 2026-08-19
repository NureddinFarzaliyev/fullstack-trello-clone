import { useRef, type ReactNode } from "react";

const Modal = ({
  button,
  content,
  submitBtn,
}: {
  button?: React.ReactNode;
  content?: ReactNode;
  submitBtn?: ReactNode;
}) => {
  const modal = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button onClick={() => modal.current?.showModal()}>{button}</button>
      <dialog
        id="my_modal_1"
        ref={modal}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div>{content}</div>
          <div className="modal-action">
            <form method="dialog">
              {submitBtn ? submitBtn : null}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
