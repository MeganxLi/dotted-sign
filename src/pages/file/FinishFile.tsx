import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { Download } from "react-feather";
import InputTextField from "../../components/InputTextField";
import { MessageTexts } from "../../constants/MessageSetting";
import { messageAtom } from "../../jotai";

interface props {
  pdfName: string;
  setPdfName: React.Dispatch<React.SetStateAction<string>>;
  canvasItemRef: React.MutableRefObject<(HTMLCanvasElement | null)[]>;
}

const FinishFile = ({ pdfName, setPdfName, canvasItemRef }: props) => {
  const [, setMessage] = useAtom(messageAtom);
  const firstPage = canvasItemRef.current[0]?.toDataURL("image/png");

  useEffect(() => {
    setMessage({
      open: true,
      icon: "check",
      content: MessageTexts.sign_success,
    });
  }, []);

  return (
    <div id="WritingMode">
      <div className="card-box">
        <div className="mx-8 my-2 flex items-center justify-center rounded-3xl border border-solid border-blue/50 p-6">
          {firstPage ? (
            <img src={firstPage} className="h-44 shadow-pdf" />
          ) : (
            <p className="text-alert-red">影像錯誤，請確認是否已上傳影像</p>
          )}
        </div>
        <div className="px-12">
          <p className="mt-8 mb-4 select-none text-black/50">簽名檔名稱</p>
          <InputTextField InputValue={pdfName} setInputValue={setPdfName} />
        </div>
      </div>
      <div className="two-btn ">
        <button
          className="btn-secodary flex-auto"
          onClick={() =>
            setMessage({
              open: true,
              icon: "warn",
              content: MessageTexts.unopened,
            })
          }
        >
          管理文件
        </button>
        <button className="btn-primary flex flex-auto items-center justify-center gap-3">
          下載此文件 <Download size={20} />
        </button>
      </div>
    </div>
  );
};

export default FinishFile;
