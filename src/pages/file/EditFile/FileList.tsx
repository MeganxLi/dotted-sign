import { log } from "console";
import { PrimitiveAtom, useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { pdfjs } from "react-pdf";
import { A4Size } from "../../../constants/EnumType";
import { fileAtom } from "../../../jotai";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const pageScale = 80;

interface props {
  totalPages: number;
  canvasListRef: React.RefObject<HTMLDivElement | null>;
  canvasItemRef: React.MutableRefObject<(HTMLCanvasElement | null)[]>;
}

const FileList = ({ totalPages, canvasListRef, canvasItemRef }: props) => {
  const [pdfURL] = useAtom<PrimitiveAtom<pdfFileType[] | null>>(fileAtom);
  const fileUrl: pdfFileType[] = pdfURL || [];
  const pageListRef = useRef<HTMLDivElement>(null);
  const pageItemRef = useRef<(HTMLCanvasElement | null)[]>([]);

  const moveCanvasScroll = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickIndex = Number(e.currentTarget.dataset.count) - 1;
    if (canvasListRef.current)
      canvasListRef.current.scrollTop =
        (canvasItemRef.current[clickIndex]?.parentElement?.offsetTop || 0) - 4;
  };

  useEffect(() => {
    const canvasDiv = pageListRef.current;
    if (!canvasDiv) return;

    for (let i = 0; i < totalPages; i++) {
      const canvasChild = pageItemRef.current[i];
      if (!canvasChild) return;

      const context = canvasChild.getContext("2d");
      // 設定寬度
      console.log(
        fileUrl[i].width,
        fileUrl[i].height,
        fileUrl[i].width / fileUrl[i].height
      );
      const imgSize = fileUrl[i].width / fileUrl[i].height;
      const getDivWidth = pageScale * 0.8;
      const setWidth = imgSize >= 1 ? getDivWidth * imgSize : getDivWidth;
      const setHeight = imgSize >= 1 ? getDivWidth * imgSize : getDivWidth;
      canvasChild.width = setWidth;
      canvasChild.height = setHeight;

      if (!context) return;
      const image = new Image();
      image.src = fileUrl[i].dataURL;
      image.onload = () => {
        context.drawImage(image, 0, 0, setWidth, setHeight);
      };
    }
  }, [pageListRef]);

  return (
    <div
      id="FileList"
      className="grid grid-cols-2 gap-4 overflow-y-auto overflow-x-hidden px-6"
      ref={pageListRef}
    >
      {Array.from({ length: totalPages }).map((item, idx: number) => {
        return (
          <div
            key={idx}
            data-count={idx + 1}
            className={`before:dark-blue relative flex h-[${pageScale}px] w-[${pageScale}px] 
            cursor-pointer items-center justify-center 
            rounded-lg bg-green-blue  before:absolute before:bottom-0 before:text-sm before:content-[attr(data-count)]`}
            onClick={moveCanvasScroll}
          >
            <canvas
              ref={(el) => (pageItemRef.current = [...pageItemRef.current, el])}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FileList;
