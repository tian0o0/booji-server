import { Select, Space } from "antd";

const ProjectSelect = ({
  options,
  selectedAppKey,
  onChange,
}: {
  options: { label: string; value: string }[];
  selectedAppKey: string;
  onChange: (appKey: string) => void;
}) => {
  return (
    <div className="mb-3">
      <Space>
        <span>选择项目：</span>
        <Select
          className="w-40"
          options={options}
          defaultValue={selectedAppKey}
          onChange={onChange}
        />
      </Space>
    </div>
  );
};

export default ProjectSelect;
