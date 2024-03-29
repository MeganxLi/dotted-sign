import { atom } from 'jotai'

/**
 * 彈窗 Modal 開關
 */
const openModalAtom = atom<boolean>(false)

/**
 * 通知 Message 開關、icon和訊息內容
 */
const messageAtom = atom<MessageType | null>(null)

/**
 * 簽名 Sign
 */
const signAtom = atom<(HTMLCanvasElement | string)[]>([])

/**
 * 檔案 canvas
 */
const fileAtom = atom<pdfFileType[] | null>(null)

export {
  openModalAtom, messageAtom, signAtom, fileAtom,
}
