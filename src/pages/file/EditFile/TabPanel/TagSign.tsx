import { useAtom } from "jotai";
import { addCanvasAtom, signAtom } from "../../../../jotai";
import { Plus } from "react-feather";
import { useNavigate } from "react-router-dom";

const TagSign = () => {
  // router
  const navigate = useNavigate();
  const [signList] = useAtom(signAtom);
  const [, setAddCanvas] = useAtom(addCanvasAtom);

  const createSignURL = (item: string | HTMLCanvasElement) => {
    setAddCanvas(item);
  };

  return (
    <div className="tag-element">
      <p>簽名</p>
      <div className="tag-list">
        {signList.map((item, idx: number) => {
          return (
            <div
              key={idx}
              className="sing-tag border-solid border-black/20 bg-[#F9F9F9]"
              onClick={() => createSignURL(item)}
            >
              <img src={item?.toString()} />
            </div>
          );
        })}
        <div
          className="sing-tag border-dashed border-black/20 text-blue"
          onClick={() => navigate("/writing")}
        >
          <Plus size={14} />
        </div>
      </div>
    </div>
  );
};

export default TagSign;
