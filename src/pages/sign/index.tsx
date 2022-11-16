import React from "react";
import Intro from "../../components/Intro";
import WritingMode from "./WritingMode";

const Sign = () => {
  return (
    <div className="h-screen bg-no-repeat bg-fixed bg-center bg-cover bg-sign-cover bg-light-blue 
    flex items-center justify-center gap-24" >
      <Intro LargeStandard={<>Go green <br /> today.</>} SubStandard="創建您的第一枚電子簽名" />
      <WritingMode />
    </div>
  );
};

export default Sign;
