import { PrimitiveAtom, useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { pdfjs } from "react-pdf";
import { RWDSize } from "../../../constants/EnumType";
import { fileAtom } from "../../../jotai";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const pageScale = 80;

interface props {
  totalPages: number;
  canvasListRef: React.RefObject<HTMLDivElement | null>;
  canvasItemRef: React.MutableRefObject<(HTMLCanvasElement | null)[]>;
  setCanvasIndex: React.Dispatch<React.SetStateAction<number>>;
}

const FileList = ({
  totalPages,
  canvasListRef,
  canvasItemRef,
  setCanvasIndex,
}: props) => {
  const [pdfURL] = useAtom<PrimitiveAtom<pdfFileType[] | null>>(fileAtom);
  const fileUrl: pdfFileType[] = pdfURL || [];
  const pageListRef = useRef<HTMLDivElement>(null);
  const pageItemBlackRef = useRef<HTMLDivElement>(null);
  const pageItemRef = useRef<(HTMLCanvasElement | null)[]>([]);
  const [resizeSize, setResizeSize] = useState<boolean>(false);

  const moveCanvasScroll = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickIndex = Number(e.currentTarget.dataset.count) - 1;
    if (canvasListRef.current) {
      canvasListRef.current.scrollTop =
        (canvasItemRef.current[clickIndex]?.parentElement?.offsetTop || 0) - 4;
    }

    setCanvasIndex(clickIndex);
  };

  const handlePageItem = () => {
    const canvasDiv = pageListRef.current;
    if (!canvasDiv) return;

    for (let i = 0; i < totalPages; i++) {
      const canvasChild = pageItemRef.current[i];
      if (!canvasChild) return;
      const context = canvasChild.getContext("2d");

      // 設定寬度
      const imgSize = fileUrl[i].width / fileUrl[i].height;
      const getDivSize = (pageItemBlackRef.current?.clientWidth || 0) * 0.8;
      // 如果頁面是直(>=1)的使用乘法，如果是橫(<1)的使用除法
      const setWidth = imgSize >= 1 ? getDivSize : getDivSize * imgSize;
      const setHeight = imgSize >= 1 ? getDivSize / imgSize : getDivSize;
      canvasChild.width = setWidth;
      canvasChild.height = setHeight;

      if (!context) return;
      const image = new Image();
      image.src = fileUrl[i].dataURL;
      image.onload = () => {
        context.drawImage(image, 0, 0, setWidth, setHeight);
      };
    }
  };

  useEffect(() => {
    handlePageItem();
  }, [pageListRef, resizeSize]);

  useEffect(() => {
    const handleResize = () => {
      setResizeSize(window.innerWidth >= RWDSize);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      id="FileList"
      className={`flat-list grid gap-4 overflow-y-auto overflow-x-hidden px-6 flat:grid-flow-col 
      flat:justify-start flatMin:grid-cols-2`}
      ref={pageListRef}
    >
      {Array.from({ length: totalPages }).map((item, idx: number) => {
        return (
          <div
            key={idx}
            data-count={idx + 1}
            className={`before:dark-blue relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg 
            bg-green-blue before:absolute before:bottom-0 before:text-sm before:content-[attr(data-count)] 
            hover:border hover:border-solid hover:border-depp-blue/50 flat:h-14 flat:w-14`}
            onClick={moveCanvasScroll}
            ref={pageItemBlackRef}
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
