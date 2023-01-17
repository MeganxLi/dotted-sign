import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import { HexColorPicker } from "react-colorful";

import MenuHorizontal from "./Writing/MenuHorizontal";
import InputTextField from "../../components/InputTextField";
import WritingTools from "./Writing/WritingTools";
import { CanvasToolsName } from "../../constants/EnumType";
import { signCanvasPropsDefault } from "../../constants/SignSetting";
import useClickOutside from "../../utils/useClickOutside";
import { useAtom } from "jotai";
import { signAtom } from "../../jotai";

interface props {
  ActiveMenu: number;
  setActiveMenu: React.Dispatch<React.SetStateAction<number>>;
}

const WritingMode = ({ ActiveMenu, setActiveMenu }: props) => {
  // router
  const navigate = useNavigate();
  const sigCanvas = useRef<any>({});
  let canvasHistory: string[] = []; // canvas 歷史紀錄，用來復原使用
  const [isDrawn, setIsDrawn] = useState<boolean>(false); //確認是否有繪圖
  const [imageURL, setImageURL] = useState<HTMLCanvasElement | null>(null);
  const [fileName, setFileName] = useState<string>("signature.png");
  const [signCanvasProps, setSignCanvasProps] = useState<SignCanvasPropsType>(
    signCanvasPropsDefault
  );
  const [, setSignList] = useAtom(signAtom);
  const [saveButton, setSaveButton] = useState<boolean>(false);

  //color picker
  const colorRef = useRef<HTMLHeadingElement>(null);
  const [isOpenColor, setIsOpenColor] = useState<boolean>(false);

  const openColor = () => setIsOpenColor((prev) => !prev);

  const changeColor = (newColor: string) =>
    setSignCanvasProps((prev) => ({ ...prev, color: newColor }));

  const selectCanvasTool = (changeTool: string) => {
    setSignCanvasProps((prev) => ({
      ...prev,
      tool: changeTool,
      width: changeTool === CanvasToolsName.HIGHLIGHTER ? 3 : 0.5,
    }));
    const ctx = sigCanvas.current.getCanvas().getContext("2d");
    ctx.globalCompositeOperation = "source-over";
  };
  const eraseCanvas = () => {
    setSignCanvasProps((prev) => ({
      ...prev,
      tool: CanvasToolsName.ERASER,
      width: 6,
    }));
    const ctx = sigCanvas.current.getCanvas().getContext("2d");
    ctx.globalCompositeOperation = "destination-out";
  };

  const undoCanvas = () => {
    const data = sigCanvas.current.toData();
    if (data.length > 0) {
      data.pop(); // 移除陣列最後一個
      sigCanvas.current.fromData(data);
    }
  };
  const redoCanvas = () => {
    const data = sigCanvas.current.toData();

    if (data.length < canvasHistory.length) {
      data.push(canvasHistory[data.length]);
      sigCanvas.current.fromData(data);
    }
  };

  const clearCanvas = () => {
    sigCanvas.current.clear();
    setIsDrawn(false);
    setImageURL(null);
    setSaveButton(false);
    sigCanvas.current.on();
  };

  const resetCanvas = () => {
    setSignCanvasProps(signCanvasPropsDefault);
    selectCanvasTool(CanvasToolsName.PEN);
    clearCanvas();
  };

  const fetchCanvas = () => {
    canvasHistory = sigCanvas.current.toData().concat();
    setIsDrawn(!sigCanvas.current.isEmpty());
  };

  const saveCanvas = () => {
    const DataURL: HTMLCanvasElement = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    setImageURL(DataURL);
    sigCanvas.current.off();
    setSignList((prev) => [...prev, DataURL]);
    setSaveButton(true);
  };

  useClickOutside(colorRef, () => setIsOpenColor(false));

  return (
    <div id="WritingMode">
      <div className="card-box">
        <MenuHorizontal ActiveMenu={ActiveMenu} setActiveMenu={setActiveMenu} />
        <div className={`relative px-8 ${isDrawn && ""}`}>
          {!imageURL && (
            <WritingTools
              handleSignTools={{
                openColor,
                selectCanvasTool,
                eraseCanvas,
                undoCanvas,
                redoCanvas,
                resetCanvas,
              }}
              signCanvasProps={signCanvasProps}
            />
          )}
          <SignatureCanvas
            canvasProps={{
              className:
                "signatureCanvas w-full bg-pale-blue rounded-[32px] cursor-canvas h-signHight",
            }}
            minWidth={signCanvasProps.width}
            penColor={signCanvasProps.color}
            onEnd={fetchCanvas}
            ref={sigCanvas}
          />

          {isOpenColor && (
            <div ref={colorRef}>
              <HexColorPicker
                color={signCanvasProps.color}
                onChange={changeColor}
              />
            </div>
          )}
        </div>
        <div className="px-12">
          <p className="mt-8 mb-4 select-none text-black/50">簽名檔名稱</p>
          <InputTextField InputValue={fileName} setInputValue={setFileName} />
        </div>
      </div>
      <div className="two-btn ">
        <button
          className="btn-secodary flex-auto"
          disabled={!isDrawn}
          onClick={clearCanvas}
        >
          清除畫布
        </button>
        {!saveButton ? (
          <button className="btn-primary flex-auto" onClick={saveCanvas}>
            儲存結果
          </button>
        ) : (
          <button
            className="btn-primary flex-auto"
            onClick={() => navigate("/")}
          >
            開始簽署文件
          </button>
        )}
      </div>
    </div>
  );
};

export default WritingMode;
