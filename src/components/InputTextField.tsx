import React from "react";
import { ReactComponent as EditIcon } from "../assets/svg/edit.svg";

interface props {
  InputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const InputTextField = ({ InputValue, setInputValue }: props) => {
  return (
    <div className="text-field">
      <input
        type="text"
        className="w-full"
        value={InputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <span>
        <EditIcon className="stroke-black" />
      </span>
    </div>
  );
};

export default InputTextField;
