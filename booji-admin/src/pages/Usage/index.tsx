import { Divider } from "antd";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Code from "./Code";
import { ConfigItem, js, react, vue, angular } from "./config";

const Usage = () => {
  const { t } = useTranslation();
  const { platform } = useParams();
  let config: ConfigItem[];
  switch (platform) {
    case "react":
      config = react;
      break;
    case "vue":
      config = vue;
      break;
    case "angular":
      config = angular;
      break;
    default:
      config = js;
      break;
  }
  return (
    <div className="h-full overflow-scroll">
      <h2 className="mb-6 font-bold">📌 {t("usage")}</h2>
      <Divider />
      {config!.map((item: ConfigItem, index: number) => (
        <Code key={index} index={index} title={item.title} code={item.code} />
      ))}
    </div>
  );
};

export default Usage;
