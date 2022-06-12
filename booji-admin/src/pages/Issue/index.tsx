import FullScreenSpin from "@/components/FullScreenSpin";
import { useProjectSelect, useStatusTab } from "@/hooks/issue";
import { Empty } from "antd";
import List from "./List";
import ProjectSelect from "./ProjectSelect";
import StatusTab from "./StatusTab";
const Issue = () => {
  const { options, selectedAppKey, loading, onChange } = useProjectSelect();
  const { status, onTabChange } = useStatusTab();
  return (
    <>
      {loading ? (
        <FullScreenSpin />
      ) : (
        <>
          {options.length > 0 && selectedAppKey ? (
            <>
              <ProjectSelect
                options={options}
                selectedAppKey={selectedAppKey}
                onChange={onChange}
              />
              <StatusTab onChange={onTabChange} />
              <List appKey={selectedAppKey} status={status} />
            </>
          ) : (
            <Empty className="h-full flex flex-col justify-center items-center" />
          )}
        </>
      )}
    </>
  );
};

export default Issue;
