import TagField from "./TabPanel/TagField";
import TagSign from "./TabPanel/TagSign";

const TabPanel = () => {
  return (
    <div className="flat-list flex flex-col gap-8 flat:flex-row flat:px-6">
      <TagSign />
      <TagField />
    </div>
  );
};

export default TabPanel;
