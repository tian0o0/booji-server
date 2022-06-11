import FullScreenSpin from "@/components/FullScreenSpin";
import { useProjectSelect, useStatusTab } from "@/hooks/issue";
import List from "./List";
import ProjectSelect from "./ProjectSelect";
import StatusTab from "./StatusTab";
const About = () => {
  const { options, selectedAppKey, onChange } = useProjectSelect();
  const { status, onTabChange } = useStatusTab();
  return (
    <>
      {!selectedAppKey ? (
        <FullScreenSpin />
      ) : (
        <>
          <ProjectSelect
            options={options}
            selectedAppKey={selectedAppKey}
            onChange={onChange}
          />
          <StatusTab onChange={onTabChange} />
          <List appKey={selectedAppKey} status={status} />
        </>
      )}
    </>
  );
};

export default About;
