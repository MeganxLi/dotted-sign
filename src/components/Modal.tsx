/* eslint-disable no-nested-ternary */
import { useAtom } from 'jotai'
import { createPortal } from 'react-dom'
import { X } from 'react-feather'

import { openModalAtom } from '../jotai'

interface props {
  children: JSX.Element;
  childrenClassName?: string;
  small?: boolean;
}

const Modal = ({ children, childrenClassName = '', small }: props) => {
  const [openModal, setOpenModal] = useAtom(openModalAtom)
  const modalEl = small ? null : document.getElementById('Modal')

  const modalContent: JSX.Element = (
    <div className="absolute top-0 z-[100] h-full w-full">
      <div
        className={`h-full w-full backdrop-blur-md ${small ? 'rounded-md' : ''} bg-[#151515]/[.5]`}
        onClick={() => setOpenModal(false)}
      />
      <span
        className="absolute top-6 right-6 cursor-pointer text-white"
        onClick={() => setOpenModal(false)}
      >
        <X size={20} />
      </span>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className={`pointer-events-auto ${childrenClassName}`}>
          {children}
        </div>
      </div>
    </div>
  )

  return openModal ? (
    modalEl ? (
      createPortal(modalContent, modalEl)
    ) : (
      modalContent
    )
  ) : (
    <></>
  )
}

export default Modal
