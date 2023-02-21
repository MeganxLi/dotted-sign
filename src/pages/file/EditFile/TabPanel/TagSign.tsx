import { useAtom } from "jotai";
import { openModalAtom, signAtom } from "../../../../jotai";
import { Plus } from "react-feather";
import { useContext } from "react";
import SingImgContext from "../../../../context/SingImgContext";

const TagSign = () => {
  //context
  const { clickAddSing } = useContext(SingImgContext);
  //useAtom
  const [signList] = useAtom(signAtom);
  const [, setOpenModal] = useAtom(openModalAtom);

  const createSignURL = (item: string | HTMLCanvasElement) => {
    clickAddSing(item);
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
          onClick={() => setOpenModal(true)}
        >
          <Plus size={14} />
        </div>
      </div>
    </div>
  );
};

export default TagSign;
