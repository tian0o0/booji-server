import { Space, Select, Table, Button, Empty } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useTranslation } from "react-i18next";
import { DownloadOutlined } from "@ant-design/icons";
import { useArchiveSelect, useSourceMapList } from "@/hooks/sourcemap";
import { downloadFile } from "@/api/sourcemap";
import { download } from "@/utils/common";

const SourceMaps = ({ appKey }: { appKey: string }) => {
  const { options, selectedArchive, onChange } = useArchiveSelect(appKey);
  const { loading, value } = useSourceMapList(appKey, selectedArchive);

  const onDownload = async (url: string) => {
    const buffer = await downloadFile(url);
    const arr = url.split("/");
    const filename = arr[arr.length - 1];
    download(buffer, filename);
  };

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
        <Button
          shape="circle"
          icon={<DownloadOutlined />}
          onClick={() => onDownload(record)}
        />
      ),
    },
  ];
  return (
    <div>
      {selectedArchive ? (
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
      ) : (
        <Empty className="h-screen flex items-center justify-center flex-col" />
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
