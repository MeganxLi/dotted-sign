import { createContext } from "react";

interface SingImgType {
  clickAddSing: (addImg: string | HTMLCanvasElement) => void;
  clickAddText: (text?: string) => void;
}

const SingImgContext = createContext({} as SingImgType);

export default SingImgContext;
