/* eslint-disable no-param-reassign, no-underscore-dangle, func-names */
import { useContext } from 'react'

import { fabric } from 'fabric'

import {
  AddGroupEnum,
  FabricObjectEnum,
  FieldTagItem,
  FieldTagName,
} from '../../../../constants/FileSetting'
import SingImgContext from '../../../../context/SingImgContext'

const TagField = () => {
  // context
  const { canvas, focusCanvasIdx, getAddLocation } = useContext(SingImgContext)

  /* _CANVAS ADD TAG_ */

  const clickAddText = (text = 'New Text') => {
    const textbox = new fabric.Textbox(text, {
      ...getAddLocation(true),
      ...{
        originY: 'center',
        originX: 'center',
        fontSize: 28,
        fill: FabricObjectEnum.TEXT_COLOR,
        fontWeight: 800,
        textAlign: 'center',
        cornerSize: 12,
        transparentCorners: false,
        fontFamily: FabricObjectEnum.FONTFAMILY,
        hoverCursor: 'text',
      },
    })

    canvas[focusCanvasIdx].add(textbox)
    canvas[focusCanvasIdx].setActiveObject(textbox)
  }

  const clickAddGroupBox = (groupType: number) => {
    const cancelControls = (obj: fabric.Group | fabric.IText) => {
      obj.setControlsVisibility({
        mt: false, // 上中
        mb: false, // 下中
        ml: false, // 左中
        mr: false, // 右中
        bl: false, // 左下
        br: false, // 右下
        tl: false, // 左上
        tr: false, // 右上
        mtr: false, // 角度旋轉控制點
      })
    }

    // checkbox
    const squareBox = new fabric.Rect({
      width: 20,
      height: 20,
      fill: FabricObjectEnum.WHITE,
      stroke: FabricObjectEnum.TEXT_COLOR,
      strokeWidth: 2,
      rx: 3, // 圓角
      ry: 3,
    })

    const check = new fabric.Polyline(
      [
        { x: 0, y: 4 },
        { x: 5, y: 10 },
        { x: 12, y: 0 },
      ],
      {
        left: 4,
        top: 5,
        fill: 'transparent',
        strokeWidth: 2,
        stroke: FabricObjectEnum.WHITE,
      },
    )

    const checkBox = new fabric.Group([squareBox, check], {
      left: 10,
      top: 0,
      hoverCursor: 'pointer',
      subTargetCheck: true,
      lockMovementX: true,
      lockMovementY: true,
      hasControls: false,
    })
    cancelControls(checkBox)

    checkBox.on('mousedown', (e: fabric.IEvent) => {
      const target = e.target as fabric.Group
      check.set({
        stroke:
          target._objects[1].stroke === FabricObjectEnum.TEXT_COLOR
            ? FabricObjectEnum.WHITE
            : FabricObjectEnum.TEXT_COLOR,
      })

      canvas[focusCanvasIdx].renderAll()
    })

    // radio
    const circleBox = new fabric.Circle({
      fill: FabricObjectEnum.WHITE,
      stroke: FabricObjectEnum.TEXT_COLOR,
      strokeWidth: 2,
      radius: 10,
      originX: 'center',
      originY: 'center',
    })

    const dot = new fabric.Circle({
      radius: 6,
      originX: 'center',
      originY: 'center',
      fill: FabricObjectEnum.WHITE,
    })

    const radioBox = new fabric.Group([circleBox, dot], {
      left: 10,
      top: 0,
      hoverCursor: 'pointer',
      subTargetCheck: true,
      lockMovementX: true,
      lockMovementY: true,
      hasControls: false,
    })
    cancelControls(radioBox)

    radioBox.on('mousedown', (e: fabric.IEvent) => {
      const target = e.target as fabric.Group

      dot.set({
        fill:
          target._objects[1].fill === FabricObjectEnum.TEXT_COLOR
            ? FabricObjectEnum.WHITE
            : FabricObjectEnum.TEXT_COLOR,
      })

      canvas[focusCanvasIdx].renderAll()
    })

    // box label
    const label = new fabric.IText('Label', {
      left: 40,
      top: 2,
      fontSize: 16,
      fill: FabricObjectEnum.TEXT_COLOR,
      fontFamily: FabricObjectEnum.FONTFAMILY,
      hoverCursor: 'text',
    })
    cancelControls(label)

    const groupBoxType = (): fabric.Group => {
      if (groupType === AddGroupEnum.CHECKBOX) {
        return checkBox
      }
      return radioBox
    }

    // checkbox and label group
    const groupBox = new fabric.Group(
      [groupBoxType(), label],
      getAddLocation(),
    )

    // Double-click event handler
    const fabricDblClick = (objGroup: CustomGroup, handler: any) => function () {
      if (objGroup.clicked) {
        handler(objGroup)
      } else {
        objGroup.clicked = true
        setTimeout(() => {
          objGroup.clicked = false
        }, 500)
      }
    }

    const unGroup = (group: fabric.Group) => {
      let items: fabric.Object[] = []
      items = group._objects
      group._restoreObjectsState()
      canvas[focusCanvasIdx].remove(group)
      canvas[focusCanvasIdx].renderAll()
      for (let i = 0; i < items.length; i++) {
        canvas[focusCanvasIdx].add(items[i])
      }
      canvas[focusCanvasIdx].renderAll()
    }

    const editLabel = (group: fabric.Group) => {
      unGroup(group)
      canvas[focusCanvasIdx].setActiveObject(label)
      label.enterEditing()
      label.selectAll()
    }

    // edit label text
    groupBox.on(
      'mousedown',
      fabricDblClick(groupBox, () => {
        editLabel(groupBox)
      }),
    )

    // leave label to group
    label.on('editing:exited', () => {
      const grp = new fabric.Group([groupBoxType(), label], {})
      canvas[focusCanvasIdx].add(grp)

      grp.on(
        'mousedown',
        fabricDblClick(grp, () => {
          editLabel(grp)
        }),
      )
    })

    canvas[focusCanvasIdx].add(groupBox)
    canvas[focusCanvasIdx].renderAll()
  }
  /* _CANVAS ADD TAG END_ */

  const getToday = () => new Date()
    .toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '-') // 取得今天日期轉 yyyy-mm-dd

  const addTag = (tagName: string) => {
    switch (tagName) {
      case FieldTagName.TEXT:
        clickAddText()
        break

      case FieldTagName.DATE:
        clickAddText(getToday())
        break

      case FieldTagName.CHECKBOX:
        clickAddGroupBox(AddGroupEnum.CHECKBOX)
        break

      case FieldTagName.RADIO:
        clickAddGroupBox(AddGroupEnum.RADIO)
        break

      default:
        break
    }
  }

  return (
    <div className="tag-element">
      <p>欄位</p>
      <div className="tag-list">
        {FieldTagItem.map((item: TagItemType) => (
          <div
            key={item.name}
            className="field-tag"
            onClick={() => addTag(item.name)}
          >
            {item.icon}
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TagField
