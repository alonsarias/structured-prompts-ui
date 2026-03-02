import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeHighlighterProps {
  code: string;
}

export default function CodeHighlighter({ code }: CodeHighlighterProps) {
  return (
    <SyntaxHighlighter
      language="jsx"
      style={vscDarkPlus}
      customStyle={{
        margin: 0,
        height: "100%",
        fontSize: "0.875rem",
        fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
        backgroundColor: "transparent",
      }}
      showLineNumbers
    >
      {code}
    </SyntaxHighlighter>
  );
}
