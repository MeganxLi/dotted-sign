import React, { useEffect, useState } from "react";
import MenuHorizontal from "./MenuHorizontal";

//svg
import { ReactComponent as UploadIcon } from "../../assets/svg/upload.svg";
import { uploadFileSize } from "../../constants/SignSetting";

interface props {
  ActiveMenu: number;
  setActiveMenu: React.Dispatch<React.SetStateAction<number>>;
}
const UploadMode = ({ ActiveMenu, setActiveMenu }: props) => {
  const [dragActive, setDragActive] = React.useState(false); //是否有拖移檔案
  const [uploadError, setUploadError] = useState<"type" | "size" | null>(null); //錯誤提醒，圖片類型和不超過 file size 5MB
  const [imageURL, setImageURL] = useState<string | ArrayBuffer | null>(null);

  const uploadFile = (file: FileList | null) => {
    if (!file) return;
    const { size, type } = file[0];

    // 確認檔案類型
    const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!fileTypes.includes(type)) {
      setUploadError("type");
      setDragActive(false);
      return false;
    }

    // 確認檔案大小不超過 5MB
    if (size / 1024 / 1024 > uploadFileSize) {
      setUploadError("size");
      setDragActive(false);
      return false;
    }
    setUploadError(null);

    const fileReader = new FileReader(); // FileReader為瀏覽器內建類別，用途為讀取瀏覽器選中的檔案
    fileReader.onload = loadEvt => {
      setImageURL(fileReader.result);
    };
    fileReader.readAsDataURL(file[0]);

  };

  const fileHandleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      //拖移
      setDragActive(true);
    } else if (e.type === "dragleave") {
      //拖移離開
      setDragActive(false);
    } else if (e.type === "drop") {
      //拖移放開
      const { dataTransfer: { files } } = e;
      uploadFile(files);
    }

  };

  const fileChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    uploadFile(files);
  };

  const resetUpload = () => {
    setDragActive(false);
    setImageURL(null);
  };

  return (
    <div id="UploadMode">
      <div className="card-box">
        <MenuHorizontal ActiveMenu={ActiveMenu} setActiveMenu={setActiveMenu} />
        <div className="px-6">
          {imageURL ?
            <img className="bg-checkerboard" src={imageURL?.toString()} /> :
            (<div
              className={`relative flex min-h-[220px] w-full flex-col items-center justify-center gap-4 
            rounded-[32px] border-2 border-dashed border-black/20 bg-pale-blue 
            text-[#728F9B] ${dragActive ? "bg-green-blue" : undefined
                }`}
              onDragEnter={fileHandleDrag}
              onDragLeave={fileHandleDrag}
              onDragOver={fileHandleDrag}
              onDrop={fileHandleDrag}
            >
              <UploadIcon />
              <p className="text-sm tracking-wider">
                <span className=" flat:hidden">拖曳圖片至此，或</span>
                <input
                  id="upload_file"
                  type="file"
                  name="file"
                  accept="image/*"
                  onChange={fileChangedHandler}
                />
                <label
                  className="cursor-pointer text-blue underline"
                  htmlFor="upload_file"
                >
                  選擇檔案
                </label>
              </p>
              <p className="text-xs tracking-wider">
                <span className={`${uploadError === "type" ? "text-alert-red" : undefined}`}>支援檔案類型：PNG, JPEG</span>
                <span className={`${uploadError === "size" ? "text-alert-red" : undefined}`}>
                  <span className="text-[#B0C3CA]">･</span>≦{uploadFileSize}mb{" "}
                </span>
              </p>
            </div>)
          }
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
