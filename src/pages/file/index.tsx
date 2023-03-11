import { useEffect, useState } from 'react'

import { PrimitiveAtom, useAtom } from 'jotai'
import { pdfjs } from 'react-pdf'

import EditFile from './EditFile'
import FinishFile from './FinishFile'
import FinishUpload from './FinishUpload'
import DragUpload from '../../components/DragUpload'
import Intro from '../../components/Intro'
import { uploadTypeName } from '../../constants/EnumType'
import { FileNameDefault } from '../../constants/FileSetting'
import { fileAtom } from '../../jotai'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const File = () => {
  const [stepMenu, setStepMenu] = useState<number>(0)
  const [pdfURL, setPdfURL] = useAtom<PrimitiveAtom<pdfFileType[] | null>>(fileAtom)
  const [pdfName, setPdfName] = useState<string>(FileNameDefault)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [progressBar, setProgressBar] = useState<number>(0)
  const [finishPdf, setFinishPdf] = useState<(HTMLCanvasElement | null)[]>([]) // get finish pdf

  useEffect(() => {
    document.body.classList.add('file')
    document.body.classList.remove('sign')
    return () => {
      // 離開頁面清空
      setPdfURL(null)
    }
  }, [])

  useEffect(() => {
    if (pdfURL) return setStepMenu(1)
    return undefined
  }, [pdfURL])

  const previousMenu = () => {
    switch (stepMenu) {
      case 1:
        setPdfURL(null)
        break

      default:
        break
    }
    setStepMenu((perv) => perv - 1)
  }

  const cancelUpload = () => {
    previousMenu()
    setProgressBar(0)
  }

  const nextMenu = () => {
    setStepMenu((perv) => perv + 1)
  }

  const cancelFile = () => {
    setStepMenu(0)
    setPdfURL(null)
    setPdfName(FileNameDefault)
  }

  const fileElement: { [index: number]: JSX.Element } = {
    0: (
      <>
        <div className="card-box w-full p-5">
          <DragUpload
            fileSetting={{
              type: uploadTypeName.PDF,
              size: 20,
              divHight: 'h-[360px]',
            }}
            changeFile={(file, name, pageCount) => {
              if (Array.isArray(file)) {
                setPdfURL(file)
                setPdfName(name)
                setTotalPages(pageCount || 0)
              }
            }}
            setProgressBar={setProgressBar}
          />
        </div>
      </>
    ),
    1: (
      <FinishUpload
        pdfName={pdfName}
        setPdfName={setPdfName}
        previousMenu={previousMenu}
        cancelUpload={cancelUpload}
        nextMenu={nextMenu}
        progressBar={progressBar}
      />
    ),
    2: (
      <EditFile
        pdfName={pdfName}
        setPdfName={setPdfName}
        cancelFile={cancelFile}
        totalPages={totalPages}
        nextMenu={nextMenu}
        getCanvasItem={(canvasItem) => setFinishPdf(canvasItem)}
      />
    ),
    3: (
      <FinishFile
        pdfName={pdfName}
        setPdfName={setPdfName}
        finishPdf={finishPdf}
        totalPages={totalPages}
      />
    ),
  }

  return (
    <main
      id="File"
      className={`${stepMenu === 2 ? 'w-screen justify-start' : undefined}`}
    >
      {stepMenu !== 2 && (
        <Intro
          LargeStandard={(
            <>
              Anywhere,
              <br />
              anytime.
            </>
          )}
          SubStandard="開始簽署您的文件"
        />
      )}
      {fileElement[stepMenu]}
    </main>
  )
}

export default File
