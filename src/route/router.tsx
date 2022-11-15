import WritingMode from "../pages/writing_mode";

//icon svg
import { ReactComponent as File } from "../assets/svg/file.svg";
import { ReactComponent as Writing } from "../assets/svg/writing.svg";
import { ReactComponent as Setting } from "../assets/svg/setting.svg";

const routes: PageListType[] = [
  {
    name: (
      <>
        <span className="i-icon">
          <File />
        </span>
        文件
      </>
    ),
    path: "/",
    element: <WritingMode />,
  },
  {
    name: (
      <>
        <span className="i-icon">
          <Writing />
        </span>
        簽名
      </>
    ),
    path: "/writing",
    element: <WritingMode />,
  },
  {
    name: (
      <>
        <span className="i-icon">
          <Setting />
        </span>
        設定
      </>
    ),
    path: "/setting",
    element: <WritingMode />,
  },
];

export default routes;
