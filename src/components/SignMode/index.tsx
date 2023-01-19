import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadMode from "./UploadMode";
import WritingMode from "./WritingMode";

interface props {
  onlySendBtn?: boolean;
  clickStartSignBtn?: (event: React.MouseEvent<HTMLElement>) => void
}

const SignMode = ({ onlySendBtn, clickStartSignBtn }: props) => {
  // router
  const navigate = useNavigate();
  const [ActiveMenu, setActiveMenu] = useState<number>(0);

  const handleClickStartBtn = (e: React.MouseEvent<HTMLElement>) => {
    clickStartSignBtn ? clickStartSignBtn(e) : navigate("/");
  };

  return (
    <React.Fragment>
      {ActiveMenu === 0 ? (
        <WritingMode
          ActiveMenu={ActiveMenu}
          setActiveMenu={setActiveMenu}
          onlySendBtn={onlySendBtn}
          clickStartSignBtn={handleClickStartBtn}
        />
      ) : (
        <UploadMode
          ActiveMenu={ActiveMenu}
          setActiveMenu={setActiveMenu}
          onlySendBtn={onlySendBtn}
          clickStartSignBtn={handleClickStartBtn}
        />
      )}
    </React.Fragment>
  );
};

export default SignMode;
