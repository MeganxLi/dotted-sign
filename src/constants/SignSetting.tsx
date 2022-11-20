import { CanvasToolsName } from "./EnumType";

//svg
import { ReactComponent as DateIcon } from "../assets/svg/date.svg";
import { ReactComponent as TextIcon } from "../assets/svg/text.svg";
import { ReactComponent as CheckboxIcon } from "../assets/svg/checkbox.svg";
import { ReactComponent as RadioIcon } from "../assets/svg/radio.svg";

export const signCanvasPropsDefault: SignCanvasPropsType = {
  tool: CanvasToolsName.PEN,
  width: 0.5,
  color: "#404040",
};

export const TagItemName: TagItemType[] = [
  { name: "日期", icon: <span><DateIcon /></span> },
  { name: "文字", icon: <span><TextIcon /></span> },
  { name: "核取方塊", icon: <span><CheckboxIcon /></span> },
  { name: "選擇鈕", icon: <span><RadioIcon /></span> }
];