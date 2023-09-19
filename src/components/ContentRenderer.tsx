import { Typography } from "antd";
import PlainTextRenderer from "./content-renderers/PlainTextRenderer";
import JSONRenderer from "./content-renderers/JSONRenderer";

// Accepted mime types
// text/plain .txt
// text/html .html
// text/css .css
// application/json .json

interface ContentRendererProps {
  mimeType?: string;
  content: string;
}

const { Text } = Typography;

function ContentRenderer({ mimeType, content }: ContentRendererProps) {
  switch (mimeType) {
    case "text/plain":
      return <PlainTextRenderer content={content} />;
    case "application/json":
      return <JSONRenderer content={content} />;
    default:
      return <Text>{content}</Text>;
  }
}

export default ContentRenderer;
