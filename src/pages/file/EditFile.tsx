import React, { useEffect, useRef, useState } from "react";
import { PrimitiveAtom, useAtom } from "jotai";
import { fileAtom, openModalAtom } from "../../jotai";
import { fabric } from "fabric";
import InputTextField from "../../components/InputTextField";
import FileList from "./EditFile/FileList";
import TabPanel from "./EditFile/TabPanel";
import Modal from "../../components/Modal";
import { RWDSize } from "../../constants/EnumType";
import SignMode from "../../components/SignMode";
import ControlSizeCanvas from "./EditFile/ControlSizeCanvas";
import ZoomKit from "./EditFile/ZoomKit";
import SingImgContext from "../../context/SingImgContext";
import { fabricObjectEnum } from "../../constants/FileSetting";

interface props {
  pdfName: string;
  setPdfName: React.Dispatch<React.SetStateAction<string>>;
  cancelFile: () => void;
  totalPages: number;
  nextMenu: () => void;
  getCanvasItem: (canvasItem: (HTMLCanvasElement | null)[]) => void;
}

const EditFile = ({
  pdfName,
  setPdfName,
  cancelFile,
  totalPages,
  nextMenu,
  getCanvasItem,
}: props) => {
  // useAtom
  const [pdfURL] = useAtom<PrimitiveAtom<pdfFileType[] | null>>(fileAtom);
  const [, setOpenModal] = useAtom(openModalAtom);

  const bgRef = useRef<HTMLDivElement>(null);
  const [bgWidth, setBgWidth] = useState<number>(0);
  const canvasListRef = useRef<HTMLDivElement | null>(null);
  const canvasItemRef = useRef<(HTMLCanvasElement | null)[]>([]);
  const [canvas, setCanvas] = useState<fabric.Canvas[]>([]);
  const [phoneSize, setPhoneSize] = useState<boolean>(false); // RWD phone size
  const [onSelectSize, setOnSelectSize] = useState<number>(1); // canvas size
  /** RWD 下方的 menu button ,false:頁面清單, true:簽名清單 */
  const [isActiveMenu, setActiveMenu] = useState<boolean>(true);
  const [focusCanvasIdx, setFocusCanvasIdx] = useState<number>(0); // click canvas page
  const [canvasListScroll, setCanvasListScroll] = useState<number>(0);

  const closeModal = () => {
    setOpenModal(false);
  };

  /** 建立主要的 canvas */
  useEffect(() => {
    for (let i = 0; i < totalPages; i++) {
      const c: fabric.Canvas = new fabric.Canvas(canvasItemRef.current[i]);
      setCanvas((prev) => [...prev, c]);
    }
  }, [canvasItemRef]);

  const getAddLocation = (): AddLocationType => {
    if (!canvasListRef.current) return {};

    // 取得所有 canvas
    const canvasList = Array.from(
      canvasListRef.current.children
    ) as HTMLCanvasElement[];

    const bgHight = bgRef.current?.clientHeight ?? 0; //取得 div 尺寸
    const cTop = canvasList[focusCanvasIdx].offsetTop; // Canvas Item 頂部距離

    return {
      width: (canvas[focusCanvasIdx].width ?? 0) / 3,
      top: canvasListScroll - cTop + bgHight / 2,
      left: canvasList[focusCanvasIdx].clientWidth / 2,
    };
  };

  /* _CANVAS ADD TAG_ */
  const clickAddSing = (addImg: string | HTMLCanvasElement) => {
    fabric.Image.fromURL(
      addImg.toString(),
      (img) => {
        canvas[focusCanvasIdx].add(img).renderAll();
      },
      getAddLocation()
    );
  };

  const clickAddText = (text = "New Text") => {
    const textbox = new fabric.Textbox(text, {
      ...getAddLocation(),
      ...{
        originY: "center",
        originX: "center",
        fontSize: 28,
        fill: fabricObjectEnum.TEXT_COLOR,
        fontWeight: 800,
        textAlign: "center",
        cornerSize: 12,
        transparentCorners: false,
        fontFamily: fabricObjectEnum.FONTFAMILY,
      },
    });

    canvas[focusCanvasIdx].add(textbox);
    canvas[focusCanvasIdx].setActiveObject(textbox);
  };

  const clickAddCheckBox = () => {
    const cancelControls = (obj: fabric.Group | fabric.IText) => {
      obj.setControlsVisibility({
        mt: false, // 上中
        mb: false, // 下中
        ml: false, // 左中
        mr: false, // 右中
        bl: false, // 左下
        br: false, // 右下
        tl: false, // 左上
        tr: false, // 右上
        mtr: false, // 角度旋轉控制點
      });
    };
    const box = new fabric.Rect({
      width: 20,
      height: 20,
      fill: "#fff",
      stroke: fabricObjectEnum.TEXT_COLOR,
      strokeWidth: 2,
      rx: 3, // 圓角
      ry: 3,
    });

    const check = new fabric.Polyline(
      [
        { x: 0, y: 4 },
        { x: 5, y: 10 },
        { x: 12, y: 0 },
      ],
      {
        left: 4,
        top: 5,
        fill: "transparent",
        strokeWidth: 2,
      }
    );

    const checkbox = new fabric.Group([box, check], {
      left: 10,
      top: 0,
    });
    cancelControls(checkbox);

    const label = new fabric.IText("Checkbox Label", {
      left: 40,
      top: 2,
      fontSize: 16,
      fill: fabricObjectEnum.TEXT_COLOR,
      fontFamily: fabricObjectEnum.FONTFAMILY,
    });
    cancelControls(label);

    // checkbox and label group
    const checkboxGroup = new fabric.Group([checkbox, label], {
      left: 10,
      top: 0,
    });

    // Double-click event handler
    const fabricDblClick = function (obj: CustomGroup, handler: any) {
      return function () {
        if (obj.clicked) {
          handler(obj);
        } else {
          obj.clicked = true;
          setTimeout(function () {
            obj.clicked = false;
          }, 500);
        }
      };
    };

    const unGroup = function (group: fabric.Group) {
      let items: fabric.Object[] = [];
      items = group._objects;
      group._restoreObjectsState();
      canvas[focusCanvasIdx].remove(group);
      canvas[focusCanvasIdx].renderAll();
      for (let i = 0; i < items.length; i++) {
        canvas[focusCanvasIdx].add(items[i]);
      }
      // if you have disabled render on addition
      canvas[focusCanvasIdx].renderAll();
    };

    const editLabel = (group: fabric.Group) => {
      console.log("editLabel");

      unGroup(group);
      canvas[focusCanvasIdx].setActiveObject(label);
      label.enterEditing();
      label.selectAll();
    };

    // 設定 checkbox 初始狀態為未勾選
    // let isChecked = false;
    // edit label text
    checkboxGroup.on(
      "mousedown",
      fabricDblClick(checkboxGroup, function (e: fabric.IEvent) {
        editLabel(checkboxGroup);

        const target = e.target as fabric.Group;
        // const polyline = target.item(0).item(1);
        console.log("checkboxGroup mousedown", target);

        // if (isChecked) {
        // check.set({
        //   stroke: fabricObjectEnum.TEXT_COLOR,
        // });
        // } else {
        //   check.set({
        //     stroke: "#fff",
        //   });
        // }
        // isChecked = !isChecked; // 更新勾選狀態
        // canvas[focusCanvasIdx].renderAll();
      })
    );

    check.on("mousedown", function () {
      console.log("checkboxGroup mousedown");
    });

    // leave label to group
    label.on("editing:exited", function () {
      const grp = new fabric.Group([checkbox, label], {});
      canvas[focusCanvasIdx].add(grp);

      grp.on(
        "mousedown",
        fabricDblClick(grp, function () {
          editLabel(grp);
        })
      );
    });

    canvas[focusCanvasIdx].add(checkboxGroup);
    canvas[focusCanvasIdx].renderAll();
  };
  /* _CANVAS ADD TAG END_ */

  const handleCanvasListScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const currentScrollTop = e.currentTarget.scrollTop; // list 滾動距離
    setCanvasListScroll(currentScrollTop);

    if (!canvasListRef.current) return;
    // 取得所有 canvas
    const canvasList = Array.from(
      canvasListRef.current.children
    ) as HTMLCanvasElement[];

    canvasList.forEach((item: HTMLCanvasElement, index: number) => {
      const canvasTop = item.offsetTop; // Canvas Item 頂部距離
      const canvasBottom = canvasTop + (item.clientHeight / 3) * 2; // Canvas Item 底部距離

      if (index === 0 && currentScrollTop <= canvasBottom) {
        return setFocusCanvasIdx(index);
      }

      if (
        index !== 0 &&
        currentScrollTop >=
          canvasList[index - 1].offsetTop +
            (canvasList[index - 1].clientHeight / 3) * 2 &&
        currentScrollTop <= canvasBottom
      ) {
        return setFocusCanvasIdx(index);
      }
    });
  };

  const toFinishFile = () => {
    for (let i = 0; i < totalPages; i++) {
      canvas[i].discardActiveObject();
      canvas[i].requestRenderAll();
    }
    nextMenu();
  };

  /** 填上背景檔案，並移動視窗變動尺寸 */
  useEffect(() => {
    const handelFabricCanvas = () => {
      if (pdfURL && bgRef.current) {
        for (let i = 0; i < totalPages; i++) {
          //計算 className canvas-container 長寬度

          const screenHeight = bgRef.current.scrollHeight * onSelectSize;
          const screenWidth = bgRef.current.scrollWidth * onSelectSize;

          const bgImage = pdfURL[i].dataURL;
          if (!canvas[i]) return;

          fabric.Image.fromURL(bgImage, (img) => {
            canvas[i].setBackgroundImage(bgImage, () => canvas[i].renderAll());

            // 計算頁面尺寸
            const imgSize = pdfURL[i].width / pdfURL[i].height;
            canvas[i].setHeight(img.height ?? 0);
            canvas[i].setWidth(img.width ?? 0);
            // 如果頁面是直(>=1)的使用乘法，如果是橫(<1)的使用除法
            const getSmallSize = Math.min(screenHeight, screenWidth);
            canvas[i]
              .setDimensions(
                {
                  width:
                    (imgSize >= 1 ? getSmallSize : getSmallSize * imgSize) +
                    "px",
                  height:
                    (imgSize >= 1 ? getSmallSize / imgSize : getSmallSize) +
                    "px",
                },
                { cssOnly: true }
              )
              .requestRenderAll();
          });
        }
      }
    };

    handelFabricCanvas();
    window.addEventListener("resize", handelFabricCanvas);

    return () => {
      window.removeEventListener("resize", handelFabricCanvas);
      getCanvasItem(canvasItemRef.current);
    };
  }, [canvas, pdfURL, onSelectSize]);

  useEffect(() => {
    const handleResize = () => {
      const RWD = window.innerWidth >= RWDSize;
      setPhoneSize(RWD);
      if (RWD && !isActiveMenu) setActiveMenu(RWD);

      setBgWidth(
        (window.innerWidth || 0) - ((bgRef.current?.offsetLeft || 0) + 32) * 2
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const SingImgProps = { clickAddSing, clickAddText, clickAddCheckBox };

  return (
    <div
      className="gap not-w relative grid h-[70vh] w-full grid-cols-[220px_auto_220px] 
    flat:grid-cols-1 flat:grid-rows-[auto_400px_auto]"
    >
      <div
        className="edit-file-field grid grid-rows-[repeat(3,_min-content)] 
      gap-8 rounded-l-md px-6 flat:grid-rows-1 flat:rounded-t-md flat:rounded-b-none"
      >
        <InputTextField InputValue={pdfName} setInputValue={setPdfName} />
        <SingImgContext.Provider value={SingImgProps}>
          {phoneSize && <TabPanel />}
        </SingImgContext.Provider>
      </div>
      <div
        className="relative flex h-inherit w-full items-start bg-green-blue flat:h-initial"
        ref={bgRef}
      >
        <div
          className="grid h-inherit w-full gap-4 overflow-auto py-4 flat:h-full"
          ref={canvasListRef}
          style={{ width: bgWidth }}
          onScroll={handleCanvasListScroll}
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
        <ZoomKit isActiveMenu={isActiveMenu} setActiveMenu={setActiveMenu} />
      </div>
      <div className="edit-file-field flex flex-col justify-between gap-8 rounded-r-md ">
        {isActiveMenu ? (
          <FileList
            totalPages={totalPages}
            canvasListRef={canvasListRef}
            canvasItemRef={canvasItemRef}
            setFocusCanvasIdx={setFocusCanvasIdx}
          />
        ) : (
          <TabPanel />
        )}
        <div className="flex flex-col gap-4 px-6">
          <button className="btn-primary flex-auto" onClick={toFinishFile}>
            下一步
          </button>
          <button className="btn-secodary flex-auto" onClick={cancelFile}>
            取消
          </button>
        </div>
      </div>
      <Modal childrenClassName="w-[580px]" small={phoneSize}>
        <React.Fragment>
          <SignMode onlySendBtn={true} clickStartSignBtn={closeModal} />
          <p
            className="cursor-auto pt-8 text-center text-xs text-white"
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
