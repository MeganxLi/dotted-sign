import React, { useState } from "react";
import Intro from "../../components/Intro";
import WritingMode from "./WritingMode";

const Sign = () => {
  const [ActiveMenu, setActiveMenu] = useState<number>(0);

  return (
    <div
      className="flex h-screen items-center justify-center gap-24  
     flat:flex-col flat:items-start flat:gap-4 flat:px-6 flat:pt-9"
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
