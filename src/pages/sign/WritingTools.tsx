//svg
import { ReactComponent as ColorIcon } from "../../assets/svg/color.svg";
import { ReactComponent as PenIcon } from "../../assets/svg/pen.svg";
import { ReactComponent as HighlighterIcon } from "../../assets/svg/highlighter.svg";
import { ReactComponent as EraserIcon } from "../../assets/svg/eraser.svg";
import { ReactComponent as ArrowUndoIcon } from "../../assets/svg/arrow_undo.svg";
import { ReactComponent as ArrowRedoIcon } from "../../assets/svg/arrow_redo.svg";
import { ReactComponent as ResetIcon } from "../../assets/svg/reset.svg";

import { CanvasToolsName } from "../../constants/EnumType";

interface props {
  handleSignTools: {
    openColor: () => void;
    selectCanvasTool: (changeTool: string) => void;
    eraseCanvas: () => void;
    undoCanvas: () => void;
    redoCanvas: () => void;
    resetCanvas: () => void;
  };
}

const WritingTools = ({ handleSignTools }: props) => {
  return (
    <div id="WritingTools">
      <ul>
        <li onClick={handleSignTools.openColor}>
          <ColorIcon className="opacity-80" />
        </li>
        <li
          onClick={() => handleSignTools.selectCanvasTool(CanvasToolsName.PEN)}
        >
          <PenIcon className="svg-fill" />
        </li>
        <li
          onClick={() =>
            handleSignTools.selectCanvasTool(CanvasToolsName.HIGHLIGHTER)
          }
        >
          <HighlighterIcon className="svg-fill" />
        </li>
        <li onClick={handleSignTools.eraseCanvas}>
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
  );
};

export default WritingTools;
