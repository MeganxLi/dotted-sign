import { createContext } from "react";

interface SingImgType {
  clickAddSing: (addImg: string | HTMLCanvasElement) => void;
}

const SingImgContext = createContext({} as SingImgType);

export default SingImgContext;
