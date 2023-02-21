import React from "react";
import InputTextField from "../../components/InputTextField";

//svg
import { ReactComponent as PdfIcon } from "../../assets/svg/pdf.svg";
import { Check } from "react-feather";

interface props {
  pdfName: string;
  setPdfName: React.Dispatch<React.SetStateAction<string>>;
  previousMenu: () => void;
  cancelUpload: () => void;
  nextMenu: () => void;
  progressBar: number;
}

const FinishUpload = ({
  pdfName,
  setPdfName,
  previousMenu,
  cancelUpload,
  nextMenu,
  progressBar,
}: props) => {
  return (
    <div id="FinishUpload">
      <div className="card-box w-full p-6">
        <div className="flex w-full gap-6 rounded-2xl bg-pale-blue py-4 px-6">
          <span>
            <PdfIcon />
          </span>
          <div className="grid flex-auto content-between">
            <span className="font-['Roboto_Slab']">{pdfName}</span>
            <span className="text-end font-medium text-blue">
              上傳完成
              <Check
                className="ml-2 inline-block"
                size="16px"
                strokeWidth="4"
              />
            </span>
            <span
              className="col-span-2 row-span-2 mt-2 h-1 bg-blue transition"
              style={{ width: progressBar + "%" }}
            />
          </div>
        </div>
        <div className="mx-6 mt-12 mb-4">
          <p className="mb-4 select-none text-black/50">自訂任務名稱</p>
          <InputTextField InputValue={pdfName} setInputValue={setPdfName} />
        </div>
      </div>
      <div className="two-btn">
        <button className="btn-secodary flex-auto" onClick={previousMenu}>
          重新上傳
        </button>
        {progressBar !== 100 ? (
          <button className="btn-alter flex-auto" onClick={cancelUpload}>
            取消上傳
          </button>
        ) : (
          <button className="btn-primary flex-auto" onClick={nextMenu}>
            下一步
          </button>
        )}
      </div>
    </div>
  );
};

export default FinishUpload;
