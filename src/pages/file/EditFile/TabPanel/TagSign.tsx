import { useContext } from 'react'

import { fabric } from 'fabric'
import { useAtom } from 'jotai'
import { Plus } from 'react-feather'

import SingImgContext from '../../../../context/SingImgContext'
import { openModalAtom, signAtom } from '../../../../jotai'

const TagSign = () => {
  // context
  const { canvas, focusCanvasIdx, getAddLocation } = useContext(SingImgContext)
  // useAtom
  const [signList] = useAtom(signAtom)
  const [, setOpenModal] = useAtom(openModalAtom)

  const clickAddSing = (addImg: string | HTMLCanvasElement) => {
    fabric.Image.fromURL(
      addImg.toString(),
      (img) => {
        canvas[focusCanvasIdx].add(img).renderAll()
      },
      getAddLocation(true),
    )
  }

  const createSignURL = (item: string | HTMLCanvasElement) => {
    clickAddSing(item)
  }

  return (
    <div className="tag-element">
      <p>簽名</p>
      <div className="tag-list">
        {signList.map((item, idx: number) => (
          <div
            key={idx}
            className="sing-tag border-solid border-black/20 bg-[#F9F9F9]"
            onClick={() => createSignURL(item)}
          >
            <img src={item?.toString()} alt="sign img" />
          </div>
        ))}
        <div
          className="sing-tag border-dashed border-black/20 text-blue"
          onClick={() => setOpenModal(true)}
        >
          <Plus size={14} />
        </div>
      </div>
    </div>
  )
}

export default TagSign
