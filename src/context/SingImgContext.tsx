import { createContext } from 'react'

interface SingImgType {
  canvas: fabric.Canvas[];
  focusCanvasIdx: number;
  getAddLocation: (showWidth?: boolean) => AddLocationType;
}

const SingImgContext = createContext({} as SingImgType)

export default SingImgContext
