import React, { useState } from "react";
import Intro from "../../components/Intro";
import UploadMode from "./UploadMode";
import WritingMode from "./WritingMode";

const Sign = () => {
  const [ActiveMenu, setActiveMenu] = useState<number>(0);

  return (
    <main id="Sign">
      <Intro
        LargeStandard={
          <>
            Go green <br /> today.
          </>
        }
        SubStandard="創建您的第一枚電子簽名"
      />
      {ActiveMenu === 0 ? (
        <WritingMode ActiveMenu={ActiveMenu} setActiveMenu={setActiveMenu} />
      ) : (
        <UploadMode ActiveMenu={ActiveMenu} setActiveMenu={setActiveMenu} />
      )}
    </main>
  );
};

export default Sign;
