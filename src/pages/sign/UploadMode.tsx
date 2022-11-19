import React, { useState } from "react";
import MenuHorizontal from "./MenuHorizontal";
import DragUpload from "../../components/DragUpload";
import { uploadTypeName } from "../../constants/EnumType";

interface props {
  ActiveMenu: number;
  setActiveMenu: React.Dispatch<React.SetStateAction<number>>;
}
const UploadMode = ({ ActiveMenu, setActiveMenu }: props) => {
  const [imageURL, setImageURL] = useState<string | ArrayBuffer | null>(null);

  const resetUpload = () => {
    setImageURL(null);
  };
  return (
    <div id="UploadMode">
      <div className="card-box">
        <MenuHorizontal ActiveMenu={ActiveMenu} setActiveMenu={setActiveMenu} />
        <div className="px-6">
          <DragUpload
            fileSetting={{ type: uploadTypeName.IMG, size: 5, divHight: "h-signHight" }}
            fileURL={imageURL}
            changeFile={setImageURL}
          />
        </div>
      </div>
      <div className="mt-4 flex gap-4 flat:flex-col-reverse">
        <button className="btn-secodary flex-auto" disabled={imageURL === null} onClick={resetUpload}>重新上傳</button>
        <button className="btn-primary flex-auto">儲存結果</button>
      </div>
    </div>
  );
};

export default UploadMode;
