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
  const [uploadError, setUploadError] = useState<boolean>(false); //錯誤提醒，不超過 file size 5MB

  const handleFileSize = (fileSize: number) => {
    if (fileSize < uploadFileSize * 1000000) {
      console.log("成功");
      setUploadError(false);
    } else {
      setUploadError(true);
    }
  };

  const fileHandleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const fileChangedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      handleFileSize(file[0].size);
    }
  };

  useEffect(() => {
    console.log(dragActive);
  }, [dragActive]);

  return (
    <div id="UploadMode">
      <div className="card-box">
        <MenuHorizontal ActiveMenu={ActiveMenu} setActiveMenu={setActiveMenu} />
        <div className="px-6">
          <div
            className={`relative flex min-h-[220px] w-full flex-col items-center justify-center gap-4 
            rounded-[32px] border-2 border-dashed border-black/20 bg-pale-blue text-[#728F9B] ${
              dragActive ? "bg-green-blue" : undefined
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
              支援檔案類型：PNG, JPEG
              <span className={`${uploadError ? "text-alert-red" : undefined}`}>
                <span className="text-[#B0C3CA]">･</span>≦{uploadFileSize}mb{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-4 flat:flex-col-reverse">
        <button className="btn-secodary flex-auto">重新上傳</button>
        <button className="btn-primary flex-auto">儲存結果</button>
      </div>
    </div>
  );
};

export default UploadMode;
