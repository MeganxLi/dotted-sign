import Sign from "../pages/sign";

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
    element: <Sign />,
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
    element: <Sign />,
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
    element: <Sign />,
  },
];

export default routes;
