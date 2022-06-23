import { Divider } from "antd";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const SourceMap = ({ source }: { source: string }) => {
  if (!source) return null;

  return (
    <>
      <details className="cursor-pointer">
        <summary>SourceMap</summary>
        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
          wrapLongLines={true}
          lineProps={{ style: { display: "block" } }}
        >
          {source}
        </SyntaxHighlighter>
      </details>
      <Divider />
    </>
  );
};

export default SourceMap;
