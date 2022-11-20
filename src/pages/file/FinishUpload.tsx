import React from "react";
import InputTextField from "../../components/InputTextField";

//svg
import { ReactComponent as PdfIcon } from "../../assets/svg/pdf.svg";
import { Check } from "react-feather";

interface props {
  pdfName: string;
  setPdfName: React.Dispatch<React.SetStateAction<string>>;
  previousMenu: () => void;
  nextMenu: () => void;
}
const FinishUpload = ({ pdfName, setPdfName, previousMenu, nextMenu }: props) => {
  return (
    <div id="FinishUpload" >
      <div className="card-box w-full p-6">
        <div className="flex w-full gap-6 bg-pale-blue py-4 px-6 rounded-2xl">
          <span>
            <PdfIcon />
          </span>
          <div className="flex-auto grid content-between">
            <span className="font-['Roboto_Slab']">{pdfName}</span>
            <span className="text-blue font-medium text-end">
              上傳完成
              <Check className="inline-block ml-2" size="16px" strokeWidth="4" />
            </span>
            <span className="w-full h-1 bg-blue row-span-2 col-span-2 mt-2"></span>
          </div>
        </div>
        <div className="mx-6 mt-12 mb-4">
          <p className="mb-4 select-none text-black/50">自訂任務名稱</p>
          <InputTextField InputValue={pdfName} setInputValue={setPdfName} />
        </div>
      </div>
      <div className="two-btn">
        <button
          className="btn-secodary flex-auto"
          onClick={previousMenu}
        >
          重新上傳
        </button>
        <button
          className="btn-primary flex-auto"
          onClick={nextMenu}
        >
          下一步
        </button>
      </div>
    </div>
  );
};

export default FinishUpload;
