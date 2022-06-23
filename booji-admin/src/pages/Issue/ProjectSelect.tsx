import { Select, Space } from "antd";
import { useTranslation } from "react-i18next";

const ProjectSelect = ({
  options,
  selectedAppKey,
  onChange,
}: {
  options: { label: string; value: string }[];
  selectedAppKey: string;
  onChange: (appKey: string) => void;
}) => {
  const { t } = useTranslation();
  return (
    <div className="mb-3">
      <Space>
        <span>{t("projectName")}:</span>
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
