import React, { useEffect, useRef, useState } from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { fileAtom } from "../../jotai";
import { fabric } from "fabric";
import InputTextField from "../../components/InputTextField";
import FileList from "./EditFile/FileList";
import TabPanel from "./EditFile/TabPanel";

interface props {
  pdfName: string;
  setPdfName: React.Dispatch<React.SetStateAction<string>>;
  previousMenu: () => void;
  nextMenu: () => void;
}

const EditFile = ({ pdfName, setPdfName, previousMenu, nextMenu }: props) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [pdfURL] = useAtom<PrimitiveAtom<canvasType>>(fileAtom);
  const mainRef = useRef<HTMLCanvasElement>(null);

  /** 建立主要的 canvas */
  useEffect(() => {
    const c = new fabric.Canvas(mainRef.current);
    setCanvas(c);
  }, [mainRef]);

  /** 填上背景檔案 */
  useEffect(() => {
    if (canvas && pdfURL) {
      // const fabricCanvas = new fabric.Canvas(mainRef.current);
      // const canvasParent = mainRef?.current?.parentElement;

      // // //計算 className canvas-container 長寬度
      // if (!canvasParent) return;
      // const A4Size = 297 / 210;
      // const fabricWidth = fabricCanvas.getWidth();
      // const fabricHeight = fabricCanvas.getHeight();
      // const cssWidth = Math.min(canvasParent.clientWidth, fabricWidth);
      // console.log(fabricWidth, fabricHeight, cssWidth);

      fabric.Image.fromURL(pdfURL.toString(), (img) => {
        canvas.setBackgroundImage(pdfURL as string, () => ({})).renderAll();
        canvas.setHeight(img.height ?? 0);
        canvas.setWidth(img.width ?? 0);
        canvas.setDimensions({
          // width: (cssWidth) + "px",
          // height: cssWidth / (fabricWidth / fabricHeight) + "px"
          width: "424px",
          height: "600px"
        }, { cssOnly: true }).requestRenderAll();

        // scaleAndPositionImage(img);
      });

    }
  }, [canvas, pdfURL]);

  return (
    <div className="grid w-[68%]  gap grid-cols-[220px_100%_220px] not-w">
      <div className="edit-file-field rounded-l-[32px] grid gap-8">
        <InputTextField InputValue={pdfName} setInputValue={setPdfName} />
        <TabPanel />
      </div>
      <div className="flex items-start justify-center bg-green-blue">
        <canvas ref={mainRef} className="canvas-style"></canvas>
      </div>
      <div className="edit-file-field rounded-r-[32px] flex flex-col justify-between">
        <FileList />
        <div className="flex flex-col gap-4">
          <button className="btn-primary flex-auto">下一步</button>
          <button className="btn-secodary flex-auto">取消</button>
        </div>
      </div>
    </div>
  );
};

export default EditFile;
