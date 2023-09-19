interface PlainTextRendererProps {
  content: string;
}

function PlainTextRenderer({ content }: PlainTextRendererProps) {
  return (
    <div className="plain-text-content">
      <pre>{content}</pre>
    </div>
  );
}

export default PlainTextRenderer;
