import React from 'react'

import { ReactComponent as GridIcon } from '../../../assets/svg/grid.svg'
import { ReactComponent as WritingIcon } from '../../../assets/svg/writing.svg'

interface props {
  isActiveMenu: boolean;
  setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>;
}
const ZoomKit = ({ isActiveMenu, setActiveMenu }: props) => (
  <div
    className="bottom-4 right-6 hidden h-[40px] w-[40px] cursor-pointer items-center
    justify-center rounded-[8px] bg-white shadow-base flat:absolute flat:flex"
    onClick={() => setActiveMenu(!isActiveMenu)}
  >
    {isActiveMenu ? (
      <span>
        <GridIcon />
      </span>
    ) : (
      <span>
        <WritingIcon className="stroke-blue" />
      </span>
    )}
  </div>
)

export default ZoomKit
