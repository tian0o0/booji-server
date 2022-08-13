import { Select, Space } from "antd";
import { useTranslation } from "react-i18next";

const UrlSelect = ({
  options,
  selectedUrlId,
  onChange,
}: {
  options: { label: string; value: number }[];

  selectedUrlId?: number;
  onChange: (urlId: number) => void;
}) => {
  const { t } = useTranslation();

  return (
    <>
      {selectedUrlId && (
        <div className="mb-3">
          <Space>
            <span>{t("url")}:</span>
            <Select
              className="w-96"
              options={options}
              defaultValue={selectedUrlId}
              onChange={onChange}
            />
          </Space>
        </div>
      )}
    </>
  );
};

export default UrlSelect;
