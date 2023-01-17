import { createPortal } from "react-dom";
import { X } from "react-feather";
interface props {
  children: JSX.Element;
  childrenClassName?: string;
  small?: boolean;
}

const Modal = ({ children, childrenClassName = "", small }: props) => {
  const modalEl = small ? null : document.getElementById("Modal");

  const modalContent: JSX.Element = (
    <div className="absolute top-0 z-[100] h-full w-full">
      <div
        className={`h-full w-full backdrop-blur-md ${small ? "rounded-[32px]" : ""
          } bg-[#151515]/[.5]`}
      />
      <span className="absolute top-6 right-6 cursor-pointer text-white">
        <X size={20} />
      </span>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={childrenClassName}>{children}</div>
      </div>
    </div>
  );

  return modalEl ? createPortal(modalContent, modalEl) : modalContent;
};

export default Modal;
