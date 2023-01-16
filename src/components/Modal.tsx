
import { createPortal } from "react-dom";
import { X } from "react-feather";
interface props {
  children: JSX.Element;
}

const Modal = ({ children }: props) => {

  const modalEl = document.getElementById("Modal");
  const modalContent: JSX.Element = (
    <div className="absolute w-full h-full top-0">
      <div className="bg-[#151515]/[.5] w-full h-full" />
      <span className="text-white absolute top-6 right-6 cursor-pointer"><X size={20} /></span>
      {children}
    </div>
  );

  return modalEl ? createPortal(modalContent, modalEl) : null;
};

export default Modal;
