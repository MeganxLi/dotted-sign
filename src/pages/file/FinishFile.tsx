import { PrimitiveAtom, useAtom } from "jotai";
import React, { useEffect } from "react";
import { Download } from "react-feather";
import InputTextField from "../../components/InputTextField";
import { MessageTexts } from "../../constants/MessageSetting";
import { fileAtom, messageAtom } from "../../jotai";
import { Document, Page, Image, PDFDownloadLink } from "@react-pdf/renderer";

interface props {
  pdfName: string;
  setPdfName: React.Dispatch<React.SetStateAction<string>>;
  finishPdf: (HTMLCanvasElement | null)[];
  totalPages: number;
}

const FinishFile = ({ pdfName, setPdfName, finishPdf, totalPages }: props) => {
  const [, setMessage] = useAtom(messageAtom);
  const [pdfURL] = useAtom<PrimitiveAtom<pdfFileType[] | null>>(fileAtom);
  const firstPage = finishPdf[0]?.toDataURL("image/png");

  const createCanvasItem = (): JSX.Element => (
    <Document>
      {Array.from({ length: totalPages }).map((_, idx: number) => {
        if (!pdfURL) return;
        return (
          <Page
            key={idx}
            size={{ width: pdfURL[idx].width, height: pdfURL[idx].height }}
          >
            <Image src={finishPdf[idx]?.toDataURL("image/png")} />
          </Page>
        );
      })}
    </Document>
  );

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
        <PDFDownloadLink
          document={createCanvasItem()}
          fileName={pdfName}
          className="btn-primary flex flex-auto items-center justify-center gap-3"
        >
          下載此文件 <Download size={20} />
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default FinishFile;
