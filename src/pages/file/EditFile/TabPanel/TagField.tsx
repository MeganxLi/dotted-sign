import { useContext } from "react";
import { FieldTagItem, FieldTagName } from "../../../../constants/FileSetting";
import SingImgContext from "../../../../context/SingImgContext";

const TagField = () => {
  //context
  const { clickAddText } = useContext(SingImgContext);

  const addTag = (tagName: string) => {
    switch (tagName) {
      case FieldTagName.TEXT:
        clickAddText();
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
