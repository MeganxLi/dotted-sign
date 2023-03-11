interface props {
  LargeStandard: string | JSX.Element;
  SubStandard: string | JSX.Element;
}
const Intro = ({ LargeStandard, SubStandard }: props) => (
  <div className="text-blue">
    <h1 className="h1 font-['Roboto_Slab'] font-medium capitalize text-depp-blue">
      {LargeStandard}
    </h1>
    <h4 className="h4 pt-6">{SubStandard}</h4>
  </div>
)

export default Intro
