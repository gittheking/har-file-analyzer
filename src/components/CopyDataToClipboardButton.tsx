import { CopyOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

interface CopyDataToClipboardButtonProps {
  mimeType: string;
  content: string;
  className?: string;
  onSuccess?: () => void;
  onFailure?: (message?: string) => void;
}

// Current supported types
const supportedTypes = [
  "text/plain",
  "text/html",
  "text/css",
  "application/json",
];

function isSupported(mimeType: string) {
  return supportedTypes.includes(mimeType);
}

function CopyDataToClipboardButton({
  mimeType,
  content,
  className = "",
  onSuccess = () => {},
  onFailure = () => {},
}: CopyDataToClipboardButtonProps) {
  async function handleCopyContent(): Promise<void> {
    try {
      const clipboardItemOptions: {
        [key: string]: any;
      } = {};
      const blob = new Blob([content], { type: mimeType });
      clipboardItemOptions[mimeType] = blob;
      const clipboardItem = new ClipboardItem(clipboardItemOptions);
      await navigator.clipboard.write([clipboardItem]);
      onSuccess();
    } catch (err) {
      let errorMessage;
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      onFailure(errorMessage);
    }
  }

  return isSupported(mimeType) ? (
    <Tooltip title="Copy content to clipboard">
      <Button
        type="link"
        className={className}
        icon={<CopyOutlined />}
        size="small"
        shape="circle"
        onClick={handleCopyContent}
      />
    </Tooltip>
  ) : null;
}

export default CopyDataToClipboardButton;
