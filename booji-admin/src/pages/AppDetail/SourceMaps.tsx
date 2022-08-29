import { Space, Select, Table, Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useTranslation } from "react-i18next";
import { DownloadOutlined } from "@ant-design/icons";
import { useArchiveSelect, useSourceMapList } from "@/hooks/sourcemap";

const SourceMaps = ({ appKey }: { appKey: string }) => {
  const { options, selectedArchive, onChange } = useArchiveSelect(appKey);
  const { loading, value } = useSourceMapList(appKey, selectedArchive);

  const columns: ColumnsType<any> = [
    {
      title: "文件名",
      render: (_, record) => record,
    },
    {
      title: "操作",
      align: "center",
      width: 100,
      render: (_, record) => (
        <Button shape="circle" icon={<DownloadOutlined />} />
      ),
    },
  ];
  return (
    <div>
      {selectedArchive && (
        <>
          <Head options={options} value={selectedArchive} onChange={onChange} />
          <Table
            rowKey="appKey"
            columns={columns}
            dataSource={value}
            loading={loading}
            pagination={false}
          />
        </>
      )}
    </div>
  );
};

const Head = ({
  options,
  value,
  onChange,
}: {
  options: any;
  value: string;
  onChange: any;
}) => {
  const { t } = useTranslation();
  return (
    <Space className="mb-6">
      <span>{t("archive")}</span>
      <Select
        className="w-40"
        options={options}
        defaultValue={value}
        onChange={onChange}
      />
    </Space>
  );
};

export default SourceMaps;
