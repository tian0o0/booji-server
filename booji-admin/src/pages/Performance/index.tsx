import FullScreenSpin from "@/components/FullScreenSpin";
import { useProjectSelect } from "@/hooks/issue";
import { usePerformanceList, useUrlSelect } from "@/hooks/performance";
import { Space, Empty } from "antd";
import ProjectSelect from "../Issue/ProjectSelect";
import Chart from "./Chart";
import UrlSelect from "./UrlSelect";

const Performance = () => {
  const { options, selectedAppKey, loading, onChange } = useProjectSelect();
  const {
    options: urlOptions,
    selectedUrlId,
    onChange: onUrlChange,
  } = useUrlSelect(selectedAppKey);
  const { value, loading: loadingChart } = usePerformanceList(selectedUrlId);

  return (
    <>
      {loading ? (
        <FullScreenSpin />
      ) : (
        <>
          {selectedAppKey && (
            <div className="flex">
              <Space>
                <ProjectSelect
                  options={options}
                  selectedAppKey={selectedAppKey}
                  onChange={onChange}
                />
                <UrlSelect
                  options={urlOptions}
                  selectedUrlId={selectedUrlId}
                  onChange={onUrlChange}
                />
              </Space>
            </div>
          )}
          {loadingChart ? (
            <FullScreenSpin />
          ) : (
            <>
              {value ? (
                <Chart data={value} />
              ) : (
                <Empty className="h-full flex flex-col justify-center items-center" />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Performance;
