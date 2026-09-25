import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const syntaxStyle = {
  ...vscDarkPlus,
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    color: "#E6EDF3",
    background: "transparent",
  },
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    color: "#E6EDF3",
    background: "transparent",
  },
  keyword: { color: "#79C0FF" },
  tag: { color: "#79C0FF" },
  function: { color: "#79C0FF" },
  "class-name": { color: "#79C0FF" },
  string: { color: "#56D364" },
  number: { color: "#C678DD" },
  boolean: { color: "#C678DD" },
  comment: { color: "#8B949E" },
  punctuation: { color: "#8B949E" },
  operator: { color: "#E6EDF3" },
};

interface CodeHighlighterProps {
  code: string;
  wrap?: boolean;
}

const lineNumberStyle = {
  minWidth: 0,
  paddingRight: "0.75rem",
};

function lineStyle(wrap: boolean) {
  return {
    display: "block" as const,
    whiteSpace: wrap ? ("pre-wrap" as const) : ("pre" as const),
    wordBreak: wrap ? ("break-word" as const) : ("normal" as const),
    overflowWrap: wrap ? ("anywhere" as const) : ("normal" as const),
    minWidth: 0,
  };
}

export default function CodeHighlighter({
  code,
  wrap = true,
}: CodeHighlighterProps) {
  return (
    <SyntaxHighlighter
      language="jsx"
      style={syntaxStyle}
      wrapLines
      wrapLongLines={wrap}
      showLineNumbers
      lineNumberStyle={lineNumberStyle}
      customStyle={{
        margin: 0,
        padding: "12px 16px 12px 0",
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
          : { whiteSpace: "pre", display: "block" },
      }}
      lineProps={{
        className: "prompt-line",
        style: lineStyle(wrap),
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
