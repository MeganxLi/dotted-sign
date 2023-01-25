import { createPortal } from "react-dom";
import { useAtom } from "jotai";
import { openModalAtom } from "../jotai";
import { X } from "react-feather";
interface props {
  children: JSX.Element;
  childrenClassName?: string;
  small?: boolean;
}

const Modal = ({ children, childrenClassName = "", small }: props) => {
  const [openModal, setOpenModal] = useAtom(openModalAtom);
  const modalEl = small ? null : document.getElementById("Modal");

  const modalContent: JSX.Element = (
    <div className={"absolute top-0 z-[100] h-full w-full"}>
      <div
        className={`h-full w-full backdrop-blur-md ${small ? "rounded-[32px]" : ""
          } bg-[#151515]/[.5]`}
        onClick={() => setOpenModal(false)}
      />
      <span
        className="absolute top-6 right-6 cursor-pointer text-white"
        onClick={() => setOpenModal(false)}
      >
        <X size={20} />
      </span>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`pointer-events-auto ${childrenClassName}`}>{children}</div>
      </div>
    </div>
  );

  return openModal ? (modalEl ? createPortal(modalContent, modalEl) : modalContent) : <></>;
};

export default Modal;
