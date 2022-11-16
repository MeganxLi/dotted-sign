import React from "react";
import { ReactComponent as EditIcon } from "../assets/svg/edit.svg";

const InputTextField = () => {
  return (
    <div className="text-field" >
      <input type="text"
        className="w-full"
      />
      <span><EditIcon className="stroke-black" /></span>
    </div>
  );
};

export default InputTextField;
