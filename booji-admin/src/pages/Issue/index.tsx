import { useProjectSelect, useStatusTab } from "@/hooks/issue";
import { Spin } from "antd";
import List from "./List";
import ProjectSelect from "./ProjectSelect";
import StatusTab from "./StatusTab";
const About = () => {
  const { options, selectedAppKey, onChange } = useProjectSelect();
  const { status, onTabChange } = useStatusTab();
  return (
    <>
      {!selectedAppKey ? (
        <Spin />
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
