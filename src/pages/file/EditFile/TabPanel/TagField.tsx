import { useContext } from "react";
import { FieldTagItem, FieldTagName } from "../../../../constants/FileSetting";
import SingImgContext from "../../../../context/SingImgContext";

const TagField = () => {
  //context
  const { clickAddText } = useContext(SingImgContext);

  const getToday = () =>
    new Date()
      .toLocaleDateString("zh-TW", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-"); // 取得今天日期轉 yyyy-mm-dd

  const addTag = (tagName: string) => {
    switch (tagName) {
      case FieldTagName.TEXT:
        clickAddText();
        break;

      case FieldTagName.DATE:
        clickAddText(getToday());
        break;

      default:
        break;
    }
  };

  return (
    <div className="tag-element">
      <p>欄位</p>
      <div className="tag-list">
        {FieldTagItem.map((item: TagItemType) => {
          return (
            <div
              key={item.name}
              className="field-tag"
              onClick={() => addTag(item.name)}
            >
              {item.icon}
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TagField;
