import React from "react";
import { useAtom } from "jotai";
import { signAtom } from "../../../../jotai";

const TagSign = () => {

  const [signList] = useAtom(signAtom);

  return (
    <div className="tag-element">
      <p>簽名</p>
      <div className="tag-list">
        {signList.map((item, idx: number) => {
          return (
            <div key={idx} className="sing-tag">
              <img src={item?.toString()} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TagSign;
