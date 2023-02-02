import { useEffect, useRef, useState } from "react";
import { ChevronDown, Minus, Plus } from "react-feather";

const sizeOption: number[] = [25, 50, 75, 100];

const ControlSizeCanvas = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const clickMenu = () => {
    console.log("click");

    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    console.log("openMenu", openMenu);
  }, [openMenu]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target as HTMLElement)
      ) {
        console.log(!dropdownRef.current.contains(e.target as HTMLElement));

        setOpenMenu(false);
      }
    };

    if (openMenu) {
      console.log("openMenu uef", openMenu);

      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [openMenu, dropdownRef]);

  return (
    <div
      className="absolute right-3 bottom-2 flex cursor-pointer 
    items-center gap-4 rounded-[8px] bg-white px-2 py-3 shadow-base"
    >
      <span
        className="relative
        after:absolute after:top-0 after:right-[-8px] after:block after:h-4 after:w-[1px] after:bg-black/20"
      >
        <Plus size={16} />
      </span>
      <span>
        <Minus size={16} />
      </span>
      <span className="Roboto-Slab relative flex  text-right font-medium">
        <span className="Roboto-Slab w-[40px]" onClick={clickMenu}>
          10%
        </span>
        <span onClick={clickMenu}>
          <ChevronDown size={16} />
        </span>
        <ul
          className={`absolute bottom-8 rounded-[8px] bg-white p-3 shadow-base ${
            openMenu ? "block" : "hidden"
          }`}
          ref={dropdownRef}
        >
          {sizeOption.map((size: number) => (
            <li
              className="hover:text-blue [&:not(:last-child)]:mb-2"
              key={size}
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
