import { Divider } from "antd";
import { useTranslation } from "react-i18next";
import Code from "./Code";
import { ConfigItem, js, react, vue, angular } from "./config";

const Usage = ({ platform }: { platform: string }) => {
  const { t } = useTranslation();

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
      <h2 className="font-bold leading-10">📌 {t("usage")}</h2>
      <Divider />
      {config!.map((item: ConfigItem, index: number) => (
        <Code key={index} index={index} title={item.title} code={item.code} />
      ))}
    </div>
  );
};

export default Usage;
