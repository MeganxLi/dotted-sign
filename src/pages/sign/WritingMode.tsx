import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { HexColorPicker } from "react-colorful";

import MenuHorizontal from "./MenuHorizontal";
import InputTextField from "../../components/InputTextField";
import WritingTools from "./WritingTools";
import { CanvasToolsName } from "../../constants/EnumType";

const signCanvasPropsDefault: SignCanvasPropsType = {
  width: 0.5,
  color: "#404040",
};

interface props {
  ActiveMenu: number;
  setActiveMenu: React.Dispatch<React.SetStateAction<number>>;
}

const WritingMode = ({ ActiveMenu, setActiveMenu }: props) => {
  const sigCanvas = useRef<any>({});
  const [isDrawn, setIsDrawn] = useState<boolean>(false); //確認是否有繪圖
  const [imageURL, setImageURL] = useState(null);
  const [fileName, setFileName] = useState<string>("signature.png");
  const [signCanvasProps, setSignCanvasProps] = useState<SignCanvasPropsType>(
    signCanvasPropsDefault
  );

  //color picker
  const colorRef = useRef(null);
  const [isOpenColor, setIsOpenColor] = useState<boolean>(false);

  const openColor = () => setIsOpenColor((prev) => !prev);

  const changeColor = (newColor: string) =>
    setSignCanvasProps((prev) => ({ ...prev, color: newColor }));

  const selectCanvasTool = (changeTool: string) => {
    setSignCanvasProps((prev) => ({
      ...prev,
      width: changeTool === CanvasToolsName.HIGHLIGHTER ? 3 : 0.5,
    }));
    const ctx = sigCanvas.current.getCanvas().getContext("2d");
    ctx.globalCompositeOperation = "source-over";
  };
  const eraseCanvas = () => {
    setSignCanvasProps((prev) => ({
      ...prev,
      width: 6,
    }));
    const ctx = sigCanvas.current.getCanvas().getContext("2d");
    ctx.globalCompositeOperation = "destination-out";
  };

  const undoCanvas = () => {
    const data = sigCanvas.current.toData();

    if (data) {
      data.pop(); // remove the last dot or line
      sigCanvas.current.fromData(data);
    }
  };
  // const redoCanvas = () => {};

  const clearCanvas = () => {
    sigCanvas.current.clear();
    setIsDrawn(false);
  };

  const resetCanvas = () => {
    setSignCanvasProps(signCanvasPropsDefault);
    selectCanvasTool(CanvasToolsName.PEN);
    clearCanvas();
  };

  const fetchCanvas = (e: any) => {
    const data = sigCanvas.current.toData();
    setIsDrawn(data.length !== 0);
  };

  const saveCanvas = () => {
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
  };

  return (
    <div id="WritingMode">
      <div className="card-box">
        <MenuHorizontal ActiveMenu={ActiveMenu} setActiveMenu={setActiveMenu} />
        <div className={`relative px-8 ${isDrawn && ""}`}>
          <WritingTools
            handleSignTools={{
              openColor,
              selectCanvasTool,
              eraseCanvas,
              undoCanvas,
              resetCanvas,
            }}
          />
          <SignatureCanvas
            canvasProps={{
              className: "signatureCanvas w-full bg-pale-blue rounded-[32px] ",
            }}
            minWidth={signCanvasProps.width}
            penColor={signCanvasProps.color}
            onBegin={fetchCanvas}
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
      <div className="mt-4 grid grid-cols-2 gap-4">
        <button
          className="btn-secodary"
          disabled={!isDrawn}
          onClick={clearCanvas}
        >
          清除畫布
        </button>
        <button className="btn-primary" onClick={saveCanvas}>
          儲存結果
        </button>
      </div>
    </div>
  );
};

export default WritingMode;
