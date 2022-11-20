import React, { useEffect, useRef, useState } from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { fileAtom } from "../../jotai";
import { fabric } from "fabric";
import InputTextField from "../../components/InputTextField";
import FileList from "./EditFile/FileList";

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
  const containerRef = useRef<HTMLInputElement | null>(null);

  /** 建立主要的 canvas */
  useEffect(() => {
    const c = new fabric.Canvas(mainRef.current);
    console.log("c---", c);
    setCanvas(c);
  }, [mainRef]);

  /** 填上背景檔案 */
  useEffect(() => {
    if (canvas && pdfURL) {
      // const fabricCanvas = new fabric.Canvas(mainRef.current);
      // const canvasParent = mainRef?.current?.parentElement;

      // //計算 className canvas-container 長寬度
      // if (!canvasParent) return;
      // const fabricWidth = fabricCanvas.getWidth();
      // const fabricHeight = fabricCanvas.getHeight();
      // const cssWidth = Math.min(canvasParent.clientWidth, fabricWidth);

      fabric.Image.fromURL(pdfURL.toString(), (img) => {
        canvas.setBackgroundImage(pdfURL as string, () => ({})).renderAll();
        canvas.setHeight(img.height ?? 0);
        canvas.setWidth(img.width ?? 0);
        canvas.setDimensions({
          // width: (cssWidth) + "px",
          // height: cssWidth / (fabricWidth / fabricHeight) + "px"
          width: "595px",
          height: "841px"
        }, { cssOnly: true }).requestRenderAll();

        // scaleAndPositionImage(img);
      });

    }
  }, [canvas, pdfURL]);

  return (
    <div className="grid w-full rounded-[32px] bg-green-blue gap grid-cols-[220px_1fr_220px]">
      <div className="edit-file-field">
        <InputTextField InputValue={pdfName} setInputValue={setPdfName} />
      </div>
      <div ref={containerRef}>
        <canvas ref={mainRef} className="canvas-style" style={{
          width: "595px",
          height: "841.5px"
        }}></canvas>
      </div>
      <div className="edit-file-field">
        <FileList />
      </div>
    </div>
  );
};

export default EditFile;
