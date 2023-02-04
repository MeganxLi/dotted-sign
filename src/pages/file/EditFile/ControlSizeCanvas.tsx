import { useEffect, useRef, useState } from "react";
import { ChevronDown, Minus, Plus } from "react-feather";

const sizeOption: number[] = [25, 50, 75, 100];

interface props {
  onSelectSize: number;
  setOnSelectSize: React.Dispatch<React.SetStateAction<number>>;
}

const ControlSizeCanvas = ({ onSelectSize, setOnSelectSize }: props) => {
  const dropdownRef = useRef<HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const clickSelectSize = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setOnSelectSize(Number(e.currentTarget.dataset.order));
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target as HTMLElement)
      ) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div
      className="absolute right-3 bottom-2 flex 
    items-center gap-4 rounded-[8px] bg-white px-2 py-3 shadow-base"
    >
      <span
        className="relative cursor-pointer after:absolute
        after:top-0 after:right-[-8px] after:block after:h-4 after:w-[1px] after:bg-black/20 hover:text-blue"
      >
        <Plus size={16} />
      </span>
      <span className="cursor-pointer hover:text-blue">
        <Minus size={16} />
      </span>
      <span
        className="Roboto-Slab relative flex text-right font-medium"
        ref={dropdownRef}
      >
        <div
          onClick={() => setOpenMenu(!openMenu)}
          className="flex cursor-pointer hover:text-blue"
        >
          <span className="Roboto-Slab w-[40px]">{onSelectSize}%</span>
          <ChevronDown size={16} />
        </div>

        <ul
          className={`absolute bottom-8 cursor-pointer rounded-[8px] bg-white p-3 shadow-base ${
            openMenu ? "block" : "hidden"
          }`}
        >
          {sizeOption.map((size: number) => (
            <li
              className="hover:text-blue [&:not(:last-child)]:mb-2"
              key={size}
              data-order={size}
              onClick={clickSelectSize}
            >
              {size}%
            </li>
          ))}
        </ul>
      </span>
    </div>
  );
};

export default ControlSizeCanvas;
