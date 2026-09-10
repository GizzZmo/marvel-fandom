import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-marvel-red prose-blockquote:border-marvel-red prose-strong:text-white">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
