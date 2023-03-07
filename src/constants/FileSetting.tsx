//svg
import { ReactComponent as DateIcon } from "../assets/svg/date.svg";
import { ReactComponent as TextIcon } from "../assets/svg/text.svg";
import { ReactComponent as CheckboxIcon } from "../assets/svg/checkbox.svg";
import { ReactComponent as RadioIcon } from "../assets/svg/radio.svg";

export enum FileMenuName {
  Upload = "上傳檔案",
  FinishUpload = "上傳檔案完成",
  EditFile = "編輯文件",
  FinishFile = "完成文件",
}

export const FileStepMenu = {
  0: FileMenuName.Upload,
  1: FileMenuName.FinishUpload,
  2: FileMenuName.EditFile,
  3: FileMenuName.FinishFile,
};

export const FileNameDefault = "File";

export enum FieldTagName {
  DATE = "日期",
  TEXT = "文字",
  CHECKBOX = "核取方塊",
  RADIO = "選擇鈕",
}

export const FieldTagItem: TagItemType[] = [
  {
    name: FieldTagName.DATE,
    icon: (
      <span>
        <DateIcon />
      </span>
    ),
  },
  {
    name: FieldTagName.TEXT,
    icon: (
      <span>
        <TextIcon />
      </span>
    ),
  },
  {
    name: FieldTagName.CHECKBOX,
    icon: (
      <span>
        <CheckboxIcon />
      </span>
    ),
  },
  {
    name: FieldTagName.RADIO,
    icon: (
      <span>
        <RadioIcon />
      </span>
    ),
  },
];

export enum fabricObjectEnum {
  FONTFAMILY = "Helvetica",
  TEXT_COLOR = "#000",
  WHITE = "#FFF",
}
