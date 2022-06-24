import FullScreenSpin from "@/components/FullScreenSpin";
import { useIssueList, useProjectSelect, useStatusTab } from "@/hooks/issue";
import { Empty } from "antd";
import List from "./List";
import ProjectSelect from "./ProjectSelect";
import StatusTab from "./StatusTab";
const Issue = () => {
  const { options, selectedAppKey, loading, onChange } = useProjectSelect();
  const { status, onTabChange } = useStatusTab();
  const {
    loading: loadingIssue,
    value,
    page,
    retry,
    setPage,
    onChange: onTableChange,
  } = useIssueList(selectedAppKey, status);

  const onProjectSelect = (appKey: string) => {
    setPage(1);
    onChange(appKey);
  };
  const onStatusTabChange = (activeKey: string) => {
    setPage(1);
    onTabChange(activeKey);
  };

  return (
    <>
      {loading ? (
        <FullScreenSpin />
      ) : (
        <>
          {selectedAppKey && value ? (
            <>
              <ProjectSelect
                options={options}
                selectedAppKey={selectedAppKey}
                onChange={onProjectSelect}
              />
              <StatusTab onChange={onStatusTabChange} />
              <List
                loading={loadingIssue}
                value={value}
                page={page}
                retry={retry}
                onChange={onTableChange}
              />
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
