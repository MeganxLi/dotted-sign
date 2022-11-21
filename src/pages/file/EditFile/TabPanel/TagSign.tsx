import React from "react";
import { useAtom } from "jotai";
import { signAtom } from "../../../../jotai";
import { Plus } from "react-feather";
import { useNavigate } from "react-router-dom";

const TagSign = () => {
  // router
  const navigate = useNavigate();
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
        <div className="flex items-center justify-center text-blue border-[0.5px] 
        border-dashed border-black/20 rounded-lg cursor-pointer"
          onClick={() => navigate("/writing")}
        >
          <Plus size={14} />
        </div>
      </div>
    </div>
  );
};

export default TagSign;
