import React, { useEffect, useRef } from "react";
import MenuHorizontal from "./MenuHorizontal";
import SignaturePad from "react-signature-canvas";
import InputTextField from "../../components/InputTextField";

const WritingMode = () => {
  const sigCanvas = useRef<any>({});
  const clearCanvas = () => sigCanvas.current.clear();

  useEffect(() => {
    console.log(sigCanvas.current);

  }, [sigCanvas.current]);

  return (
    <div>
      <div className="card-box">
        <MenuHorizontal />
        <div className="px-8">
          <SignaturePad canvasProps={{
            className: "signatureCanvas w-full bg-pale-blue rounded-[32px]",
          }}
            ref={sigCanvas} />
        </div>
        <div className="px-12">
          <p className="mt-8 mb-4 text-black/50">簽名檔名稱</p>
          <InputTextField />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <button className="btn-secodary" onClick={clearCanvas}>清除畫布</button>
        <button className="btn-primary">儲存結果</button>
      </div>
    </div>
  );
};

export default WritingMode;
