import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeHighlighterProps {
  code: string;
  wrap?: boolean;
}

const wrapLineStyle = {
  display: "block",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word" as const,
  overflowWrap: "anywhere" as const,
  minWidth: 0,
};

export default function CodeHighlighter({
  code,
  wrap = true,
}: CodeHighlighterProps) {
  return (
    <SyntaxHighlighter
      language="jsx"
      style={vscDarkPlus}
      wrapLines={wrap}
      wrapLongLines={wrap}
      showLineNumbers
      customStyle={{
        margin: 0,
        height: "100%",
        maxWidth: "100%",
        minWidth: 0,
        fontSize: "0.875rem",
        fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
        backgroundColor: "transparent",
        overflowX: wrap ? "hidden" : "auto",
        whiteSpace: wrap ? "pre-wrap" : "pre",
        wordBreak: wrap ? "break-word" : "normal",
        overflowWrap: wrap ? "anywhere" : "normal",
      }}
      codeTagProps={{
        style: wrap
          ? {
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              overflowWrap: "anywhere",
              display: "block",
              minWidth: 0,
            }
          : { whiteSpace: "pre" },
      }}
      lineProps={
        wrap
          ? {
              style: wrapLineStyle,
            }
          : undefined
      }
    >
      {code}
    </SyntaxHighlighter>
  );
}
