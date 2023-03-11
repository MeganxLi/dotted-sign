import React, { useRef } from 'react'

import { ReactComponent as EditIcon } from '../assets/svg/edit.svg'

interface props {
  InputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const InputTextField = ({ InputValue, setInputValue }: props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }
  return (
    <div className="text-field">
      <input
        type="text"
        className="w-full"
        value={InputValue}
        onChange={(e) => setInputValue(e.target.value)}
        ref={inputRef}
      />
      <span className="cursor-pointer" onClick={handleClick}>
        <EditIcon className="stroke-black" />
      </span>
    </div>
  )
}

export default InputTextField
