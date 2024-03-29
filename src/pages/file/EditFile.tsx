/* eslint-disable react/jsx-no-constructed-context-values, no-return-assign */
import React, {
  useEffect, useRef, useState,
} from 'react'

import { fabric } from 'fabric'
import { PrimitiveAtom, useAtom } from 'jotai'

import ControlSizeCanvas from './EditFile/ControlSizeCanvas'
import FileList from './EditFile/FileList'
import TabPanel from './EditFile/TabPanel'
import ZoomKit from './EditFile/ZoomKit'
import InputTextField from '../../components/InputTextField'
import Modal from '../../components/Modal'
import SignMode from '../../components/SignMode'
import { RWDSize } from '../../constants/EnumType'
import SingImgContext from '../../context/SingImgContext'
import { fileAtom, openModalAtom } from '../../jotai'

interface props {
  pdfName: string;
  setPdfName: React.Dispatch<React.SetStateAction<string>>;
  cancelFile: () => void;
  totalPages: number;
  nextMenu: () => void;
  getCanvasItem: (canvasItem: (HTMLCanvasElement | null)[]) => void;
}

const EditFile = ({
  pdfName,
  setPdfName,
  cancelFile,
  totalPages,
  nextMenu,
  getCanvasItem,
}: props) => {
  // useAtom
  const [pdfURL] = useAtom<PrimitiveAtom<pdfFileType[] | null>>(fileAtom)
  const [, setOpenModal] = useAtom(openModalAtom)

  const bgRef = useRef<HTMLDivElement>(null)
  const [bgWidth, setBgWidth] = useState<number>(0)
  const canvasListRef = useRef<HTMLDivElement | null>(null)
  const canvasItemRef = useRef<(HTMLCanvasElement | null)[]>([])
  const [canvas, setCanvas] = useState<fabric.Canvas[]>([])
  const [phoneSize, setPhoneSize] = useState<boolean>(false) // RWD phone size
  const [onSelectSize, setOnSelectSize] = useState<number>(1) // canvas size
  /** RWD 下方的 menu button ,false:頁面清單, true:簽名清單 */
  const [isActiveMenu, setActiveMenu] = useState<boolean>(true)
  const [focusCanvasIdx, setFocusCanvasIdx] = useState<number>(0) // click canvas page
  const [canvasListScroll, setCanvasListScroll] = useState<number>(0)

  const closeModal = () => {
    setOpenModal(false)
  }

  /** 建立主要的 canvas */
  useEffect(() => {
    for (let i = 0; i < totalPages; i++) {
      const c: fabric.Canvas = new fabric.Canvas(canvasItemRef.current[i])
      setCanvas((prev) => [...prev, c])
    }
  }, [canvasItemRef])

  const getAddLocation = (showWidth?: boolean): AddLocationType => {
    if (!canvasListRef.current) return {}

    // 取得所有 canvas
    const canvasList = Array.from(
      canvasListRef.current.children,
    ) as HTMLCanvasElement[]

    const bgHight = bgRef.current?.clientHeight ?? 0 // 取得 div 尺寸
    const cTop = canvasList[focusCanvasIdx].offsetTop // Canvas Item 頂部距離

    const locationObject = {
      top: canvasListScroll - cTop + bgHight / 2,
      left: canvasList[focusCanvasIdx].clientWidth / 2,
    }

    if (showWidth) {
      return {
        width: (canvas[focusCanvasIdx].width ?? 0) / 3,
        ...locationObject,
      }
    }
    return locationObject
  }

  const handleCanvasListScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const currentScrollTop = e.currentTarget.scrollTop // list 滾動距離
    setCanvasListScroll(currentScrollTop)

    if (!canvasListRef.current) return
    // 取得所有 canvas
    const canvasList = Array.from(
      canvasListRef.current.children,
    ) as HTMLCanvasElement[]

    canvasList.forEach((item: HTMLCanvasElement, index: number) => {
      const canvasTop = item.offsetTop // Canvas Item 頂部距離
      const canvasBottom = canvasTop + (item.clientHeight / 3) * 2 // Canvas Item 底部距離

      if (index === 0 && currentScrollTop <= canvasBottom) {
        return setFocusCanvasIdx(index)
      }

      if (
        index !== 0
        && currentScrollTop
        >= canvasList[index - 1].offsetTop
        + (canvasList[index - 1].clientHeight / 3) * 2
        && currentScrollTop <= canvasBottom
      ) {
        return setFocusCanvasIdx(index)
      }

      return null
    })
  }

  const toFinishFile = () => {
    for (let i = 0; i < totalPages; i++) {
      canvas[i].discardActiveObject()
      canvas[i].requestRenderAll()
    }
    nextMenu()
  }

  /** 填上背景檔案，並移動視窗變動尺寸 */
  useEffect(() => {
    const handelFabricCanvas = () => {
      if (pdfURL && bgRef.current) {
        for (let i = 0; i < totalPages; i++) {
          // 計算 className canvas-container 長寬度

          const screenHeight = bgRef.current.scrollHeight * onSelectSize
          const screenWidth = bgRef.current.scrollWidth * onSelectSize

          const bgImage = pdfURL[i].dataURL
          if (!canvas[i]) return

          fabric.Image.fromURL(bgImage, (img) => {
            canvas[i].setBackgroundImage(bgImage, () => canvas[i].renderAll())

            // 計算頁面尺寸
            const imgSize = pdfURL[i].width / pdfURL[i].height
            canvas[i].setHeight(img.height ?? 0)
            canvas[i].setWidth(img.width ?? 0)
            // 如果頁面是直(>=1)的使用乘法，如果是橫(<1)的使用除法
            const getSmallSize = Math.min(screenHeight, screenWidth)
            canvas[i]
              .setDimensions(
                {
                  width:
                    `${imgSize >= 1 ? getSmallSize : getSmallSize * imgSize
                    }px`,
                  height:
                    `${imgSize >= 1 ? getSmallSize / imgSize : getSmallSize
                    }px`,
                },
                { cssOnly: true },
              )
              .requestRenderAll()
          })
        }
      }
    }

    handelFabricCanvas()
    window.addEventListener('resize', handelFabricCanvas)

    return () => {
      window.removeEventListener('resize', handelFabricCanvas)
      getCanvasItem(canvasItemRef.current)
    }
  }, [canvas, pdfURL, onSelectSize])

  useEffect(() => {
    const handleResize = () => {
      const RWD = window.innerWidth >= RWDSize
      setPhoneSize(RWD)
      if (RWD && !isActiveMenu) setActiveMenu(RWD)

      setBgWidth(
        (window.innerWidth || 0) - ((bgRef.current?.offsetLeft || 0) + 32) * 2,
      )
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const SingImgProps = { canvas, focusCanvasIdx, getAddLocation }

  return (
    <div
      className="gap not-w relative grid h-[70vh] w-full grid-cols-[220px_auto_220px]
    flat:grid-cols-1 flat:grid-rows-[auto_400px_auto]"
    >
      <div
        className="edit-file-field grid grid-rows-[repeat(3,_min-content)]
      gap-8 rounded-l-md px-6 flat:grid-rows-1 flat:rounded-t-md flat:rounded-b-none"
      >
        <InputTextField InputValue={pdfName} setInputValue={setPdfName} />
        <SingImgContext.Provider value={SingImgProps}>
          {phoneSize && <TabPanel />}
        </SingImgContext.Provider>
      </div>
      <div
        className="relative flex h-inherit w-full items-start justify-center bg-green-blue flat:h-initial"
        ref={bgRef}
      >
        <div
          className="grid h-inherit w-full gap-4 overflow-auto py-4 flat:h-full"
          ref={canvasListRef}
          style={{ width: bgWidth }}
          onScroll={handleCanvasListScroll}
        >
          {Array.from({ length: totalPages }).map((_, idx: number) => (
            <canvas
              ref={(el) => (canvasItemRef.current = [...canvasItemRef.current, el])}
              className="canvas-style"
              height={bgRef.current?.clientHeight}
              key={idx}
            />
          ))}
        </div>
        <ControlSizeCanvas
          onSelectSize={onSelectSize}
          setOnSelectSize={setOnSelectSize}
        />
        <ZoomKit isActiveMenu={isActiveMenu} setActiveMenu={setActiveMenu} />
      </div>
      <div className="edit-file-field flex flex-col justify-between gap-8 rounded-r-md ">
        {isActiveMenu ? (
          <FileList
            totalPages={totalPages}
            canvasListRef={canvasListRef}
            canvasItemRef={canvasItemRef}
            setFocusCanvasIdx={setFocusCanvasIdx}
          />
        ) : (
          <TabPanel />
        )}
        <div className="flex flex-col gap-4 px-6">
          <button type="button" className="btn-primary flex-auto" onClick={toFinishFile}>
            下一步
          </button>
          <button type="button" className="btn-secodary flex-auto" onClick={cancelFile}>
            取消
          </button>
        </div>
      </div>
      <Modal childrenClassName="w-[580px]" small={phoneSize}>
        <>
          <SignMode onlySendBtn clickStartSignBtn={closeModal} />
          <p
            className="cursor-auto pt-8 text-center text-xs text-white"
            onClick={closeModal}
          >
            點擊畫面任一處離開
          </p>
        </>
      </Modal>
    </div>
  )
}

export default EditFile
