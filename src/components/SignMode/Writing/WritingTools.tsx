import { ReactComponent as ArrowRedoIcon } from '../../../assets/svg/arrow_redo.svg'
import { ReactComponent as ArrowUndoIcon } from '../../../assets/svg/arrow_undo.svg'
import { ReactComponent as ColorIcon } from '../../../assets/svg/color.svg'
import { ReactComponent as EraserIcon } from '../../../assets/svg/eraser.svg'
import { ReactComponent as HighlighterIcon } from '../../../assets/svg/highlighter.svg'
import { ReactComponent as PenIcon } from '../../../assets/svg/pen.svg'
import { ReactComponent as ResetIcon } from '../../../assets/svg/reset.svg'
import { CanvasToolsName } from '../../../constants/EnumType'

interface props {
  handleSignTools: {
    openColor: () => void;
    selectCanvasTool: (changeTool: string) => void;
    eraseCanvas: () => void;
    undoCanvas: () => void;
    redoCanvas: () => void;
    resetCanvas: () => void;
  };
  signCanvasProps: SignCanvasPropsType;
}

const WritingTools = ({ handleSignTools, signCanvasProps }: props) => (
  <div id="WritingTools">
    <ul>
      <li onClick={handleSignTools.openColor}>
        <ColorIcon className="opacity-80" />
      </li>
      <li
        onClick={() => handleSignTools.selectCanvasTool(CanvasToolsName.PEN)}
        className={
          signCanvasProps.tool === CanvasToolsName.PEN ? 'active' : undefined
        }
      >
        <PenIcon className="svg-fill" />
      </li>
      <li
        onClick={() => handleSignTools.selectCanvasTool(CanvasToolsName.HIGHLIGHTER)}
        className={
          signCanvasProps.tool === CanvasToolsName.HIGHLIGHTER
            ? 'active'
            : undefined
        }
      >
        <HighlighterIcon className="svg-fill" />
      </li>
      <li
        onClick={handleSignTools.eraseCanvas}
        className={
          signCanvasProps.tool === CanvasToolsName.ERASER
            ? 'active'
            : undefined
        }
      >
        <EraserIcon className="svg-fill" />
      </li>
    </ul>
    <ul>
      <li onClick={handleSignTools.undoCanvas}>
        <ArrowUndoIcon className="svg-stroke" />
      </li>
      <li onClick={handleSignTools.redoCanvas}>
        <ArrowRedoIcon className="svg-stroke" />
      </li>
      <li onClick={handleSignTools.resetCanvas}>
        <ResetIcon className="svg-stroke" />
      </li>
    </ul>
  </div>
)

export default WritingTools
