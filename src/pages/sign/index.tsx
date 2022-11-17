import React, { useState } from "react";
import Intro from "../../components/Intro";
import WritingMode from "./WritingMode";

const Sign = () => {
  const [ActiveMenu, setActiveMenu] = useState<number>(0);

  return (
    <div
      className="bg-sign-cover flex h-screen items-center justify-center gap-24 bg-light-blue 
    bg-cover bg-fixed bg-center bg-no-repeat"
    >
      <Intro
        LargeStandard={
          <>
            Go green <br /> today.
          </>
        }
        SubStandard="創建您的第一枚電子簽名"
      />
      <WritingMode ActiveMenu={ActiveMenu} setActiveMenu={setActiveMenu} />
    </div>
  );
};

export default Sign;
