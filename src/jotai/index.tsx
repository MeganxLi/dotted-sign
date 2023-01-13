import { atom } from "jotai";

/**
 * 簽名 Sign
 */
const signAtom = atom<(HTMLCanvasElement | string)[]>([]);

/**
 * 新增 canvas 圖像
 */
const addCanvasAtom = atom<HTMLCanvasElement | string>("");

/**
 * 檔案 canvas
 */
const fileAtom = atom<string[] | null>(null);

export { signAtom, addCanvasAtom, fileAtom };
