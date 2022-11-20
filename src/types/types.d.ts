interface PageListType {
  name: JSX.Element;
  path: string;
  element: JSX.Element;
  classTag: string;
}

type canvasType = string | ArrayBuffer | null;

//Sign page
interface SignCanvasPropsType {
  tool: string;
  width: number;
  color: string;
}
