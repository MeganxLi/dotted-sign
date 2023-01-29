interface PageListType {
  name: JSX.Element;
  path: string;
  element: JSX.Element;
  classTag: string;
}

type canvasType = string | ArrayBuffer | null;

interface pdfFileType {
  orientation: number;
  dataURL: string;
}

//Sign page
interface SignCanvasPropsType {
  tool: string;
  width: number;
  color: string;
}


//File page
interface TagItemType {
  name: string;
  icon: JSX.Element;
}

// Message
type MessageIconString = "check" | "warn";

interface MessageType {
  open: boolean;
  icon: MessageIconString;
  content: string;
}

interface MessageIconType {
  [key: string]: {
    icon: Icon
  }
}