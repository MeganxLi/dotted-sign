import { PrimitiveAtom, useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { pdfjs, } from "react-pdf";
import { A4Size } from "../../../constants/EnumType";
import { fileAtom } from "../../../jotai";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const pdfScale = 0.7;

interface props {
  totalPages: number
}

const FileList = ({ totalPages }: props) => {
  const [pdfURL] = useAtom<PrimitiveAtom<pdfFileType[] | null>>(fileAtom);
  const fileUrl: pdfFileType[] = pdfURL || [];
  const canvasListRef = useRef<HTMLDivElement>(null);
  const canvasItemRef = useRef<(HTMLCanvasElement | null)[]>([]);

  useEffect(() => {
    const canvasDiv = canvasListRef.current;
    if (!canvasDiv) return;

    for (let i = 0; i < totalPages; i++) {
      const canvasChild = canvasItemRef.current[i];
      if (!canvasChild) return;

      const context = canvasChild.getContext("2d");
      // 設定寬度
      const getDivWidth = canvasDiv.clientWidth / 2 * pdfScale;
      const setWidth = fileUrl[i].orientation === 1 ? getDivWidth * A4Size : getDivWidth;
      const setHeight = fileUrl[i].orientation === 0 ? getDivWidth * A4Size : getDivWidth;
      canvasChild.width = setWidth;
      canvasChild.height = setHeight;

      if (!context) return;
      const image = new Image();
      image.src = fileUrl[i].dataURL;
      image.onload = () => {
        context.drawImage(image, 0, 0, setWidth, setHeight);
      };
    }

  }, [canvasListRef]);

  return (
    <div id="FileList" className="grid grid-cols-2 gap-4" ref={canvasListRef}>
      {Array.from({ length: totalPages }).map((item, idx: number) => {
        return (
          <div key={idx} data-count={idx + 1}
            className="flex items-center justify-center bg-green-blue w-[80px] h-[80px] relative rounded-lg 
            before:content-[attr(data-count)] before:dark-blue  before:absolute before:bottom-0 before:text-sm">
            <canvas ref={(el) => canvasItemRef.current = [...canvasItemRef.current, el]} />
          </div>
        );
      })}
    </div>
  );
};

export default FileList;
