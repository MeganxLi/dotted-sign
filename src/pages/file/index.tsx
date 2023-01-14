import { useEffect, useState } from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { fileAtom } from "../../jotai";
import DragUpload from "../../components/DragUpload";
import Intro from "../../components/Intro";
import { uploadTypeName } from "../../constants/EnumType";
import EditFile from "./EditFile";
import FinishUpload from "./FinishUpload";
import { FileNameDefault } from "../../constants/FileSetting";

const File = () => {
  const [stepMenu, setStepMenu] = useState<number>(0);
  const [pdfURL, setPdfURL] = useAtom<PrimitiveAtom<string[] | null>>(fileAtom);
  const [pdfName, setPdfName] = useState<string>(FileNameDefault);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    document.body.classList.add("file");
    document.body.classList.remove("sign");
    return () => {
      //離開頁面清空
      setPdfURL(null);
    };
  }, []);

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
    setStepMenu((perv) => perv - 1);
  };

  const nextMenu = () => {
    setStepMenu((perv) => perv + 1);
  };

  const cancelFile = () => {
    setStepMenu(0);
    setPdfURL(null);
    setPdfName(FileNameDefault);
  };

  return (
    <main
      id="File"
      className={`${stepMenu === 2 ? "w-screen justify-start" : undefined}`}
    >
      {stepMenu !== 2 && (
        <Intro
          LargeStandard={
            <>
              Anywhere, <br /> anytime.
            </>
          }
          SubStandard="開始簽署您的文件"
        />
      )}
      {stepMenu === 0 && (
        <>
          <div className="card-box w-full p-5">
            <DragUpload
              fileSetting={{
                type: uploadTypeName.PDF,
                size: 20,
                divHight: "h-[360px]",
              }}
              fileURL={pdfURL}
              changeFile={(file, name, totalPages) => {
                if (Array.isArray(file)) {
                  setPdfURL(file);
                  setPdfName(name);
                  setTotalPages(totalPages || 0);
                }
              }}
            />
          </div>
        </>
      )}
      {stepMenu === 1 && (
        <FinishUpload
          pdfName={pdfName}
          setPdfName={setPdfName}
          previousMenu={previousMenu}
          nextMenu={nextMenu}
        />
      )}
      {stepMenu === 2 && (
        <EditFile
          pdfName={pdfName}
          setPdfName={setPdfName}
          cancelFile={cancelFile}
          totalPages={totalPages}
        />
      )}
    </main>
  );
};

export default File;
