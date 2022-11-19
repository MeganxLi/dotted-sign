import React, { useEffect, useState } from "react";

//svg
import { ReactComponent as UploadIcon } from "../assets/svg/upload.svg";
import { uploadTypeName } from "../constants/EnumType";

interface props {
  fileSetting: { type: uploadTypeName.PDF | uploadTypeName.IMG, size: number, divHight: string }
  fileURL: string | ArrayBuffer | null;
  changeFile: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
}
const DragUpload = ({ fileSetting, fileURL, changeFile }: props) => {
  /**  true: PDF; false: img */
  const judgeFileType = fileSetting.type === uploadTypeName.PDF;
  const [dragActive, setDragActive] = React.useState(false); //是否有拖移檔案
  const [uploadError, setUploadError] = useState<"type" | "size" | null>(null); //錯誤提醒，圖片類型和不超過檔案大小

  const uploadFile = (file: FileList | null) => {
    if (!file) return;
    const { size, type } = file[0];

    // 確認檔案類型
    const imgTypes = ["image/jpeg", "image/jpg", "image/png"];
    const pdfType = ["application/pdf"];

    const fileType = () => {
      if (judgeFileType) return pdfType.includes(type);
      return imgTypes.includes(type);
    };

    if (!fileType()) {
      setUploadError("type");
      setDragActive(false);
      return false;
    }

    // 確認檔案大小不超過 MB
    if (size / 1024 / 1024 > fileSetting.size) {
      setUploadError("size");
      setDragActive(false);
      return false;
    }
    setUploadError(null);

    const fileReader = new FileReader(); // FileReader為瀏覽器內建類別，用途為讀取瀏覽器選中的檔案
    fileReader.onload = loadEvt => {
      changeFile(fileReader.result);
      setDragActive(false);
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

  return (
    <div
      className={`relative flex ${fileSetting.divHight} w-full flex-col items-center justify-center gap-4 
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
          accept={judgeFileType ? "application/pdf" : "image/*"}
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
        <span className={`${uploadError === "type" ? "text-alert-red" : undefined}`}>
          支援檔案類型：{judgeFileType ? "PDF" : "PNG, JPEG"}
        </span>
        <span className={`${uploadError === "size" ? "text-alert-red" : undefined}`}>
          <span className="text-[#B0C3CA]">･</span>≦{fileSetting.size}mb{" "}
        </span>
      </p>
    </div>
  );
};

export default DragUpload;
