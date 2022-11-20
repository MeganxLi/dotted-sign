
import React from "react";
import { TagItemName } from "../../../../constants/FileSetting";

const TagField = () => {
  return (
    <div className="tag-element">
      <p>欄位</p>
      <div className="tag-list">
        {TagItemName.map((item: TagItemType, idx: number) => {
          return (
            <div key={item.name} className="field-tag">
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
