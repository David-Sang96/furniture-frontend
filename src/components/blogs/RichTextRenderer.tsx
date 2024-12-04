import Dompurify from "dompurify";

interface RichTextRendererProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
}

function RichTextRenderer({ content, className }: RichTextRendererProps) {
  const sanitizedContent = Dompurify.sanitize(content);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      className={className}
    />
  );
}

export default RichTextRenderer;
