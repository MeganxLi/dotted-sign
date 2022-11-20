import React, { useEffect, useRef, useState } from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { fileAtom } from "../../jotai";
import DragUpload from "../../components/DragUpload";
import Intro from "../../components/Intro";
import { uploadTypeName } from "../../constants/EnumType";
import EditFile from "./EditFile";
import FinishUpload from "./FinishUpload";

const File = () => {
  const [stepMenu, setStepMenu] = useState<number>(0);
  const [pdfURL, setPdfURL] = useAtom<PrimitiveAtom<canvasType>>(fileAtom);
  const [pdfName, setPdfName] = useState<string>("File");

  useEffect(() => {
    if (pdfURL) return setStepMenu(1);
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

  return <main
    id="File"
  >
    {stepMenu !== 2 && <Intro
      LargeStandard={
        <>
          Anywhere, <br /> anytime.
        </>
      }
      SubStandard="開始簽署您的文件"
    />}
    {stepMenu === 0 && <>
      <div className="card-box w-full p-5">
        <DragUpload
          fileSetting={{ type: uploadTypeName.PDF, size: 20, divHight: "h-[360px]" }}
          fileURL={pdfURL}
          changeFile={(file, name) => { setPdfURL(file); setPdfName(name); }}
        />
      </div></>
    }
    {stepMenu === 1 &&
      <FinishUpload pdfName={pdfName} setPdfName={setPdfName} previousMenu={previousMenu} nextMenu={nextMenu} />
    }
    {
      stepMenu === 2 &&
      <EditFile
        pdfName={pdfName} setPdfName={setPdfName} previousMenu={previousMenu} nextMenu={nextMenu} />
    }
  </main>;
};

export default File;
