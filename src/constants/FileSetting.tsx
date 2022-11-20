
//svg
import { ReactComponent as DateIcon } from "../assets/svg/date.svg";
import { ReactComponent as TextIcon } from "../assets/svg/text.svg";
import { ReactComponent as CheckboxIcon } from "../assets/svg/checkbox.svg";
import { ReactComponent as RadioIcon } from "../assets/svg/radio.svg";

export enum FileMenuName {
  Upload = "上傳檔案",
  FinishUpload = "上傳檔案完成",
  EditFile = "編輯文件",
  FinishFile = "完成文件"
}

export const FileStepMenu = {
  0: FileMenuName.Upload,
  1: FileMenuName.FinishUpload,
  2: FileMenuName.EditFile,
  3: FileMenuName.FinishFile
};

export const FileNameDefault = "File";

export const TagItemName: TagItemType[] = [
  { name: "日期", icon: <span><DateIcon /></span > },
  { name: "文字", icon: <span><TextIcon /></span > },
  { name: "核取方塊", icon: <span><CheckboxIcon /></span > },
  { name: "選擇鈕", icon: <span><RadioIcon /></span > }
];