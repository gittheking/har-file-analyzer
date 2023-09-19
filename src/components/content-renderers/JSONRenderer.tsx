interface JSONRendererProps {
  content: string;
}

function JSONRenderer({ content }: JSONRendererProps) {
  return (
    <div className="plain-text-content">
      <pre>{content}</pre>
    </div>
  );
}

export default JSONRenderer;
