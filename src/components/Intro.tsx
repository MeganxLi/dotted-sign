import React from "react";

interface props {
  LargeStandard: string | JSX.Element;
  SubStandard: string | JSX.Element;
}
const Intro = ({ LargeStandard, SubStandard }: props) => {
  return (
    <div className="text-blue">
      <h1 className="h1 text-depp-blue font-['Roboto_Slab'] font-medium capitalize">{LargeStandard}</h1>
      <h4 className="h4 pt-6">{SubStandard}</h4>
    </div>
  );
};

export default Intro;
