import React, { useState } from 'react'

import { useAtom } from 'jotai'

import MenuHorizontal from './Writing/MenuHorizontal'
import { uploadTypeName } from '../../constants/EnumType'
import { signAtom } from '../../jotai'
import DragUpload from '../DragUpload'

interface props {
  ActiveMenu: number;
  setActiveMenu: React.Dispatch<React.SetStateAction<number>>;
  clickStartSignBtn?: (event: React.MouseEvent<HTMLElement>) => void;
  handleOnlyBtnElement: JSX.Element;
  handleSaveBtnMessage: () => void
}
const UploadMode = ({
  ActiveMenu,
  setActiveMenu,
  clickStartSignBtn,
  handleOnlyBtnElement,
  handleSaveBtnMessage,
}: props) => {
  const [imageURL, setImageURL] = useState<string | ArrayBuffer | null>(null)
  const [, setSignList] = useAtom(signAtom)
  const [saveButton, setSaveButton] = useState<boolean>(false)

  const resetUpload = () => {
    setImageURL(null)
    setSaveButton(false)
  }

  const saveUpload = () => {
    if (!imageURL) return
    setSignList((prev) => [...prev, imageURL.toString()])
    setSaveButton(true)

    handleSaveBtnMessage()
  }

  return (
    <div id="UploadMode">
      <div className="card-box">
        <MenuHorizontal ActiveMenu={ActiveMenu} setActiveMenu={setActiveMenu} />
        <div className="px-6">
          {imageURL
            ? (
              <div className="bg-checkerboard h-signHight">
                <img className="h-full" src={imageURL?.toString()} alt="Upload img" />
              </div>
            )
            : (
              <DragUpload
                fileSetting={{ type: uploadTypeName.IMG, size: 5, divHight: 'h-signHight' }}
                changeFile={(file) => {
                  if (Array.isArray(file)) return
                  setImageURL(file)
                }}
              />
            )}
        </div>
      </div>
      <div className="mt-4 flex gap-4 flat:flex-col-reverse">
        {!saveButton
          ? <button type="button" className="btn-secodary flex-auto" disabled={imageURL === null} onClick={resetUpload}>重新上傳</button>
          : handleOnlyBtnElement}
        {!saveButton
          ? <button type="button" className="btn-primary flex-auto" onClick={saveUpload}>儲存結果</button>
          : (
            <button
              type="button"
              className="btn-primary flex-auto"
              onClick={clickStartSignBtn}
            >
              開始簽署文件
            </button>
          )}
      </div>
    </div>
  )
}

export default UploadMode
