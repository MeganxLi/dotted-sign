import React from "react";
import { SignMenuName } from "../../constants/EnumType";

interface props {
  ActiveMenu: number;
  setActiveMenu: React.Dispatch<React.SetStateAction<number>>;
}

const MenuHorizontal = ({ ActiveMenu, setActiveMenu }: props) => {
  return (
    <ul className="mb-6 flex gap-4 border-b border-solid border-b-black/20 px-8">
      {SignMenuName.map((item: string, idx: number) => {
        return (
          <li
            key={item}
            className={`cursor-pointer p-2 text-black/50 hover:text-blue ${
              ActiveMenu === idx &&
              "border-b border-solid border-b-blue text-blue "
            }`}
            onClick={() => setActiveMenu(idx)}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export default MenuHorizontal;
