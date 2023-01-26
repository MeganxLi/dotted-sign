import { useAtom } from "jotai";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageTexts } from "../../constants/MessageSetting";
import { messageAtom } from "../../jotai";
import UploadMode from "./UploadMode";
import WritingMode from "./WritingMode";

interface props {
  onlySendBtn?: boolean;
  clickStartSignBtn?: (event: React.MouseEvent<HTMLElement>) => void
}

const SignMode = ({ onlySendBtn = false, clickStartSignBtn }: props) => {
  // router
  const navigate = useNavigate();
  const [ActiveMenu, setActiveMenu] = useState<number>(0);
  const [, setMessage] = useAtom(messageAtom);

  const handleClickStartBtn = (e: React.MouseEvent<HTMLElement>) => {
    clickStartSignBtn ? clickStartSignBtn(e) : navigate("/");
  };

  const handleOnlyBtnElement: JSX.Element = (onlySendBtn ? <></> :
    <button
      className="btn-secodary flex-auto"
      onClick={() => setMessage({
        open: true,
        icon: "warn",
        content: MessageTexts.unopened,
      })}
    >
      管理簽名
    </button>
  );

  const handleSaveBtnMessage = () => {
    setMessage({
      open: true,
      icon: "check",
      content: MessageTexts.create,
    });
  };

  return (
    <React.Fragment>
      {ActiveMenu === 0 ? (
        <WritingMode
          ActiveMenu={ActiveMenu}
          setActiveMenu={setActiveMenu}
          clickStartSignBtn={handleClickStartBtn}
          handleOnlyBtnElement={handleOnlyBtnElement}
          handleSaveBtnMessage={handleSaveBtnMessage}
        />
      ) : (
        <UploadMode
          ActiveMenu={ActiveMenu}
          setActiveMenu={setActiveMenu}
          clickStartSignBtn={handleClickStartBtn}
          handleOnlyBtnElement={handleOnlyBtnElement}
          handleSaveBtnMessage={handleSaveBtnMessage}
        />
      )}
    </React.Fragment>
  );
};

export default SignMode;
