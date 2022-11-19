import React, { useEffect, useState } from "react";
import DragUpload from "../../components/DragUpload";
import Intro from "../../components/Intro";
import { uploadTypeName } from "../../constants/EnumType";
import FinishUpload from "./FinishUpload";

const File = () => {
  const [stepMenu, setStepMenu] = useState<number>(0);
  const [pdfURL, setPdfURL] = useState<string | ArrayBuffer | null>(null);
  const [pdfName, setPdfName] = useState<string>("File");

  useEffect(() => {
    if (pdfURL) setStepMenu(1);
  }, [pdfURL]);

  const previousMenu = () => {
    switch (stepMenu) {
      case 1:
        setPdfURL(null);
        break;

      default:
        break;
    }
    setStepMenu(perv => perv - 1);
  };

  const nextMenu = () => {

    setStepMenu(perv => perv + 1);
  };

  return <div
    className="flexMin:justify-center flex h-screen items-center gap-24  
    flat:flex-col flat:items-start flat:gap-4 flat:px-6 flat:pt-9"
  >
    <Intro
      LargeStandard={
        <>
          Anywhere, <br /> anytime.
        </>
      }
      SubStandard="開始簽署您的文件"
    />
    {stepMenu === 0 &&
      <div className="card-box w-full p-5">
        <DragUpload
          fileSetting={{ type: uploadTypeName.PDF, size: 20, divHight: "h-[360px]" }}
          fileURL={pdfURL}
          changeFile={(file, name) => { setPdfURL(file); setPdfName(name); }}
        />
      </div>
    }
    {stepMenu === 1 &&
      <FinishUpload pdfName={pdfName} setPdfName={setPdfName} previousMenu={previousMenu} nextMenu={nextMenu} />
    }
  </div>;
};

export default File;
