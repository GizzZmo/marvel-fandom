import { renderMdx } from "@/lib/mdx";

export async function MdxContent({ source }: { source: string }) {
  const content = await renderMdx(source);

  return (
    <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-marvel-red prose-blockquote:border-marvel-red prose-strong:text-white">
      {content}
    </div>
  );
}
