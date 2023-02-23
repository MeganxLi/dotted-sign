import { PrimitiveAtom, useAtom } from "jotai";
import React from "react";
import { Download } from "react-feather";
import InputTextField from "../../components/InputTextField";
import { MessageTexts } from "../../constants/MessageSetting";
import { fileAtom, messageAtom } from "../../jotai";

interface props {
  pdfName: string;
  setPdfName: React.Dispatch<React.SetStateAction<string>>;
}

const FinishFile = ({ pdfName, setPdfName }: props) => {
  const [, setMessage] = useAtom(messageAtom);
  const [pdfURL] = useAtom<PrimitiveAtom<pdfFileType[] | null>>(fileAtom);

  return (
    <div id="WritingMode">
      <div className="card-box">
        <div className="mx-8 my-2 flex items-center justify-center rounded-3xl border border-solid border-blue/50 p-4">
          <img src="https://autos.yahoo.com.tw/p/r/w880/car-trim/August2020/d303d03c67a9add0d2df10acd7acadea.jpeg" />
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
