import Sign from "../pages/sign";
import File from "../pages/file";
import Setting from "../pages/setting";

//icon svg
import { ReactComponent as FileIcon } from "../assets/svg/file.svg";
import { ReactComponent as WritingIcon } from "../assets/svg/writing.svg";
import { ReactComponent as SettingIcon } from "../assets/svg/setting.svg";

const routes: PageListType[] = [
  {
    name: (
      <>
        <span className="i-icon">
          <FileIcon />
        </span>
        文件
      </>
    ),
    path: "/",
    element: <File />,
    classTag: "svg-fill",
  },
  {
    name: (
      <>
        <span className="i-icon">
          <WritingIcon />
        </span>
        簽名
      </>
    ),
    path: "/writing",
    element: <Sign />,
    classTag: "svg-stroke",
  },
  {
    name: (
      <>
        <span className="i-icon">
          <SettingIcon />
        </span>
        設定
      </>
    ),
    path: "/setting",
    element: <Setting />,
    classTag: "svg-fill",
  },
];

export default routes;
