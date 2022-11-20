import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuHorizontal from "./MenuHorizontal";
import DragUpload from "../../components/DragUpload";
import { uploadTypeName } from "../../constants/EnumType";
import { useAtom } from "jotai";
import { signAtom } from "../../jotai";

interface props {
  ActiveMenu: number;
  setActiveMenu: React.Dispatch<React.SetStateAction<number>>;
}
const UploadMode = ({ ActiveMenu, setActiveMenu }: props) => {
  // router
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState<string | ArrayBuffer | null>(null);
  const [, setSignList] = useAtom(signAtom);
  const [saveButton, setSaveButton] = useState<boolean>(false);

  const resetUpload = () => {
    setImageURL(null);
  };

  const saveUpload = () => {
    if (!imageURL) return;
    setSignList(prev => [...prev, imageURL.toString()]);
    setSaveButton(true);
  };

  return (
    <div id="UploadMode">
      <div className="card-box">
        <MenuHorizontal ActiveMenu={ActiveMenu} setActiveMenu={setActiveMenu} />
        <div className="px-6">
          {imageURL ?
            <div className="bg-checkerboard h-signHight">
              <img className="h-full" src={imageURL?.toString()} />
            </div> :
            <DragUpload
              fileSetting={{ type: uploadTypeName.IMG, size: 5, divHight: "h-signHight" }}
              fileURL={imageURL}
              changeFile={setImageURL}
            />
          }
        </div>
      </div>
      <div className="mt-4 flex gap-4 flat:flex-col-reverse">
        <button className="btn-secodary flex-auto" disabled={imageURL === null} onClick={resetUpload}>重新上傳</button>
        {!saveButton ?
          <button className="btn-primary flex-auto" onClick={saveUpload}>儲存結果</button> :
          <button className="btn-primary flex-auto" onClick={() => navigate("/")}>開始簽署文件</button>
        }
      </div>
    </div>
  );
};

export default UploadMode;
