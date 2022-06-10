import { useProjectList } from "@/hooks/project";
import { Select, Space } from "antd";
import { useMemo } from "react";

const ProjectSelect = () => {
  const { value, loading } = useProjectList();

  const options = useMemo(() => {
    return value?.map((item) => ({
      label: item.name,
      value: item.appKey,
    }));
  }, [value]);

  const defaultValue = useMemo(() => value && value[0]?.appKey, [value]);

  return (
    <div className="mb-3">
      {!loading && (
        <Space>
          <span>选择项目：</span>
          <Select
            options={options}
            defaultValue={defaultValue}
            className="w-40"
          ></Select>
        </Space>
      )}
    </div>
  );
};

export default ProjectSelect;
