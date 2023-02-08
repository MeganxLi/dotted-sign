import React, { useEffect, useRef, useState } from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { addCanvasAtom, fileAtom, openModalAtom } from "../../jotai";
import { fabric } from "fabric";
import InputTextField from "../../components/InputTextField";
import FileList from "./EditFile/FileList";
import TabPanel from "./EditFile/TabPanel";
import Modal from "../../components/Modal";
import { A4Size, RWDSize } from "../../constants/EnumType";
import SignMode from "../../components/SignMode";
import ControlSizeCanvas from "./EditFile/ControlSizeCanvas";

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

  const bgRef = useRef<HTMLDivElement>(null);
  const canvasListRef = useRef<HTMLDivElement | null>(null);
  const canvasItemRef = useRef<(HTMLCanvasElement | null)[]>([]);
  const [canvas, setCanvas] = useState<fabric.Canvas[]>([]);
  const [smallModal, setSmallModal] = useState<boolean>(false);
  const [onSelectSize, setOnSelectSize] = useState<number>(1);

  const closeModal = () => {
    setOpenModal(false);
  };

  /** 建立主要的 canvas */
  useEffect(() => {
    for (let i = 0; i < totalPages; i++) {
      console.log("canvasItemRef", canvasItemRef.current[i]);

      const c: fabric.Canvas = new fabric.Canvas(canvasItemRef.current[i]);
      setCanvas((prev) => [...prev, c]);
    }
  }, [canvasItemRef]);

  /** 填上簽名 */
  useEffect(() => {
    fabric.Image.fromURL(addSignURL.toString(), (img) => {
      img.scaleToWidth(100);
      img.scaleToHeight(100);
      // canvas[0].add(img).renderAll();
    });
  }, [canvas, addSignURL]);

  /** 填上背景檔案 */
  useEffect(() => {
    if (pdfURL && bgRef.current) {
      for (let i = 0; i < totalPages; i++) {
        {
          //計算 className canvas-container 長寬度
          const screenHeight = bgRef.current.scrollHeight * onSelectSize;
          const screenWidth = bgRef.current.scrollWidth * onSelectSize;

          const bgImage = pdfURL[i].dataURL;
          // console.log("canvas[i]", canvas[i]);
          if (!canvas[i]) return;

          fabric.Image.fromURL(bgImage, (img) => {
            canvas[i].setBackgroundImage(bgImage, () => canvas[i].renderAll());
            console.log("img---", img);
            canvas[i].setHeight(img.height ?? 0);
            canvas[i].setWidth(img.width ?? 0);
            canvas[i]
              .setDimensions(
                {
                  width:
                    (pdfURL[0].orientation === 1
                      ? screenHeight * A4Size
                      : screenWidth) + "px",
                  height:
                    (pdfURL[0].orientation === 1
                      ? screenHeight
                      : screenWidth * A4Size) + "px",
                },
                { cssOnly: true }
              )
              .requestRenderAll();

            // scaleAndPositionImage(img);
          });
        }
      }
    }
  }, [canvas, pdfURL, onSelectSize]);

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
    <div className="gap not-w relative grid h-[70vh] w-screen grid-cols-[220px_auto_220px]">
      <div className="edit-file-field grid grid-rows-[repeat(3,_min-content)] gap-8 rounded-l-md  px-6">
        <InputTextField InputValue={pdfName} setInputValue={setPdfName} />
        <TabPanel />
      </div>
      <div
        className="relative flex h-inherit w-full items-start bg-green-blue"
        ref={bgRef}
      >
        <div
          className="grid h-inherit w-full gap-4 overflow-auto py-4"
          ref={canvasListRef}
        >
          {Array.from({ length: totalPages }).map((_, idx: number) => {
            return (
              <canvas
                ref={(el) =>
                  (canvasItemRef.current = [...canvasItemRef.current, el])
                }
                className="canvas-style"
                height={bgRef.current?.clientHeight}
                key={idx}
              />
            );
          })}
        </div>
        <ControlSizeCanvas
          onSelectSize={onSelectSize}
          setOnSelectSize={setOnSelectSize}
        />
      </div>
      <div className="edit-file-field flex flex-col justify-between gap-8 rounded-r-md">
        <FileList
          totalPages={totalPages}
          canvasListRef={canvasListRef}
          canvasItemRef={canvasItemRef}
        />
        <div className="flex flex-col gap-4 px-6">
          <button className="btn-primary flex-auto">下一步</button>
          <button className="btn-secodary flex-auto" onClick={cancelFile}>
            取消
          </button>
        </div>
      </div>
      <Modal childrenClassName="w-[580px]" small={smallModal}>
        <React.Fragment>
          <SignMode onlySendBtn={true} clickStartSignBtn={closeModal} />
          <p
            className="pt-8 text-center text-xs text-white"
            onClick={closeModal}
          >
            點擊畫面任一處離開
          </p>
        </React.Fragment>
      </Modal>
    </div>
  );
};

export default EditFile;
