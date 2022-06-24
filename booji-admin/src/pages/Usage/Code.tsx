import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const Code = ({
  title,
  code,
  index,
}: {
  title: string;
  code: string;
  index: number;
}) => {
  const icons = ["🚀", "👻", "🤕"];
  return (
    <div className="mb-4">
      <h3 className="text-gray-400">
        {icons[index]} {title}
      </h3>
      <SyntaxHighlighter
        language="javascript"
        style={vscDarkPlus}
        wrapLongLines={true}
        showLineNumbers={true}
        lineProps={{ style: { display: "block" } }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default Code;
