import { atom } from "jotai";

/**
 * 簽名 Sign
 */
const signAtom = atom<(HTMLCanvasElement | string)[]>([]);

/**
 * 檔案 canvas
 */
const fileAtom = atom<canvasType>(null);

export { signAtom, fileAtom };
