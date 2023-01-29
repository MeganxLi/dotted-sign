import React, { useEffect, useRef, useState } from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { addCanvasAtom, fileAtom, openModalAtom } from "../../jotai";
import { fabric } from "fabric";
import InputTextField from "../../components/InputTextField";
import FileList from "./EditFile/FileList";
import TabPanel from "./EditFile/TabPanel";
import Modal from "../../components/Modal";
import { RWDSize } from "../../constants/EnumType";
import SignMode from "../../components/SignMode";

interface props {
  pdfName: string;
  setPdfName: React.Dispatch<React.SetStateAction<string>>;
  cancelFile: () => void;
  totalPages: number;
}

const EditFile = ({ pdfName, setPdfName, cancelFile, totalPages }: props) => {
  // useAtom
  const [pdfURL] = useAtom<PrimitiveAtom<pdfFileType[] | null>>(fileAtom);
  const [addSignURL] = useAtom(addCanvasAtom);
  const [, setOpenModal] = useAtom(openModalAtom);

  const mainRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const screenHeight = screen.height - 400;
  const [smallModal, setSmallModal] = useState<boolean>(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  /** 建立主要的 canvas */
  useEffect(() => {
    const c = new fabric.Canvas(mainRef.current);
    setCanvas(c);
  }, [mainRef]);

  /** 填上簽名 */
  useEffect(() => {
    if (canvas && addSignURL) {
      fabric.Image.fromURL(addSignURL.toString(), (img) => {
        img.scaleToWidth(100);
        img.scaleToHeight(100);
        canvas.add(img).renderAll();
      });
    }
  }, [canvas, addSignURL]);

  /** 填上背景檔案 */
  useEffect(() => {
    console.log("pdfURL", pdfURL);

    if (canvas && pdfURL) {
      //計算 className canvas-container 長寬度
      const screenHeight = screen.height - 400;
      const A4Size = 210 / 297;

      fabric.Image.fromURL(pdfURL[0].toString(), (img) => {
        canvas.setBackgroundImage(pdfURL[0].dataURL as string, () => ({})).renderAll();
        canvas.setHeight(img.height ?? 0);
        canvas.setWidth(img.width ?? 0);
        canvas
          .setDimensions(
            {
              // width: (cssWidth) + "px",
              // height: cssWidth / (fabricWidth / fabricHeight) + "px"
              // width: "424px",
              // height: "600px",
              width: screenHeight * A4Size + "px",
              height: screenHeight + "px",
            },
            { cssOnly: true }
          )
          .requestRenderAll();

        // scaleAndPositionImage(img);
      });
    }
  }, [canvas, pdfURL]);

  useEffect(() => {
    const handleResize = () => {
      setSmallModal(window.innerWidth >= RWDSize);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="gap not-w h-[70vh] relative grid w-screen grid-cols-[220px_auto_220px]">
      <div className="edit-file-field grid grid-rows-[repeat(3,_min-content)] gap-8 rounded-l-[32px]">
        <InputTextField InputValue={pdfName} setInputValue={setPdfName} />
        <TabPanel />
      </div>
      <div className="flex items-start justify-center bg-green-blue">
        <canvas ref={mainRef} className="canvas-style" height={screenHeight} />
      </div>
      <div className="edit-file-field flex flex-col justify-between rounded-r-[32px] gap-8">
        <FileList totalPages={totalPages} />
        <div className="flex flex-col gap-4">
          <button className="btn-primary flex-auto">下一步</button>
          <button className="btn-secodary flex-auto" onClick={cancelFile}>
            取消
          </button>
        </div>
      </div>
      <Modal childrenClassName="w-[580px]" small={smallModal}>
        <React.Fragment>
          <SignMode
            onlySendBtn={true}
            clickStartSignBtn={closeModal}
          />
          <p className="pt-8 text-white text-center text-xs" onClick={closeModal}>點擊畫面任一處離開</p>
        </React.Fragment>
      </Modal>
    </div>
  );
};

export default EditFile;
